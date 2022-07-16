import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

function PrescritpionBerhasil() {
  const router = useRouter();

  return (
    <div>
      <div className="hidden md:contents">
        <Navbar />
      </div>
      <div className="flex flex-col h-[600px] justify-center items-center">
        <div className="hidden md:contents">
          <img src={"/prescripsuccess1.svg"} />
          <img className="w-[200px] h-auto" src={"/prescripsuccess2.svg"} />
          <img src={"/prescripsuccess3.svg"} />
        </div>
        <div className="md:hidden w-[200px]">
          <img src={"/prescripsuccess4.svg"} />
        </div>
        <div className="md:hidden flex flex-col items-center">
          <div className="text-primary text-lg font-semibold ">
            Unggah resep berhasil!
          </div>
          <div className="text-gray-400 ">
            Kita akan review file anda secepatnya
          </div>
        </div>
        <Link href={"/userprofile/transactions"}>
          <Button
            colorScheme={"purple"}
            className="w-[260px] mt-2"
            type="button"
          >
            Lihat Progress Pemesanan
          </Button>
        </Link>

        <Link href={"/"}>
          <Button
            colorScheme={"purple"}
            className="w-[260px] mt-2"
            type="button"
            variant="outline"
          >
            Beranda
          </Button>
        </Link>
      </div>
      <div className="hidden md:contents">
        <Footer />
      </div>
    </div>
  );
}

export default PrescritpionBerhasil;
