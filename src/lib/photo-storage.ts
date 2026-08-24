import path from "path";
import crypto from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";

// Stored on the persistent volume (mounted at /app/data in production) so
// uploaded photos survive redeploys, unlike files written under public/.
export const PHOTOS_DIR = path.join(process.cwd(), "data", "uploads");
export const PHOTO_URL_PREFIX = "/photos";

export async function saveUploadedPhoto(file: File): Promise<string> {
  await mkdir(PHOTOS_DIR, { recursive: true });
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(PHOTOS_DIR, filename), buffer);
  return `${PHOTO_URL_PREFIX}/${filename}`;
}

export async function deletePhotoFile(url: string): Promise<void> {
  const filename = path.basename(url);
  await unlink(path.join(PHOTOS_DIR, filename)).catch(() => {});
}
