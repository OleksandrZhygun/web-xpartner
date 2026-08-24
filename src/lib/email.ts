import { Resend } from "resend";

const TYPE_LABELS: Record<string, string> = {
  CAR: "Запит про авто",
  DRIVER: "Заявка водія",
  CONTACT: "Повідомлення з контактів",
};

export async function sendLeadNotification(lead: {
  type: string;
  name: string;
  phone: string;
  message?: string | null;
  carTitle?: string | null;
  toEmail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — skipping email notification.");
    return;
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "X-Partner <onboarding@resend.dev>";
  const subject = `${TYPE_LABELS[lead.type] ?? lead.type}: ${lead.name}`;

  const lines = [
    `Тип: ${TYPE_LABELS[lead.type] ?? lead.type}`,
    `Ім'я: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.carTitle ? `Авто: ${lead.carTitle}` : null,
    lead.message ? `Повідомлення: ${lead.message}` : null,
  ].filter(Boolean);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: lead.toEmail,
      subject,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
  }
}
