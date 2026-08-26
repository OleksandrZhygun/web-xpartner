"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export type SettingsFormState = { error?: string; success?: boolean };

export async function updateSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();

  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const addressPl = String(formData.get("addressPl") ?? "").trim();
  const addressUk = String(formData.get("addressUk") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();
  const tiktokUrl = String(formData.get("tiktokUrl") ?? "").trim();
  const facebookUrl = String(formData.get("facebookUrl") ?? "").trim();

  if (!phone || !email) {
    return { error: "Телефон та e-mail є обов'язковими." };
  }

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: {
      phone,
      email,
      addressPl,
      addressUk,
      instagramUrl: instagramUrl || null,
      tiktokUrl: tiktokUrl || null,
      facebookUrl: facebookUrl || null,
    },
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export type PasswordFormState = { error?: string; success?: boolean };

export async function changePasswordAction(
  _prevState: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  await requireAdmin();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) return { error: "Налаштування не знайдено." };

  const ok = await bcrypt.compare(currentPassword, settings.adminPasswordHash);
  if (!ok) return { error: "Поточний пароль невірний." };

  if (newPassword.length < 6) {
    return { error: "Новий пароль має містити щонайменше 6 символів." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Паролі не збігаються." };
  }

  const adminPasswordHash = await bcrypt.hash(newPassword, 10);
  await prisma.siteSettings.update({ where: { id: 1 }, data: { adminPasswordHash } });

  return { success: true };
}
