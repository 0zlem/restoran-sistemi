"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type MenuItem = {
  id: string;
  yemekAdi: string;
  kategoriAd: string;
};

type Resim = {
  id: string;
  resimurl: string;
  kategori: string;
};

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [kategoriListesi, setKategoriListesi] = useState<string[]>([]);
  const [menuResim, setMenuResim] = useState<Resim[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: menuData, error: menuError } = await supabase
        .from("Menu")
        .select("id, yemekAdi, kategoriId");

      if (menuError) {
        console.error(
          "Menü verileri alınırken hata oluştu:",
          menuError.message
        );
        return;
      }

      const { data: kategoriData, error: kategoriError } = await supabase
        .from("MenuKategori")
        .select("id, ad");

      if (kategoriError) {
        console.error(
          "Kategoriler alınırken hata oluştu:",
          kategoriError.message
        );
        return;
      }

      const kategoriMap = new Map(kategoriData.map((kat) => [kat.id, kat.ad]));

      const formattedMenu = menuData.map((menu) => ({
        id: menu.id,
        yemekAdi: menu.yemekAdi,
        kategoriAd: kategoriMap.get(menu.kategoriId) || "Bilinmiyor",
      }));

      const uniqueKategoriler = [
        ...new Set(formattedMenu.map((item) => item.kategoriAd)),
      ];

      setMenuItems(formattedMenu);
      setKategoriListesi(uniqueKategoriler);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchResimMenu() {
      try {
        const res = await fetch("/api/resimler");
        const data = await res.json();

        if (res.ok) {
          setMenuResim(
            data.filter((resim: Resim) => resim.kategori === "menu")
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchResimMenu();
  }, []);

  return (
    <>
      <div className="flex flex-row p-5 justify-center ">
        {menuResim.map((resim) => (
          <div
            key={resim.id}
            className="p-5 hover:scale-110 bg-[#6C584C] rounded-2xl w-80 m-5"
          >
            <Image
              src={resim.resimurl}
              width={400}
              height={400}
              alt="menu resim"
              className="w-[400px] h-[400px] object-contain"
            />
          </div>
        ))}
      </div>
      <div className="mt-2 mb-3">
        <Table className="bg-[#6C584C] text-white w-[1800px] m-auto rounded-2xl">
          <TableHeader className="bg-[#A98467]">
            <TableRow>
              <TableHead className="text-white text-center text-4xl p-3">
                ❧ Menü ☙
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-lg font-serif">
            <tr className="grid grid-cols-5 gap-6 p-6">
              {kategoriListesi.map((kategori) => (
                <tr key={kategori} className="p-4 bg-[#F0EAD2] rounded-lg">
                  <tr className="text-center text-2xl flex justify-center items-center font-bold  text-white bg-[#7B8F4B] ">
                    {kategori}
                  </tr>
                  <tr className="space-y-6">
                    {menuItems
                      .filter((item) => item.kategoriAd === kategori)
                      .map((yemek) => (
                        <tr
                          key={yemek.id}
                          className="mt-5 w-[300px] flex  space-x-2 p-3 bg-[#593d3b] rounded-lg hover:scale-110"
                        >
                          <FaCircle className="text-xl text-[#7B8F4B]" />
                          <tr className="text-white">{yemek.yemekAdi}</tr>
                        </tr>
                      ))}
                  </tr>
                </tr>
              ))}
            </tr>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MenuPage;
