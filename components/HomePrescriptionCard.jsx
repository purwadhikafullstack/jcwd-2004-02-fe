import Image from "next/image";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

function HomePrescriptionCard({ alamat }) {
  const { isLogin } = useUser();
  // console.log(alamat, "al");
  const router = useRouter();

  return (
    <div className="flex mt-[56px] rounded-xl shadow-lg shadow-slate-100 border-[0.1px] border-slate-50 justify-between">
      <div className="rounded-xl">
        <div className="lg:h-[150px] lg:w-[451px] h-[76px] overflow-hidden relative rounded-xl ">
          <Image src={"/home2.svg"} layout="fill" objectFit="cover"></Image>
        </div>
      </div>
      <div className="w-[300px] ml-[11px] my-auto">
        <div className="text-lg font-bold tracking-wide text-primary">
          Punya Resep Dokter?
        </div>
        <div className="text-xs font-medium tracking-wide text-slate-700 mt-[12px]">
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto tidak
          boleh lebih dari 10 MB
        </div>
      </div>
      {/* kalau ada alamat */}
      {alamat.length ? (
        <div className="my-auto">
          <Link href={"/prescription"}>
            <Button
              height="40px"
              width="180px"
              textColor={"whiteAlpha.900"}
              bgColor={"brand.primary"}
            >
              Unggah Resep
            </Button>
          </Link>
        </div>
      ) : (
        // kalau tidak ada alamat
        <div className="my-auto mr-[28px]">
          {/* <Link href={"/address"}> */}
          <Button
            height="40px"
            width="180px"
            textColor={"whiteAlpha.900"}
            bgColor={"brand.primary"}
            onClick={() => {
              // kalau belum login
              if (!isLogin) {
                router.push("/login");
              }
              // kalau sudah login, ke address
              else {
                router.push("/address");
              }
            }}
          >
            Unggah Resep
          </Button>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
}

export default HomePrescriptionCard;
