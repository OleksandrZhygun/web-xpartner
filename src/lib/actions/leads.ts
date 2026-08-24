"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { sendLeadNotification } from "@/lib/email";

export type LeadType = "CAR" | "DRIVER" | "CONTACT";

export type LeadFormState = { success?: boolean; error?: string };

export async function submitLeadAction(
  type: LeadType,
  carId: string | null,
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone) {
    return { error: "missing" };
  }
  if (name.length > 200 || phone.length > 50 || message.length > 2000) {
    return { error: "toolong" };
  }

  const [, settings] = await Promise.all([
    prisma.lead.create({
      data: {
        type,
        carId: carId ?? undefined,
        name,
        phone,
        message: message || undefined,
      },
    }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  if (settings?.email) {
    const car = carId ? await prisma.car.findUnique({ where: { id: carId } }) : null;
    await sendLeadNotification({
      type,
      name,
      phone,
      message,
      carTitle: car?.titlePl ?? null,
      toEmail: settings.email,
    });
  }

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function markLeadSeenAction(leadId: string, seen: boolean) {
  await requireAdmin();
  await prisma.lead.update({ where: { id: leadId }, data: { seen } });
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(leadId: string) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id: leadId } });
  revalidatePath("/admin/leads");
}
