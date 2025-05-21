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
import { useForm } from "react-hook-form";
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
import Image from "next/image";

const resimSchema = z.object({
  resimurl: z.any(),
  kategori: z.string().min(1),
});

const ResimPage = () => {
  const [resim, setResim] = useState<
    { id: string; resimurl: string; kategori: string }[]
  >([]);
  const [selectedResim, setSelectedResim] = useState("");

  const resimForm = useForm<z.infer<typeof resimSchema>>({
    resolver: zodResolver(resimSchema),
    defaultValues: {
      resimurl: "",
      kategori: "",
    },
  });

  async function fetchData() {
    try {
      const resimRes = await fetch("/api/resimler");

      const resimData = await resimRes.json();

      setResim(resimData || []);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmitResim(values: z.infer<typeof resimSchema>) {
    const file = values.resimurl[0];
    const fileName = file.name;
    const baseImagePath = "/restoran";

    const requestBody = {
      resimAdi: fileName,
      kategori: values.kategori,
      resimYolu: `${baseImagePath}/${fileName}`,
    };

    try {
      const res = await fetch("/api/resimler/ekle", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);

      if (res.ok) {
        showToast("Resim eklendi!", "success");
        fetchData();
      } else {
        showToast("Resim ekleme başarısız!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onDeleteResim() {
    try {
      const res = await fetch("/api/resimler/sil", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resimurl: selectedResim }),
      });

      if (res.ok) {
        showToast("Resim silindi!", "success");
        fetchData();
        setSelectedResim("");
      } else {
        showToast("Silme işlemi başarısız!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-10">
      <div className="flex flex-row items-center">
        <div className=" m-2">
          <Card className="w-[500px] ">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl bg-[#8b6e5c] p-2 text-white rounded-lg">
                Resim Ekle
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <Form {...resimForm}>
                <form
                  onSubmit={resimForm.handleSubmit(onSubmitResim)}
                  className="space-y-8"
                >
                  <FormField
                    control={resimForm.control}
                    name="resimurl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resim Seç</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resimForm.control}
                    name="kategori"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori Seç</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="anasayfa">Anasayfa</SelectItem>
                            <SelectItem value="menu">Menü</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center items-center">
                    {" "}
                    <Button
                      className="bg-[#7B8F4B] w-50 hover:bg-[#518547] "
                      type="submit"
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
                Resim Sil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedResim}>
                <h2 className="font-bold text-sm">Kategori Seç</h2>
                <SelectTrigger className="w-full mt-2 mb-5">
                  <SelectValue placeholder="Silmek için kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {resim.map((resim) => (
                    <SelectItem key={resim.resimurl} value={resim.resimurl}>
                      {resim.resimurl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex justify-center items-center">
                <Button
                  className="bg-[#7B8F4B] w-50 hover:bg-[#518547]"
                  type="submit"
                  onClick={onDeleteResim}
                >
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white m-5 rounded-lg">
        <Table className="w-[1000px]">
          <TableHeader className="text-center h-12 font-bold text-lg bg-[#8b6e5c] p-2">
            <TableRow>
              <TableHead className="pl-10 text-white">Resim</TableHead>
              <TableHead className="pl-10 text-white">Kategori</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-12">
            {resim.map((resims) => (
              <TableRow key={resims.id}>
                <TableCell className="pl-10">
                  <Image
                    src={resims.resimurl}
                    alt="resim"
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell className="pl-10 font-bold uppercase">
                  {resims.kategori}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResimPage;
