import Image from "next/image";
import HomeDiscountProductCarousel from "./HomeDiscountProductCarousel";
import { Link } from "@chakra-ui/react";

function HomeDiscount({ data }) {
  return (
    <div className="mt-[28px] lg:h-[395px] lg:w-[301px] relative">
      <div className="hidden lg:inline-block lg:h-[345px] lg:w-[260px] overflow-hidden relative rounded-xl ">
        <Image src={"/home3.svg"} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="h-[269px] lg:hidden overflow-hidden relative">
        <Image
          src={"/discount-mobile-banner.svg"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="w-[230px] h-[253px] lg:h-[395px] lg:w-[840px] absolute top-[2px] left-[150px] lg:top-[25px] lg:left-[195px]">
        <HomeDiscountProductCarousel data={data} />
      </div>
    </div>
  );
}

export default HomeDiscount;
