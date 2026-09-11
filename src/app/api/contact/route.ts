import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONTACT_RECIPIENT = "kandaced1@icloud.com";

function buildRedirectUrl(req: Request, redirectTo: string, success: boolean): URL {
  const fallback = "/contact#contact-form";
  const safeTarget = redirectTo.startsWith("/") ? redirectTo : fallback;
  const target = new URL(safeTarget, req.url);
  target.searchParams.delete("sent");
  target.searchParams.delete("error");
  target.searchParams.set(success ? "sent" : "error", "1");
  return target;
}

async function sendEmailViaResend(payload: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  subscribe: boolean;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "CCI Contact <onboarding@resend.dev>";
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  const subject = `New CCI contact from ${payload.firstName} ${payload.lastName}`.trim();
  const text = [
    "New contact form submission",
    "",
    `Name: ${payload.firstName} ${payload.lastName}`.trim(),
    `Email: ${payload.email}`,
    `Subscribed: ${payload.subscribe ? "Yes" : "No"}`,
    "",
    "Message:",
    payload.message,
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
        to: [CONTACT_RECIPIENT],
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
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    subscribe: formData.get("subscribe") === "on",
  };

  try {
    await sendEmailViaResend(payload);
    return NextResponse.redirect(buildRedirectUrl(req, redirectTo, true), 303);
  } catch (error) {
    console.error("Contact email send failed", error);
    return NextResponse.redirect(buildRedirectUrl(req, redirectTo, false), 303);
  }
}
