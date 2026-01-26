import { NextRequest } from "next/server"
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import fs from "node:fs/promises"
import path from "node:path"
import { OpenRouter } from "@openrouter/sdk"

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "tngtech/deepseek-r1t2-chimera:free"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const SITE_NAME = process.env.SITE_NAME || "Cliste"

async function readTextSafe(p: string) {
  try {
    return await fs.readFile(p, "utf8")
  } catch {
    return ""
  }
}

function coarseStrip(code: string) {
  return code.replace(/\{[^}]*\}/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 4000)
}

async function loadSiteContext(projectRoot: string) {
  const files = [
    path.join(projectRoot, "app/page.tsx"),
    path.join(projectRoot, "app/solutions-web/page.tsx"),
    path.join(projectRoot, "app/portfolio/page.tsx"),
    path.join(projectRoot, "components/hero-section.tsx"),
    path.join(projectRoot, "components/features-section.tsx"),
    path.join(projectRoot, "components/portfolio.tsx"),
  ]
  const contents = await Promise.all(files.map(readTextSafe))
  const parts = contents
    .map((c, i) => ({ name: path.basename(files[i]), text: coarseStrip(c) }))
    .filter((p) => p.text)
    .map((p) => `# ${p.name}\n${p.text}`)
  return parts.join("\n\n")
}

export async function POST(req: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return new Response("Missing OPENROUTER_API_KEY", { status: 500 })
  }

  const { messages } = await req.json()
  if (!Array.isArray(messages)) {
    return new Response("messages must be an array", { status: 400 })
  }

  const projectRoot = path.join(process.cwd())
  const context = await loadSiteContext(projectRoot)

  const systemPrompt = `You are the AI assistant for ${SITE_NAME}. Answer strictly based on the website content provided below. If something is not covered, say you don't have that info and suggest contacting us via the site. Be concise and professional.\n\n--- SITE CONTEXT START ---\n${context}\n--- SITE CONTEXT END ---`

  const client = new OpenRouter({ apiKey: OPENROUTER_API_KEY })

  const stream = await client.chat.send({
    model: OPENROUTER_MODEL,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: true,
  })

  const ts = new TransformStream()
  const writer = ts.writable.getWriter()
  const encoder = new TextEncoder()

  ;(async () => {
    try {
      for await (const chunk of stream as any) {
        const content = chunk?.choices?.[0]?.delta?.content
        if (content) {
          await writer.write(encoder.encode(content))
        }
      }
    } catch (e) {
      await writer.write(encoder.encode("\n"))
    } finally {
      await writer.close()
    }
  })()

  return new Response(ts.readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  })
}
