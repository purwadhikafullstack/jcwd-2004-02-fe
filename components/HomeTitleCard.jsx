import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";

function HomeTitleCard() {
  return (
    <div>
      <div className="hidden lg:inline-block w-full h-[188px] overflow-hidden relative rounded-xl">
        {/* <div className="relative bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[80px] -left-[10px]">
          <HiOutlineChevronLeft className="text-3xl text-primary" />
        </div> */}
        <Image src={"/home1.svg"} layout="fill" objectFit="cover"></Image>
        {/* <div className="relative bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[200px] right-[109px]">
          <HiOutlineChevronRight className="text-3xl text-primary" />
        </div> */}
      </div>

      <div className="lg:hidden w-[327px] h-[124px] border-[1px] border-slate-50 shadow-slate-100 shadow-sm overflow-hidden relative rounded-xl">
        <Image
          src={"/home-mobile-banner.svg"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
    </div>
  );
}

export default HomeTitleCard;
