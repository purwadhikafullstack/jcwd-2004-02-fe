import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";

function PrescritpionBerhasil() {
  const router = useRouter();

  return (
    <div>
      <div>
        <MetaDecorator
          title={"Resep / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <>
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
      </>
    </div>
  );
}

export default PrescritpionBerhasil;
