import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { ad } = await req.json();

  const { error } = await supabase.from("MenuKategori").delete().eq("ad", ad);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Kategori silindi." }, { status: 200 });
}
