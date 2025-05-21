import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const rez = await req.json();
    console.log("Gelen veri:", rez); // 🟢 Gelen verileri kontrol et

    const { fullname, email, telefon, date, time, kisi } = rez;
    console.log("Ad Soyad:", fullname);
    console.log("Email:", email);
    console.log("Telefon:", telefon);
    console.log("Tarih:", date);
    console.log("Saat:", time);
    console.log("Kişi Sayısı:", kisi);

    const formattedDate = new Date(date).toISOString();
    console.log("Formatted Date:", formattedDate);

    const { data, error } = await supabase.from("Rezervasyon").insert([
      {
        adSoyad: fullname,
        email,
        telefon,
        tarih: formattedDate,
        saat: time,
        kisiSayisi: parseInt(kisi),
      },
    ]);

    if (error) {
      console.error("Supabase Hatası:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Supabase'e eklenen veri:", data);
    return NextResponse.json(
      { message: "Rezervasyon başarıyla eklendi!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Genel Hata:", error);
    return NextResponse.json({ error: "Sunucu hatası!" }, { status: 500 });
  }
}
