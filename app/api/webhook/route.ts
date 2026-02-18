import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

async function readTextSafe(p: string) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

function normalizeForPrompt(text: string) {
  return text.replace(/\s+/g, " ").slice(0, 6000);
}

async function loadSiteContext(projectRoot: string) {
  const knowledgePath = path.join(projectRoot, "data/koulachda.json");
  const raw = await readTextSafe(knowledgePath);
  if (!raw) return "";

  try {
    return JSON.stringify(JSON.parse(raw));
  } catch {
    return normalizeForPrompt(raw);
  }
}

async function genererReponseIA(userText: string) {
  const projectRoot = process.cwd();
  const rawContext = await loadSiteContext(projectRoot);
  const context = normalizeForPrompt(rawContext);

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    system: `You are the website assistant for xo-link.

Rules:
- Use the WEBSITE CONTEXT below as the source of truth.
- You may answer naturally (and briefly) in French.
- If the user asks something not covered by the context, do NOT invent details.
  Instead:
  1) Ask 1 short clarification question if it could help, OR
  2) Say you don't have that information and suggest contacting us via /contact.
- Never invent prices, guarantees, timelines, services, or any details not present in the context.

Channel:
- The user is messaging via Facebook Messenger. Keep replies short and helpful.

--- WEBSITE CONTEXT START ---
${context}
--- WEBSITE CONTEXT END ---`,
    prompt: normalizeForPrompt(userText),
  });

  return (result.text || "").trim();
}

async function envoyerMessage(senderPsid: string, responseText: string) {
  if (!PAGE_ACCESS_TOKEN) {
    throw new Error("Missing env FB_PAGE_ACCESS_TOKEN");
  }

  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

  const payload = {
    recipient: { id: senderPsid },
    message: { text: responseText },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Graph API error: ${res.status} ${res.statusText} ${text}`);
  }
}

export async function GET(req: Request) {
  if (!VERIFY_TOKEN) {
    return NextResponse.json(
      { error: "Missing env FB_VERIFY_TOKEN" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token === VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || body.object !== "page") {
    return new NextResponse(null, { status: 404 });
  }

  const entries = Array.isArray(body.entry) ? body.entry : [];

  for (const entry of entries) {
    const messaging = Array.isArray(entry.messaging) ? entry.messaging : [];

    for (const event of messaging) {
      try {
        const senderPsid: string | undefined = event?.sender?.id;
        const textRecu: string | undefined = event?.message?.text;
        const isEcho: boolean | undefined = event?.message?.is_echo;

        const hasMessage = Boolean(event?.message);
        const hasText = typeof textRecu === "string" && textRecu.trim().length > 0;

        if (!senderPsid) continue;
        if (isEcho) continue;

        if (!hasMessage) continue;
        if (!hasText) continue;

        const reponseIA = await genererReponseIA(textRecu);
        await envoyerMessage(senderPsid, reponseIA || "Je n'ai pas compris, tu peux reformuler ?");
      } catch {
        continue;
      }
    }
  }

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}
