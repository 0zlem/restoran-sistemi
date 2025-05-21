import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { resimAdi, kategori, resimYolu } = await req.json();

    if (!resimAdi || !kategori || !resimYolu) {
      return NextResponse.json({ error: "Eksik veri!" }, { status: 400 });
    }

    const validCategories = ["anasayfa", "menu"];
    if (!validCategories.includes(kategori)) {
      return NextResponse.json(
        { error: "Geçersiz kategori!" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase.from("resimler").insert([
      {
        resimurl: resimYolu,
        kategori,
      },
    ]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json(
      { message: "Resim başarıyla kaydedildi!", url: resimYolu },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resim ekleme hatası:", error);
    return NextResponse.json(
      { error: "Resim ekleme başarısız!" },
      { status: 500 }
    );
  }
}
