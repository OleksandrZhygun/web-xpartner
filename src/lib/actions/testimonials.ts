"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { saveUploadedPhoto, deletePhotoFile } from "@/lib/photo-storage";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/pl/testimonials");
  revalidatePath("/uk/testimonials");
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin();

  const photoFile = formData.get("photo");
  let photoUrl: string | null = null;
  if (photoFile instanceof File && photoFile.size > 0) {
    photoUrl = await saveUploadedPhoto(photoFile);
  }

  await prisma.testimonial.create({
    data: {
      name: str(formData, "name"),
      textPl: str(formData, "textPl"),
      textUk: str(formData, "textUk"),
      published: formData.get("published") === "on",
      photoUrl,
    },
  });

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(testimonialId: string, formData: FormData) {
  await requireAdmin();

  const existing = await prisma.testimonial.findUnique({ where: { id: testimonialId } });

  const photoFile = formData.get("photo");
  let photoUrl = existing?.photoUrl ?? null;
  if (photoFile instanceof File && photoFile.size > 0) {
    if (photoUrl) await deletePhotoFile(photoUrl);
    photoUrl = await saveUploadedPhoto(photoFile);
  }

  await prisma.testimonial.update({
    where: { id: testimonialId },
    data: {
      name: str(formData, "name"),
      textPl: str(formData, "textPl"),
      textUk: str(formData, "textUk"),
      published: formData.get("published") === "on",
      photoUrl,
    },
  });

  revalidateTestimonialPaths();
  revalidatePath(`/admin/testimonials/${testimonialId}`);
}

export async function deleteTestimonialAction(testimonialId: string) {
  await requireAdmin();

  const testimonial = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
  if (testimonial?.photoUrl) await deletePhotoFile(testimonial.photoUrl);
  await prisma.testimonial.delete({ where: { id: testimonialId } });

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function toggleTestimonialPublishedAction(testimonialId: string, published: boolean) {
  await requireAdmin();
  await prisma.testimonial.update({ where: { id: testimonialId }, data: { published } });
  revalidateTestimonialPaths();
}
