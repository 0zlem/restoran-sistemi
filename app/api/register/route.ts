import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    console.log("Gelen Veriler:", { fullname, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("Kullanici")
      .insert([{ fullname, email, password: hashedPassword }])
      .select();

    if (error) {
      console.error("Supabase Hatası:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    console.log("Kaydedilen Kullanıcı:", data);

    return NextResponse.json(
      { message: "Kullanıcı başarıyla kaydedildi!", user: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sunucu Hatası:", error);
    return NextResponse.json({ error: "Kayıt başarısız!" }, { status: 500 });
  }
}
