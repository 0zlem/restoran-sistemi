"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Resim = {
  id: string;
  resimurl: string;
  kategori: string;
};

export default function Home() {
  const [resim, setResim] = useState<Resim[]>([]);

  useEffect(() => {
    async function fetchResim() {
      try {
        const res = await fetch("/api/resimler");
        const data = await res.json();
        if (res.ok) {
          setResim(
            data.filter((resim: Resim) => resim.kategori === "anasayfa")
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchResim();
  }, []);

  return (
    <>
      <div>
        <Carousel
          className="w-[1500px] flex justify-center items-center m-auto mt-10 "
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
        >
          <CarouselContent>
            {resim.map((resims) => (
              <CarouselItem
                key={resims.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-[#ADC178] flex justify-center rounded-4xl">
                  <Image
                    src={resims.resimurl}
                    width={400}
                    height={400}
                    alt="slider resim"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mb-10">
        <Card className="bg-[#79675C] m-25 p-20 border-none">
          <CardHeader>
            <CardTitle className="text-5xl text-white pb-10 font-serif">
              Restaurant
            </CardTitle>
            <CardDescription className="text-xl text-white font-serif">
              Yaz-kış demeden durmaksızın yanan ateşimizle, menümüzü ve lezzet
              keşiflerimizi mevsimlerin ruhuna ve malzemesine göre
              çeşitlendiriyoruz. Farklı pişirme tekniklerini ve yöresel
              tarifleri, yerel malzemelerle yorumluyoruz.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex gap-4">
          <Card className="bg-[#79675C] m-15 w-[1000px] border-none flex justify-center">
            <CardHeader>
              <CardTitle className="text-2xl text-white pb-5 font-serif">
                Mottomuz
              </CardTitle>
              <CardDescription className="text-md text-white font-serif">
                Mevsimleri, Bir masa etrafında buluşmayı, Kahkahanın eşlik
                ettiği kadeh seslerini, Yemeği, -haliyle ateşi… Paylaşmayı ve
                eşitliği, Anlamayı. Olduğu haliyle sevmeyi. Denemeyi, Toprağın,
                suyun, güneşin ve emeğin hayat verdiği malzemelerle yemek
                mucizesini ve yöreselliği konuşmayı, Öğrenmeyi, değişmeyi ve
                çeşitliliği… seviyoruz.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-[#79675C] m-15 border-none">
            <CardHeader>
              <CardDescription className="text-md text-white font-serif">
                <Image
                  src={"/restoran/resim.avif"}
                  width={600}
                  height={100}
                  alt="resim"
                ></Image>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
