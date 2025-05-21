/*
  Warnings:

  - You are about to drop the `kullanici` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Rezervasyon_email_key";

-- AlterTable
ALTER TABLE "Rezervasyon" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "tarih" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "kullanici";

-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,

    CONSTRAINT "kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resimler" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Resimler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_email_key" ON "Kullanici"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_password_key" ON "Kullanici"("password");
