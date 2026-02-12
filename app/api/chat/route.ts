import { groq } from "@ai-sdk/groq"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import fs from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 30

type Currency = "EUR" | "DZD"

const AFRICA_COUNTRIES = new Set([
  "DZ",
  "MA",
  "TN",
  "LY",
  "EG",
  "SD",
  "SS",
  "EH",
  "MR",
  "ML",
  "NE",
  "TD",
  "SN",
  "GM",
  "GW",
  "GN",
  "SL",
  "LR",
  "CI",
  "GH",
  "TG",
  "BJ",
  "BF",
  "NG",
  "CM",
  "CF",
  "GQ",
  "GA",
  "CG",
  "CD",
  "AO",
  "NA",
  "BW",
  "ZA",
  "LS",
  "SZ",
  "ZM",
  "ZW",
  "MW",
  "MZ",
  "MG",
  "MU",
  "SC",
  "KM",
  "RE",
  "YT",
  "KE",
  "UG",
  "TZ",
  "RW",
  "BI",
  "ET",
  "ER",
  "DJ",
  "SO",
  "ST",
  "CV",
])

async function readTextSafe(p: string) {
  try {
    return await fs.readFile(p, "utf8")
  } catch {
    return ""
  }
}

function normalizeForPrompt(text: string) {
  return text.replace(/\s+/g, " ").slice(0, 6000)
}

async function loadSiteContext(projectRoot: string) {
  const knowledgePath = path.join(projectRoot, "data/koulachda.json")
  const raw = await readTextSafe(knowledgePath)
  if (!raw) return ""

  try {
    return JSON.stringify(JSON.parse(raw))
  } catch {
    return normalizeForPrompt(raw)
  }
}

function pickCurrency(req: Request): Currency {
  const country = (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("x-country") ||
    ""
  )
    .toUpperCase()
    .trim()

  if (country && AFRICA_COUNTRIES.has(country)) return "DZD"
  return "EUR"
}

function buildGroundedContext(rawContextJson: string, currency: Currency) {
  try {
    const data = JSON.parse(rawContextJson) as any
    if (data?.pricing?.plans) {
      const plans = data.pricing.plans
      data.pricing.plans = { [currency]: plans?.[currency] }
    }
    data.currency = currency
    return JSON.stringify(data)
  } catch {
    return rawContextJson
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const projectRoot = process.cwd()
  const currency = pickCurrency(req)
  const rawContext = await loadSiteContext(projectRoot)
  const context = normalizeForPrompt(buildGroundedContext(rawContext, currency))

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    system: `You are the website assistant for Cliste (xo-link).

Rules:
- Use the WEBSITE CONTEXT below as the source of truth.
- You may answer naturally (and briefly) in French.
- If the user asks something not covered by the context, do NOT invent details.
  Instead:
  1) Ask 1 short clarification question if it could help, OR
  2) Say you don't have that information and suggest contacting us via /contact.
- Never invent prices, guarantees, timelines, services, or any details not present in the context.
- Pricing: if the user asks about pricing, use the values inside pricing.plans from the context and answer using ONLY ${currency}.
  If the plan is "Sur-mesure" or marked custom, say it's "Sur devis" and suggest /contact.

--- WEBSITE CONTEXT START ---
${context}
--- WEBSITE CONTEXT END ---`,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
