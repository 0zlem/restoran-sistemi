import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { resimurl } = await req.json();
  try {
    const { error } = await supabase
      .from("resimler")
      .delete()
      .eq("resimurl", resimurl);
    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Resim başarıyla silindi" });
  } catch (error) {
    console.log(error);
  }
}
