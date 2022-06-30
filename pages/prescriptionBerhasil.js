import React, { Component } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

function prescritpionBerhasil() {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-[600px] justify-center items-center">
        <img src={"/prescripsuccess1.svg"} />
        <img className="w-[200px] h-auto" src={"/prescripsuccess2.svg"} />
        <img src={"/prescripsuccess3.svg"} />
        <Link href={"/transaction"}>
          <Button
            colorScheme={"purple"}
            className="w-[260px] mt-2"
            type="button"
          >
            Lihat Progress Pemesanan
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default prescritpionBerhasil;
