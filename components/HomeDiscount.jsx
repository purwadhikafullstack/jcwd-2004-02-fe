import Image from "next/image";
import HomeDiscountProductCarousel from "./HomeDiscountProductCarousel";

function HomeDiscount({ data }) {
  return (
    <div className="mt-[28px] lg:h-[395px] lg:w-[301px] relative">
      <div className="lg:h-[395px] lg:w-[301px] overflow-hidden absolute rounded-xl ">
        <Image src={"/home3.svg"} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="lg:h-[395px] lg:w-[1060px] absolute top-[25px] left-[211px]">
        <HomeDiscountProductCarousel data={data} />
      </div>
    </div>
  );
}

export default HomeDiscount;
