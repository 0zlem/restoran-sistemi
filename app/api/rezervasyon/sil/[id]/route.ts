import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
    }

    const { error } = await supabase.from("Rezervasyon").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Rezervasyon silindi." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Silme işlemi sırasında hata oluştu:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
