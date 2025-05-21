import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { yemekAdi } = await req.json();

  const { error } = await supabase
    .from("Menu")
    .delete()
    .eq("yemekAdi", yemekAdi);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Menu silindi." }, { status: 200 });
}
