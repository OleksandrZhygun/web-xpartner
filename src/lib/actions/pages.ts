"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export type PageContentFormState = { success?: boolean };

export async function updatePageContentAction(
  key: string,
  _prevState: PageContentFormState,
  formData: FormData
): Promise<PageContentFormState> {
  await requireAdmin();

  const titlePl = String(formData.get("titlePl") ?? "").trim();
  const titleUk = String(formData.get("titleUk") ?? "").trim();
  const bodyPl = String(formData.get("bodyPl") ?? "").trim();
  const bodyUk = String(formData.get("bodyUk") ?? "").trim();

  await prisma.pageContent.upsert({
    where: { key },
    update: { titlePl, titleUk, bodyPl, bodyUk },
    create: { key, titlePl, titleUk, bodyPl, bodyUk },
  });

  const publicSlug = key === "home" ? "" : `/${key}`;
  revalidatePath(`/admin/pages/${key}`);
  revalidatePath(`/pl${publicSlug}`);
  revalidatePath(`/uk${publicSlug}`);
  return { success: true };
}
