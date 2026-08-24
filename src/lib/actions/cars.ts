"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { saveUploadedPhoto, deletePhotoFile } from "@/lib/photo-storage";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateCarPaths() {
  revalidatePath("/admin/cars");
  revalidatePath("/pl/cars");
  revalidatePath("/uk/cars");
  revalidatePath("/pl");
  revalidatePath("/uk");
}

export async function createCarAction(formData: FormData) {
  await requireAdmin();

  const car = await prisma.car.create({
    data: {
      titlePl: str(formData, "titlePl"),
      titleUk: str(formData, "titleUk"),
      descriptionPl: str(formData, "descriptionPl"),
      descriptionUk: str(formData, "descriptionUk"),
      price: parseFloat(str(formData, "price") || "0") || 0,
      priceUnitPl: str(formData, "priceUnitPl") || "dzień",
      priceUnitUk: str(formData, "priceUnitUk") || "день",
      available: formData.get("available") === "on",
    },
  });

  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  let order = 0;
  for (const file of files) {
    const url = await saveUploadedPhoto(file);
    await prisma.photo.create({ data: { url, order: order++, carId: car.id } });
  }

  revalidateCarPaths();
  redirect("/admin/cars");
}

export async function updateCarAction(carId: string, formData: FormData) {
  await requireAdmin();

  await prisma.car.update({
    where: { id: carId },
    data: {
      titlePl: str(formData, "titlePl"),
      titleUk: str(formData, "titleUk"),
      descriptionPl: str(formData, "descriptionPl"),
      descriptionUk: str(formData, "descriptionUk"),
      price: parseFloat(str(formData, "price") || "0") || 0,
      priceUnitPl: str(formData, "priceUnitPl") || "dzień",
      priceUnitUk: str(formData, "priceUnitUk") || "день",
      available: formData.get("available") === "on",
    },
  });

  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length) {
    const existingCount = await prisma.photo.count({ where: { carId } });
    let order = existingCount;
    for (const file of files) {
      const url = await saveUploadedPhoto(file);
      await prisma.photo.create({ data: { url, order: order++, carId } });
    }
  }

  revalidateCarPaths();
  revalidatePath(`/admin/cars/${carId}`);
}

export async function toggleCarAvailableAction(carId: string, available: boolean) {
  await requireAdmin();
  await prisma.car.update({ where: { id: carId }, data: { available } });
  revalidateCarPaths();
}

export async function deleteCarAction(carId: string) {
  await requireAdmin();

  const car = await prisma.car.findUnique({ where: { id: carId }, include: { photos: true } });
  if (car) {
    for (const photo of car.photos) {
      await deletePhotoFile(photo.url);
    }
  }
  await prisma.car.delete({ where: { id: carId } });

  revalidateCarPaths();
  redirect("/admin/cars");
}

export async function deletePhotoAction(photoId: string, carId: string) {
  await requireAdmin();

  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (photo) {
    await deletePhotoFile(photo.url);
    await prisma.photo.delete({ where: { id: photoId } });
  }

  revalidatePath(`/admin/cars/${carId}`);
  revalidateCarPaths();
}
