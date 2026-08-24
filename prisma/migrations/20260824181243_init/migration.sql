-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "titlePl" TEXT NOT NULL,
    "titleUk" TEXT NOT NULL,
    "descriptionPl" TEXT NOT NULL,
    "descriptionUk" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "priceUnitPl" TEXT NOT NULL DEFAULT 'dzień',
    "priceUnitUk" TEXT NOT NULL DEFAULT 'день',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "carId" TEXT NOT NULL,
    CONSTRAINT "Photo_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "carId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Lead_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "titlePl" TEXT NOT NULL,
    "titleUk" TEXT NOT NULL,
    "bodyPl" TEXT NOT NULL,
    "bodyUk" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "phone" TEXT NOT NULL DEFAULT '+48 000 000 000',
    "email" TEXT NOT NULL DEFAULT 'kontakt@x-partner.pl',
    "addressPl" TEXT NOT NULL DEFAULT 'Kraków, Polska',
    "addressUk" TEXT NOT NULL DEFAULT 'Краків, Польща',
    "adminPasswordHash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_key_key" ON "PageContent"("key");
