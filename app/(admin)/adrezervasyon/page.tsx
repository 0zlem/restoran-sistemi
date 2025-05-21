"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showToast } from "@/lib/toast";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdQuestionAnswer } from "react-icons/md";
import { Input } from "@/components/ui/input";

const RezervasyonPage = ({ email }: { email: string }) => {
  const [rez, setRez] = useState<
    {
      id: string;
      adSoyad: string;
      email: string;
      telefon: string;
      tarih: string;
      saat: string;
      kisiSayisi: number;
    }[]
  >([]);

  const [text, setText] = useState("");

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/rezervasyon/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: text }),
      });

      if (res.ok) {
        showToast("E-posta başarıyla gönderildi!", "success");
        setText("");
      } else {
        showToast("E-posta gönderme başarısız!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const rezervasyon = await fetch("/api/rezervasyon");

        const rezData = await rezervasyon.json();
        console.log(rezData);

        setRez(rezData || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function rezDelete(id: string) {
    try {
      const res = await fetch(`/api/rezervasyon/sil/:id`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        showToast("Silme işlemi başarılı!", "success");
      }

      if (!res.ok) {
        throw new Error("Silme işlemi başarısız!");
      }

      setRez((prevRez) => prevRez.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Rezervasyon silme hatası:", error);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 ">
      <div className=" bg-white m-20 p-5">
        <Table className="w-[1000px] font-bold  ">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-10">ID</TableHead>
              <TableHead className="pl-10">Ad Soyad</TableHead>
              <TableHead className="pl-10">Email</TableHead>
              <TableHead className="pl-10">Telefon</TableHead>
              <TableHead className="pl-10">Tarih</TableHead>
              <TableHead className="pl-10">Saat</TableHead>
              <TableHead className="pl-10">Kişi Sayısı</TableHead>
              <TableHead className="pl-10">Sil</TableHead>
              <TableHead className="pl-10">Yanıtla</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rez.map((rezi) => (
              <TableRow key={rezi.id}>
                <TableCell className="pl-10">{rezi.id}</TableCell>
                <TableCell className="pl-10">{rezi.adSoyad}</TableCell>
                <TableCell className="pl-10">{rezi.email}</TableCell>
                <TableCell className="pl-10">{rezi.telefon}</TableCell>
                <TableCell className="pl-10">{rezi.tarih}</TableCell>
                <TableCell className="pl-10">{rezi.saat}</TableCell>
                <TableCell className="pl-10">{rezi.kisiSayisi}</TableCell>
                <TableCell className="pl-10">
                  <Button
                    className="bg-red-700"
                    onClick={() => rezDelete(rezi.id)}
                  >
                    <ImCross />
                  </Button>
                </TableCell>
                <TableCell className="pl-10">
                  <Popover>
                    <PopoverTrigger>
                      {" "}
                      <Button className="bg-blue-500">
                        <MdQuestionAnswer />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        onSubmit={handleSumbit}
                        className="flex flex-col gap-3"
                      >
                        <label className="text-sm font-bold text-gray-700">
                          Yanıtla
                        </label>
                        <Input
                          type="text"
                          className="border p-2 rounded"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <Button
                          type="submit"
                          className="bg-green-500 text-white"
                        >
                          Gönder
                        </Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RezervasyonPage;
