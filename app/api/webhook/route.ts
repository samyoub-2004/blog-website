import { NextResponse } from "next/server";

export const runtime = "nodejs";

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

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
      const senderPsid: string | undefined = event?.sender?.id;
      const textRecu: string | undefined = event?.message?.text;

      if (!senderPsid || !textRecu) continue;

      if (textRecu.toLowerCase() === "salut") {
        await envoyerMessage(senderPsid, "Salut cher utilisateur ! Je suis ton bot de dev. 🚀");
      } else {
        await envoyerMessage(
          senderPsid,
          `Tu as dit : "${textRecu}". Je suis encore en train d'apprendre !`,
        );
      }
    }
  }

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}
