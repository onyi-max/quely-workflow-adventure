"use client";

import { questionsForm } from "@/content/results";

export type SendResult = "sent" | "skipped" | "failed";

/**
 * Send a visitor's question to wherever `questionsForm.target` points (see content/results.ts).
 * With no target set, nothing is sent and the visitor still gets the thank-you ("skipped").
 */
export async function sendQuestion(firstName: string, email: string, question: string): Promise<SendResult> {
  const { target, fields } = questionsForm;
  const page = typeof window !== "undefined" ? window.location.href : "";
  // Never send an incomplete question, whatever the caller does.
  if (!firstName.trim() || !email.trim() || !question.trim()) return "failed";
  if (!target) return "skipped";

  try {
    // HubSpot form: "hubspot:<portalId>/<formGuid>"
    if (target.startsWith("hubspot:")) {
      const [portalId, formGuid] = target.slice("hubspot:".length).split("/");
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: fields.firstName, value: firstName },
            { name: fields.email, value: email },
            { name: fields.question, value: question },
          ],
          context: { pageUri: page, pageName: document.title },
        }),
      });
      return res.ok ? "sent" : "failed";
    }

    // Google Form: post the entries to its formResponse URL. Google doesn't allow reading
    // the response from another site, so a completed request counts as sent.
    if (target.includes("docs.google.com/forms")) {
      const body = new URLSearchParams({ [fields.firstName]: firstName, [fields.email]: email, [fields.question]: question });
      await fetch(target, { method: "POST", mode: "no-cors", body });
      return "sent";
    }

    // Anything else: a JSON POST.
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, question, page }),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
