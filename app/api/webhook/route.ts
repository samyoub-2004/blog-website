import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

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

async function genererReponseIA(userText: string, platform: "facebook" | "instagram") {
  const projectRoot = process.cwd();
  const rawContext = await loadSiteContext(projectRoot);
  const context = normalizeForPrompt(rawContext);

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    system: `You are the website assistant for xo-link.
      Source of truth: ${context}
      Rules:
      - Answer briefly in French.
      - Never invent details (prices, services) not in context.
      - Channel: ${platform === "instagram" ? "Instagram Direct" : "Facebook Messenger"}.`,
    prompt: normalizeForPrompt(userText),
  });

  return (result.text || "").trim();
}

async function envoyerMessage(senderPsid: string, responseText: string, platform: "facebook" | "instagram") {
  // Sélection du bon token selon la provenance du message
  const token = platform === "instagram" 
    ? process.env.INSTAGRAM_PAGE_ACCESS_TOKEN 
    : process.env.FB_PAGE_ACCESS_TOKEN;

  if (!token) throw new Error(`Missing token for ${platform}`);

  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${token}`;

  const payload = {
    recipient: { id: senderPsid },
    message: { text: responseText },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.text();
    console.error(`Graph API Error (${platform}):`, errorData);
  }
}

// --- WEBHOOK VERIFICATION (GET) ---
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token === VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}

// --- WEBHOOK RECEIVER (POST) ---
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Accepte "page" (Facebook) ou "instagram"
  if (!body || (body.object !== "page" && body.object !== "instagram")) {
    return new NextResponse(null, { status: 404 });
  }

  const platform = body.object === "instagram" ? "instagram" : "facebook";
  const entries = Array.isArray(body.entry) ? body.entry : [];

  for (const entry of entries) {
    const messaging = Array.isArray(entry.messaging) ? entry.messaging : [];

    for (const event of messaging) {
      try {
        const senderPsid = event?.sender?.id;
        const textRecu = event?.message?.text;
        const isEcho = event?.message?.is_echo;

        if (!senderPsid || isEcho || !textRecu) continue;

        const reponseIA = await genererReponseIA(textRecu, platform);
        await envoyerMessage(
          senderPsid, 
          reponseIA || "Je n'ai pas compris, peux-tu reformuler ?", 
          platform
        );
      } catch (err) {
        console.error("Error processing event:", err);
        continue;
      }
    }
  }

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}