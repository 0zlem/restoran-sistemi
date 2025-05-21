"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, Utensils, Calendar } from "lucide-react";
import { showToast } from "@/lib/toast";
import { IoIosImages } from "react-icons/io";

const AdminMenu = () => {
  const [user, setUser] = useState("Bilinmeyen Kullanıcı");

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data.user.fullname);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="fixed left-4 top-4 bg-[#6C584C] text-white p-2 rounded-md">
        <Menu size={28} />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-80 bg-[#6C584C] border-none text-white p-4"
      >
        <div className="flex flex-col gap-6 mt-16 w-full ">
          <Toggle className="bg-[#DDE5B6] mb-10 text-black w-full font-bold text-md">
            ↢ {user} ↣
          </Toggle>
          <Toggle className="bg-[#ADC178] text-black w-full gap-2 font-bold text-md">
            <Utensils />
            <Link href={"/admenu"}>Menü</Link>
          </Toggle>
          <Toggle className="bg-[#ADC178] text-black w-full gap-2 font-bold text-md">
            <Calendar />
            <Link href={"/adrezervasyon"}>Rezervasyon</Link>
          </Toggle>
          <Toggle className="bg-[#ADC178] text-black w-full gap-2 font-bold text-md">
            <IoIosImages />
            <Link href={"/adresimler"}>Resimler</Link>
          </Toggle>
        </div>
        <div className="mt-auto w-full flex justify-center">
          <Toggle className="bg-[#ADC178] text-black w-full gap-2 font-bold text-md">
            <LogOut />
            <Link
              href="/login"
              onClick={async (e) => {
                e.preventDefault();
                await fetch("/api/logout", {
                  method: "POST",
                  credentials: "include",
                });

                showToast("Çıkış başarılı!", "success");
                document.cookie =
                  "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                setTimeout(() => {
                  window.location.href = "/login";
                }, 1500);
              }}
            >
              Çıkış Yap
            </Link>
          </Toggle>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminMenu;
