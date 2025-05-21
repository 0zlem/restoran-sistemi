import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Çıkış başarılı!" });

  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  return response;
}
