-- CreateTable
CREATE TABLE "kullanici" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuKategori" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,

    CONSTRAINT "MenuKategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "yemekAdi" TEXT NOT NULL,
    "kategoriId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rezervasyon" (
    "id" SERIAL NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,
    "saat" TEXT NOT NULL,
    "kisiSayisi" INTEGER NOT NULL,

    CONSTRAINT "Rezervasyon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_email_key" ON "kullanici"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_password_key" ON "kullanici"("password");

-- CreateIndex
CREATE UNIQUE INDEX "MenuKategori_ad_key" ON "MenuKategori"("ad");

-- CreateIndex
CREATE UNIQUE INDEX "Rezervasyon_email_key" ON "Rezervasyon"("email");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "MenuKategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
