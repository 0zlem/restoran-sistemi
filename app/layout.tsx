"use client";
import "./globals.css";
import Menu from "@/components/menu";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const hiddenPaths = ["/admenu", "/adrezervasyon", "/adresimler"];

  return (
    <html lang="en">
      <body>
        {!hiddenPaths.some((path) => pathname.startsWith(path)) && <Menu />}
        <Toaster />
        {children}
      </body>
    </html>
  );
}
