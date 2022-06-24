import { FaHeart } from "react-icons/fa";
import Image from "next/image";

function CardCart() {
  return (
    <div className="w-[158px] h-[247px] lg:w-[213px] lg:h-[331px] border-[1px] border-slate-100 rounded-xl shadow-xl relative">
      <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-10 border-2 bg-white border-slate-100 text-slate-300 text-sm lg:text-lg p-1 lg:p-2 rounded-full shadow-lg">
        <FaHeart />
      </div>
      <div className="w-[134px] h-[173px] mx-[auto] mt-[12px] lg:w-[183px] lg:h-[243px] lg:mt-[20px]">
        <div className="lg:h-[143px] h-[86px] bg-slate-200 overflow-hidden relative">
          <Image src={"/image12.png"} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="h-[34px] lg:h-[40px] text-xs lg:text-sm font-bold text-purple-800">
          ACIFAR KRIM 5 GRAM
        </div>
        <div className="flex items-center tracking-wide h-[21px] mb-[4px] lg:h-[24px] lg:mb-[7px] mt-[8px] text-xs">
          <div className="border-2 border-orange-300 text-orange-300 rounded-md px-1 font-semibold">
            17%
          </div>
          <div className="pl-2 line-through decoration-1 decoration-slate-600 text-slate-500">
            Rp. 65.000
          </div>
        </div>
        <div className="flex justify-between text-sm items-center text-purple-800">
          <div className="font-bold">Rp. 5.300</div>
          <div className="text-xs lg:text-sm font-semibold">/ Pack</div>
        </div>
      </div>
      <div className="border-2 rounded-md border-purple-800 w-[134px] h-[32px] mx-auto mt-[12px] lg:w-[183px] lg:h-[30px] lg:mt-[18px] text-center py-1 text-purple-800 text-xs font-semibold">
        Keranjang
      </div>
    </div>
  );
}

export default CardCart;
