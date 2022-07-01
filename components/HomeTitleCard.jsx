import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";

function HomeTitleCard() {
  return (
    <div>
      <div className="absolute bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[200px] left-[109px]">
        <HiOutlineChevronLeft className="text-3xl text-primary" />
      </div>
      <div className="lg:h-[226px] h-[76px] overflow-hidden relative rounded-xl">
        <Image src={"/home1.svg"} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="absolute bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[200px] right-[109px]">
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    </div>
  );
}

export default HomeTitleCard;
