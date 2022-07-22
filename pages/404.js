import { Image } from "@chakra-ui/react";
import Link from "next/link";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";

const NotFound = () => {
  return (
    <>
      <MetaDecorator
        title={`Page Not Found . Healthymed`}
        description={
          "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
        }
        imageUrl={healthymedlogo}
      />
      <div className="flex flex-col h-screen items-center justify-center bg-[#f7f7f7]">
        <Image src={"../notfound.jpeg"} />
        <Link href={"/"}>
          <p className="text-sm">
            Kembali ke{" "}
            <a className="text-primary font-semibold underline cursor-pointer">
              Home
            </a>
          </p>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
