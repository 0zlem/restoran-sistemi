/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";

const formSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email({ message: "Geçerli bir email adresi giriniz!" }),
  password: z
    .string()
    .min(6, { message: "En az altı karakter içeren şifre giriniz!" }),
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Bir hata oluştu.");
        return;
      } else {
        showToast("Kayıt başarılı!", "success");
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center m-36">
      <div className=" p-24 w-[800px] rounded-2xl bg-[url(/restoran/login.jpg)] ">
        <Card className="w-[600px] bg-[#DDE5B6] shadow-lg">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-center bg-[#6C584C] text-white p-2 rounded-2xl">
              Kayıt Ol
            </CardTitle>
          </CardHeader>
          <CardContent>
            {" "}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-[#6C584C] p-2 text-white w-[80px] rounded-lg  font-bold ">
                        Ad Soyad
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" border-[#6C584C] "
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-[#6C584C] p-2 text-white w-[60px] rounded-lg font-bold">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" border-[#6C584C]"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-[#6C584C] p-2 text-white w-[55px] rounded-lg  font-bold ">
                        Şifre
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" border-[#6C584C] "
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center items-center ">
                  {" "}
                  <Button
                    className="w-[200px] font-bold text-md hover:bg-[#7B8F4B] bg-[#583101]"
                    type="submit"
                  >
                    Kayıt Ol
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
