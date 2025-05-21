"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaAddressCard, FaPhone } from "react-icons/fa";
import { IoMdClock, IoMdMail } from "react-icons/io";

const iletisimPage = () => {
  return (
    <div>
      <h1 className="text-center bg-[#79675C] m-15 p-3 text-white font-bold text-2xl w-[1000px] mx-auto">
        Bize Ulaşın
      </h1>
      <Card className="flex justify-center items-center w-[800px] h-[600px] m-auto text-xl">
        <CardContent className="flex flex-col space-y-10 text-center">
          <span className="block bg-[#F0EAD2] p-5 font-serif">
            Unutulmaz bir gastronomi deneyimi için aşağıdaki iletişim
            bilgilerimizden bize ulaşabilirsiniz.
          </span>
          <div className="flex flex-col items-center bg-[#6C584C] p-3 text-white">
            <FaAddressCard className="text-5xl bg-[#ADC178] transition-all duration-300 hover:bg-[#ADC178] hover:scale-x-125  p-1 h-20 w-20 mb-2" />
            <span>
              Galataport, Kılıçali Paşa Mahallesi, Meclis-i Mebusan Caddesi, Dış
              Kapı No:8, İç Kapı No:102, Beyoğlu, İstanbul
            </span>
          </div>
          <div className="flex justify-around w-full bg-[#6C584C]  p-3 text-white">
            <div className="flex flex-col items-center">
              <FaPhone className="text-5xl bg-[#ADC178] transition-all duration-300 hover:bg-[#ADC178] hover:scale-x-125 hover:text-white p-1 h-20 w-20 mb-2" />
              <span>+90 212 401 06 33</span>
            </div>
            <div className="flex flex-col items-center">
              <IoMdMail className="text-5xl bg-[#ADC178] transition-all duration-300 hover:bg-[#ADC178] hover:scale-x-125  p-1 h-20 w-20 mb-2" />
              <span>info@oz.com.tr</span>
            </div>
            <div className="flex flex-col items-center">
              <IoMdClock className="text-5xl bg-[#ADC178] transition-all duration-300 hover:bg-[#ADC178] hover:scale-x-125  p-1 h-20 w-20 mb-2" />
              <span>Her gün 10:00 - 00:00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default iletisimPage;
