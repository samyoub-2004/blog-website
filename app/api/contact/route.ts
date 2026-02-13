import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  website: z.string().optional().default(""),
  message: z.string().min(1),
})

type ContactPayload = z.infer<typeof ContactSchema>

function parseRecipients(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function buildEmailText(payload: ContactPayload) {
  const lines: string[] = []
  lines.push("Nouveau message (Contact)")
  lines.push("")
  lines.push(`Nom: ${payload.name}`)
  lines.push(`Email: ${payload.email}`)
  if (payload.phone) lines.push(`Téléphone: ${payload.phone}`)
  if (payload.website) lines.push(`Website / Type: ${payload.website}`)
  lines.push("")
  lines.push("Message:")
  lines.push(payload.message)
  return lines.join("\n")
}

function buildEmailHtml(payload: ContactPayload) {
  return `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5">
    <h2 style="margin:0 0 12px">Nouveau message (Contact)</h2>

    <h3 style="margin:16px 0 8px">Coordonnées</h3>
    <ul style="margin:0;padding-left:18px">
      <li><strong>Nom</strong>: ${escapeHtml(payload.name)}</li>
      <li><strong>Email</strong>: ${escapeHtml(payload.email)}</li>
      ${payload.phone ? `<li><strong>Téléphone</strong>: ${escapeHtml(payload.phone)}</li>` : ""}
      ${payload.website ? `<li><strong>Website / Type</strong>: ${escapeHtml(payload.website)}</li>` : ""}
    </ul>

    <h3 style="margin:16px 0 8px">Message</h3>
    <pre style="white-space:pre-wrap;margin:0;padding:12px;background:#f6f6f6;border-radius:10px">${escapeHtml(payload.message)}</pre>
  </div>
  `
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const payload = ContactSchema.parse(json)

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const toRaw = process.env.CONTACT_TO_EMAIL || process.env.QUOTE_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || process.env.QUOTE_FROM_EMAIL

    if (!toRaw || !from) {
      return NextResponse.json({ error: "Missing CONTACT_TO_EMAIL/QUOTE_TO_EMAIL or CONTACT_FROM_EMAIL/QUOTE_FROM_EMAIL" }, { status: 500 })
    }

    const to = parseRecipients(toRaw)
    if (to.length === 0) {
      return NextResponse.json({ error: "Invalid recipient list" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      to,
      from,
      subject: `Contact - ${payload.name}`,
      replyTo: payload.email,
      text: buildEmailText(payload),
      html: buildEmailHtml(payload),
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
