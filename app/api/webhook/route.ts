import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const INSTAGRAM_PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN;

type Platform = "facebook" | "instagram";

type IncomingTextEvent = {
  platform: Platform;
  senderId: string;
  text: string;
  isEcho?: boolean;
};

async function readTextSafe(p: string) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

function normalizeIncomingText(text: unknown) {
  if (typeof text !== "string") return "";
  return text.trim();
}

function extractIncomingTextEvents(body: any): IncomingTextEvent[] {
  const platform: Platform = body?.object === "instagram" ? "instagram" : "facebook";
  const entries = Array.isArray(body?.entry) ? body.entry : [];
  const out: IncomingTextEvent[] = [];

  for (const entry of entries) {
    const messaging = Array.isArray(entry?.messaging) ? entry.messaging : [];
    for (const event of messaging) {
      const senderId = event?.sender?.id;
      const isEcho = event?.message?.is_echo;
      const text = normalizeIncomingText(event?.message?.text);

      if (!senderId || !text) continue;

      out.push({ platform, senderId, text, isEcho });
    }

    const changes = Array.isArray(entry?.changes) ? entry.changes : [];
    for (const change of changes) {
      const value = change?.value;

      const messages = Array.isArray(value?.messages) ? value.messages : [];
      for (const msg of messages) {
        const senderId = msg?.from;
        const text = normalizeIncomingText(msg?.text?.body ?? msg?.text);
        if (!senderId || !text) continue;
        out.push({ platform, senderId, text });
      }

      const fallbackSenderId = value?.from?.id ?? value?.sender?.id;
      const fallbackText = normalizeIncomingText(value?.message?.text ?? value?.text);
      if (fallbackSenderId && fallbackText) {
        out.push({ platform, senderId: fallbackSenderId, text: fallbackText });
      }
    }
  }

  return out;
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

async function genererReponseIA(userText: string, platform: Platform) {
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
- The user is messaging via ${platform === "instagram" ? "Instagram Direct" : "Facebook Messenger"}. Keep replies short and helpful.

--- WEBSITE CONTEXT START ---
${context}
--- WEBSITE CONTEXT END ---`,
    prompt: normalizeForPrompt(userText),
  });

  return (result.text || "").trim();
}

function getAccessTokenForPlatform(platform: Platform) {
  return platform === "instagram" ? INSTAGRAM_PAGE_ACCESS_TOKEN : FB_PAGE_ACCESS_TOKEN;
}

async function envoyerMessage(senderId: string, responseText: string, platform: Platform) {
  const token = getAccessTokenForPlatform(platform);
  if (!token) {
    throw new Error(`Missing env ${platform === "instagram" ? "INSTAGRAM_PAGE_ACCESS_TOKEN" : "FB_PAGE_ACCESS_TOKEN"}`);
  }

  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${token}`;

  const payload = {
    recipient: { id: senderId },
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

  if (!body || (body.object !== "page" && body.object !== "instagram")) {
    return new NextResponse(null, { status: 404 });
  }

  const events = extractIncomingTextEvents(body);

  for (const event of events) {
    try {
      if (event.isEcho) continue;

      const reponseIA = await genererReponseIA(event.text, event.platform);
      await envoyerMessage(
        event.senderId,
        reponseIA || "Je n'ai pas compris, peux-tu reformuler ?",
        event.platform,
      );
    } catch (err) {
      console.error("Webhook event error:", err);
      continue;
    }
  }

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}
