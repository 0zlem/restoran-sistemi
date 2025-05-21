/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { showToast } from "@/lib/toast";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Ad Soyad en az 2 karakter olmalıdır." }),
  email: z
    .string()
    .email({ message: "Lütfen geçerli bir e-posta adresi giriniz." }),
  telefon: z
    .string()
    .min(10, { message: "Telefon numarası en az 10 karakter olmalıdır." }),
  date: z.string().min(1, { message: "Lütfen bir tarih seçiniz." }),
  time: z.string().min(2, { message: "Lütfen bir saat seçiniz." }),
  kisi: z.string().min(1, { message: "Kişi sayısını belirtmelisiniz." }),
});

const RezervasyonPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      telefon: "",
      date: "",
      time: "",
      kisi: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/rezervasyon/ekle", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log("Rezervasyon başarıyla eklendi");
        showToast("Rezervasyon işleminiz gerçekleşmiştir :)", "success");
        form.reset();
      } else {
        const errorData = await res.json();
        console.log(errorData.error || "Rezervasyon eklenirken hata oluştu");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const today = new Date().toISOString().split("T")[0];

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const minTime =
    selectedDate === today
      ? `${String(currentHour).padStart(2, "0")}:${String(
          currentMinute
        ).padStart(2, "0")}`
      : "00:00";

  return (
    <>
      <h1 className="flex justify-center bg-[#ADC178] rounded-lg mt-5 mb-0 font-bold font-serif text-2xl m-110">
        Rezervasyon
      </h1>
      <div className="flex justify-center items-center mt-7 gap-3 p-2">
        <Card className="w-4/12 bg-[#DDE5B6] shadow-lg shadow-[#7B8F4B]">
          <CardContent>
            <Image
              src={"/restoran/rez.jpg"}
              alt="resim"
              width={1000}
              height={700}
            ></Image>
          </CardContent>
        </Card>

        <Card className="w-10/12 flex justify-center bg-[#DDE5B6] shadow-lg shadow-[#7B8F4B]">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold font-serif bg-[#6C584C] text-white p-3">
              Hoş Geldiniz
            </CardTitle>
            <h1 className="font-serif text-lg mb-3 text-center bg-[#6C584C] text-white p-3">
              Rezervasyon için aşağıdaki formu doldurunuz.
            </h1>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 p-5"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Soyad</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon Numaranız</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tarih</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="date"
                          {...field}
                          min={today}
                          onChange={(e) => {
                            field.onChange(e);
                            setSelectedDate(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saat</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="time"
                          {...field}
                          min={minTime}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kisi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kişi Sayısı</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md border-[#6C584C]"
                          type="number"
                          {...field}
                          min={"1"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-[#6C584C] hover:bg-[#A98467]"
                  type="submit"
                >
                  Rezervasyonu Tamamla
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="w-4/12 bg-[#DDE5B6] shadow-lg shadow-[#7B8F4B]">
          <CardContent>
            <Image
              src={"/restoran/rez.jpg"}
              alt="resim"
              width={700}
              height={700}
            ></Image>
          </CardContent>
        </Card>
      </div>{" "}
    </>
  );
};

export default RezervasyonPage;
