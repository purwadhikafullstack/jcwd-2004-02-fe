import Image from "next/image";
import { Button } from "@chakra-ui/react";

function HomePrescriptionCard() {
  return (
    <div className="flex mt-[56px] rounded-xl shadow-lg shadow-slate-100 border-[0.1px] border-slate-50 justify-between">
      <div className="rounded-xl">
        <div className="lg:h-[170px] lg:w-[511px] h-[76px] overflow-hidden relative rounded-xl ">
          <Image src={"/home2.svg"} layout="fill" objectFit="cover"></Image>
        </div>
      </div>
      <div className="w-[352px] ml-[11px] my-auto">
        <div className="text-2xl font-bold tracking-wide text-primary">
          Punya Resep Doktor?
        </div>
        <div className="text-sm font-medium tracking-wide text-slate-700 mt-[12px]">
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto tidak
          boleh lebih dari 10 MB
        </div>
      </div>
      <div className="my-auto mr-[28px]">
        <Button
          height="48px"
          width="274px"
          textColor={"whiteAlpha.900"}
          bgColor={"brand.primary"}
        >
          {" "}
          Unggah Resep
        </Button>
      </div>
    </div>
  );
}

export default HomePrescriptionCard;
