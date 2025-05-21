import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { yemekAdi, kategoriId } = await req.json();

  const { data, error } = await supabase
    .from("Menu")
    .insert([{ yemekAdi, kategoriId }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
