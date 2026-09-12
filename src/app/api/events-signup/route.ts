import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EVENTS_RECIPIENT = "beau@cciint.com";

function buildRedirectUrl(req: Request, redirectTo: string, success: boolean): URL {
  const fallback = "/events";
  const safeTarget = redirectTo.startsWith("/") ? redirectTo : fallback;
  const target = new URL(safeTarget, req.url);
  target.searchParams.delete("sent");
  target.searchParams.delete("error");
  target.searchParams.set(success ? "sent" : "error", "1");
  return target;
}

async function sendEmailViaResend(payload: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventCategories: string[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "CCI Events <onboarding@resend.dev>";
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  const subject = `New CCI event signup from ${payload.name}`.trim();
  const text = [
    "New events signup submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Event Type: ${payload.eventType}`,
    `Event Categories: ${payload.eventCategories.length ? payload.eventCategories.join(", ") : "None selected"}`,
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [EVENTS_RECIPIENT],
        reply_to: payload.email,
        subject,
        text,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Email provider timeout after 10s");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend API error (${response.status}): ${details}`);
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const redirectTo = String(formData.get("redirectTo") ?? "").trim();

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    eventType: String(formData.get("eventType") ?? "").trim(),
    eventCategories: formData
      .getAll("eventCategories")
      .map((value) => String(value).trim())
      .filter(Boolean),
  };

  try {
    await sendEmailViaResend(payload);
    return NextResponse.redirect(buildRedirectUrl(req, redirectTo, true), 303);
  } catch (error) {
    console.error("Events signup email send failed", error);
    return NextResponse.redirect(buildRedirectUrl(req, redirectTo, false), 303);
  }
}
