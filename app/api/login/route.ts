/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key";

  try {
    const { email, password } = await req.json();

    const { data: user, error } = await supabase
      .from("Kullanici")
      .select("id, email, fullname, password")
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı!" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Şifre hatalı!" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, fullname: user.fullname },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Giriş başarılı!" });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Lax; Max-Age=3600`
    );

    return response;
  } catch (error) {
    console.log("Login API Hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası!" }, { status: 500 });
  }
}
