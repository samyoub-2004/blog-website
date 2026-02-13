import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const QuoteSchema = z.object({
  planKey: z.string().min(1),
  planName: z.string().min(1),
  pages: z.number().int().min(1).max(300),
  languages: z.number().int().min(1).max(50),
  options: z
    .array(
      z.object({
        key: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .default([]),
  contact: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().default(""),
    company: z.string().optional().default(""),
    message: z.string().optional().default(""),
  }),
})

type QuotePayload = z.infer<typeof QuoteSchema>

function parseRecipients(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function buildEmailText(payload: QuotePayload) {
  const lines: string[] = []
  lines.push("Nouvelle demande de devis")
  lines.push("")
  lines.push(`Plan: ${payload.planName} (${payload.planKey})`)
  lines.push(`Pages: ${payload.pages}`)
  lines.push(`Langues: ${payload.languages}`)
  lines.push("")
  lines.push("Options:")
  if (payload.options.length === 0) {
    lines.push("- (aucune)")
  } else {
    for (const o of payload.options) lines.push(`- ${o.label} (${o.key})`)
  }
  lines.push("")
  lines.push("Contact:")
  lines.push(`Nom: ${payload.contact.fullName}`)
  lines.push(`Email: ${payload.contact.email}`)
  if (payload.contact.phone) lines.push(`Téléphone: ${payload.contact.phone}`)
  if (payload.contact.company) lines.push(`Entreprise: ${payload.contact.company}`)
  if (payload.contact.message) {
    lines.push("")
    lines.push("Message:")
    lines.push(payload.contact.message)
  }
  return lines.join("\n")
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function buildEmailHtml(payload: QuotePayload) {
  const optionsHtml =
    payload.options.length === 0
      ? "<li>(aucune)</li>"
      : payload.options.map((o) => `<li>${escapeHtml(o.label)} <span style=\"color:#666\">(${escapeHtml(o.key)})</span></li>`).join("")

  const messageHtml = payload.contact.message
    ? `<h3 style=\"margin:16px 0 8px\">Message</h3><pre style=\"white-space:pre-wrap;margin:0;padding:12px;background:#f6f6f6;border-radius:10px\">${escapeHtml(payload.contact.message)}</pre>`
    : ""

  return `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5">
    <h2 style="margin:0 0 12px">Nouvelle demande de devis</h2>

    <h3 style="margin:16px 0 8px">Projet</h3>
    <ul style="margin:0;padding-left:18px">
      <li><strong>Plan</strong>: ${escapeHtml(payload.planName)} <span style="color:#666">(${escapeHtml(payload.planKey)})</span></li>
      <li><strong>Pages</strong>: ${payload.pages}</li>
      <li><strong>Langues</strong>: ${payload.languages}</li>
    </ul>

    <h3 style="margin:16px 0 8px">Options</h3>
    <ul style="margin:0;padding-left:18px">${optionsHtml}</ul>

    <h3 style="margin:16px 0 8px">Contact</h3>
    <ul style="margin:0;padding-left:18px">
      <li><strong>Nom</strong>: ${escapeHtml(payload.contact.fullName)}</li>
      <li><strong>Email</strong>: ${escapeHtml(payload.contact.email)}</li>
      ${payload.contact.phone ? `<li><strong>Téléphone</strong>: ${escapeHtml(payload.contact.phone)}</li>` : ""}
      ${payload.contact.company ? `<li><strong>Entreprise</strong>: ${escapeHtml(payload.contact.company)}</li>` : ""}
    </ul>

    ${messageHtml}
  </div>
  `
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const payload = QuoteSchema.parse(json)

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const to = process.env.QUOTE_TO_EMAIL
    const from = process.env.QUOTE_FROM_EMAIL

    if (!to || !from) {
      return NextResponse.json({ error: "Missing QUOTE_TO_EMAIL or QUOTE_FROM_EMAIL" }, { status: 500 })
    }

    const recipients = parseRecipients(to)
    if (recipients.length === 0) {
      return NextResponse.json({ error: "Invalid recipient list" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      to: recipients,
      from,
      subject: `Devis - ${payload.planName} (${payload.pages} pages, ${payload.languages} langues)`,
      replyTo: payload.contact.email,
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
