import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import Image from "next/image";
import { IoIosHome } from "react-icons/io";
import { MdEditCalendar, MdMenuBook } from "react-icons/md";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { IoLogInSharp } from "react-icons/io5";

const Menu = () => {
  return (
    <div>
      <Menubar className="h-25  bg-[#7B8F4B] justify-center">
        <div className="absolute left-6">
          <Image
            className=" rounded-full object-cover"
            src={"/restoran/logo1.jpg"}
            alt="logo"
            width={90}
            height={80}
          />
          <h1 className="font-bold text-sm text-center font-serif">
            Yonca Restoran
          </h1>
        </div>
        <MenubarMenu>
          <MenubarTrigger
            className="h-[45px] w-[100px] font-bold flex justify-center items-center text-md m-4
  bg-[#DDE5B6]"
          >
            <Link href={"/"} className="flex items-center gap-1">
              <IoIosHome className="text-md" />
              Anasayfa
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="h-[45px] w-[100px] font-bold flex justify-center items-center text-md m-4  bg-[#DDE5B6]">
            <Link href={"/menu"} className="flex items-center gap-1">
              <MdMenuBook /> Menü
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="h-[45px] w-[130px] font-bold flex justify-center items-center text-md m-4 bg-[#DDE5B6]">
            <Link href={"/rezervasyon"} className="flex items-center gap-1">
              {" "}
              <MdEditCalendar />
              Rezervasyon
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="h-[45px] w-[100px] font-bold flex justify-center items-center text-md m-4 bg-[#DDE5B6]">
            <Link href={"/iletisim"} className="flex items-center gap-1">
              <FaSquarePhoneFlip /> İletişim
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="h-[45px] w-[130px] font-bold flex justify-center items-center text-md m-4 bg-[#DDE5B6] absolute right-6 ">
            <Link href={"/login"} className="flex items-center gap-1">
              <IoLogInSharp />
              Admin Girişi
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Menu;
