import Image from "next/image";
import HomeDiscountProductCarousel from "./HomeDiscountProductCarousel";
import { Link } from "@chakra-ui/react";

function HomeDiscount({ data }) {
  return (
    <div className="mt-[28px] lg:h-[395px] lg:w-[301px] relative">
      <div className="lg:h-[345px] lg:w-[260px] overflow-hidden absolute rounded-xl ">
        <Image src={"/home3.svg"} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="lg:h-[395px] lg:w-[840px] absolute top-[25px] left-[195px]">
        <HomeDiscountProductCarousel data={data} />
      </div>
    </div>
  );
}

export default HomeDiscount;
