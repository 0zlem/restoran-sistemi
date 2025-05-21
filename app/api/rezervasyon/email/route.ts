import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Eksik veri!" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Rezervasyon Talebi",
      text: `Mesajınız: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "E-posta başarıyla gönderildi!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "E-posta gönderme başarısız!" },
      { status: 500 }
    );
  }
}
