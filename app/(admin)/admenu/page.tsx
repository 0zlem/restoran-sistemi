/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { appendErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/lib/toast";

const kategoriSchema = z.object({
  ad: z.string().min(1, "Kategori adı giriniz"),
});

const menuSchema = z.object({
  yemekAdi: z.string().min(1, "Yemek adı giriniz"),
  kategoriId: z.string().min(1, "Kategori seçmelisiniz"),
});

const MenuPage = () => {
  const [menu, setMenu] = useState<
    { id: string; yemekAdi: string; kategoriId: string }[]
  >([]);
  const [categori, setCategori] = useState<{ id: string; ad: string }[]>([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  const kategoriForm = useForm<z.infer<typeof kategoriSchema>>({
    resolver: zodResolver(kategoriSchema),
    defaultValues: {
      ad: "",
    },
  });

  const menuForm = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: { yemekAdi: "", kategoriId: "" },
  });

  async function fetchData() {
    try {
      const menuRes = await fetch("/api/menu");
      const kategoriRes = await fetch("/api/kategori");

      const menuData = await menuRes.json();
      const kategoriData = await kategoriRes.json();
      console.log(kategoriData);

      setMenu(menuData || []);
      setCategori(kategoriData || []);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmitKategori(values: z.infer<typeof kategoriSchema>) {
    const res = await fetch("/api/kategori/ekle", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await fetchData();
      kategoriForm.reset();
    }
  }

  async function onDeleteKategori() {
    if (!selectedKategori) {
      showToast("Lütfen bir kategori seçiniz!", "error");
      return;
    }

    const res = await fetch("/api/kategori/sil", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ad: selectedKategori }),
    });

    if (res.ok) {
      await fetchData();
      setSelectedKategori("");
    }
  }

  async function onSubmitMenu(values: z.infer<typeof menuSchema>) {
    console.log("Gönderilen değerler:", values);

    if (!values.kategoriId) {
      showToast("Lütfen bir kategori seçiniz!", "error");

      return;
    }

    const res = await fetch("/api/menu/ekle", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      await fetchData();
      menuForm.reset();
    }
  }

  async function onDeleteMenu() {
    if (!selectedMenu) {
      return;
    }
    const res = await fetch("/api/menu/sil", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yemekAdi: selectedMenu }),
    });
    if (res.ok) {
      await fetchData();
      setSelectedMenu("");
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-10">
      <div className="flex flex-row items-center">
        <div className=" m-2">
          <Card className="w-[500px] ">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl bg-[#8b6e5c] p-2 text-white rounded-lg">
                Kategori Ekle
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <Form {...kategoriForm}>
                <form
                  onSubmit={kategoriForm.handleSubmit(onSubmitKategori)}
                  className="space-y-8"
                >
                  <FormField
                    control={kategoriForm.control}
                    name="ad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori Adı</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center items-center">
                    {" "}
                    <Button
                      className="bg-[#7B8F4B] w-50 "
                      type="submit"
                      onClick={() => {
                        showToast("Başarıyla eklendi!", "success");
                      }}
                    >
                      Ekle
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="m-5">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl mt-5 mb-5 bg-[#8b6e5c] p-2 text-white rounded-lg">
                Kategori Sil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedKategori}>
                <SelectTrigger className="w-full mt-5 mb-5">
                  <SelectValue placeholder="Silmek için kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categori.map((kategori) => (
                    <SelectItem key={kategori.ad} value={kategori.ad}>
                      {kategori.ad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex justify-center items-center">
                <Button
                  className="bg-[#7B8F4B] w-50"
                  type="submit"
                  onClick={() => {
                    onDeleteKategori();
                    showToast("Başarıyla silindi!", "success");
                  }}
                >
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-row items-center">
        <div className=" m-5">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl bg-[#8b6e5c] p-2 text-white rounded-lg">
                Yemek Ekle
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <Form {...menuForm}>
                <form
                  onSubmit={menuForm.handleSubmit(onSubmitMenu)}
                  className="space-y-8"
                >
                  <FormField
                    control={menuForm.control}
                    name="yemekAdi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yemek Adı</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={menuForm.control}
                    name="kategoriId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori Adı</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value || ""}
                            onValueChange={(value) => {
                              field.onChange(value);
                              console.log("Seçilen Kategori ID:", value);
                            }}
                          >
                            <SelectTrigger className="w-[300px]">
                              <SelectValue placeholder="Kategori Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                              {categori.map((kategori) => (
                                <SelectItem
                                  key={kategori.id}
                                  value={kategori.id}
                                >
                                  {kategori.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center items-center">
                    {" "}
                    <Button
                      className="bg-[#7B8F4B] w-50 "
                      type="submit"
                      onClick={() => {
                        showToast("Başarıyla eklendi!", "success");
                      }}
                    >
                      Ekle
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className=" m-5">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl bg-[#8b6e5c] p-2 text-white rounded-lg">
                Yemek Sil
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <Select onValueChange={setSelectedMenu}>
                <SelectTrigger className="w-full mb-5 mt-5">
                  <SelectValue placeholder="Silmek için yemek seçin" />
                </SelectTrigger>
                <SelectContent>
                  {menu.map((m) => (
                    <SelectItem key={m.id} value={m.yemekAdi}>
                      {m.yemekAdi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-center items-center">
                {" "}
                <Button
                  className="bg-[#7B8F4B] w-50"
                  type="button"
                  onClick={() => {
                    onDeleteMenu();
                    showToast("Başarıyla silindi!", "success");
                  }}
                >
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className=" bg-white m-5 rounded-lg ">
        <Table className="w-[1000px] ">
          <TableHeader className="text-center h-12 font-bold text-lg bg-[#8b6e5c] p-2 ">
            <TableRow>
              <TableHead className="pl-32 text-white ">ID</TableHead>
              <TableHead className="pl-10 text-white">Yemek Adı</TableHead>
              <TableHead className="pl-10 text-white">Kategori Adı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-12">
            {menu.map((menus) => (
              <TableRow key={menus.id}>
                <TableCell className="pl-32">{menus.id}</TableCell>
                <TableCell className="pl-10">{menus.yemekAdi}</TableCell>
                <TableCell className="pl-10">
                  {categori.find((cat) => cat.id === menus.kategoriId)?.ad ||
                    "Bilinmiyor"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MenuPage;
