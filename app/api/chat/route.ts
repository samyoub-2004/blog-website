import { NextRequest, NextResponse } from "next/server"
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import fs from "node:fs/promises"
import path from "node:path"
import { OpenRouter } from "@openrouter/sdk"

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/auto"
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
  return (
    code
      .replace(/\{[^}]*\}/g, " ") // remove simple JS expressions
      .replace(/<[^>]+>/g, " ") // remove tags
      .replace(/\s+/g, " ")
      .slice(0, 4000)
  )
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
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY on server" },
        { status: 500 }
      )
    }

    const { messages } = await req.json()
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages must be an array" }, { status: 400 })
    }

    const projectRoot = path.join(process.cwd())
    const context = await loadSiteContext(projectRoot)

    const systemPrompt = `Vous êtes l'assistant IA officiel de l'entreprise ${SITE_NAME}.\n\nRôle & ton:\n- Parlez en français, de façon professionnelle, empathique et claire.\n- Agissez comme un agent interne de notre entreprise: informez, guidez, et proposez des actions concrètes (contact, devis, portfolio).\n- Si une information n'est pas couverte par le contexte, dites-le explicitement et proposez de nous contacter via le formulaire /contact.\n- Soyez concis, structuré,reponse directe et ne fabriquez pas d'informations.\n\nObjectif: Répondre STRICTEMENT à partir du contenu du site fourni ci-dessous.\n\n--- CONTEXTE DU SITE (SOURCE D'AUTORITÉ) ---\n${context}\n--- FIN DU CONTEXTE ---`

    // Initialize OpenRouter SDK
    const client = new OpenRouter({ apiKey: OPENROUTER_API_KEY! })

    const completion = await client.chat.send({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    })

    const assistantMessage = completion.choices?.[0]?.message ?? { role: "assistant", content: "(No response)" }
    return NextResponse.json({ message: assistantMessage })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}
