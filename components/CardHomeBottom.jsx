import { FaHeart } from "react-icons/fa";
import Image from "next/image";

function CardHomeBottom({ img, name, price, unit }) {
  return (
    <div className="w-[140px] h-[245px] lg:w-[195px] lg:h-[331px] border-2 border-slate-100 rounded-xl shadow-md relative bg-white">
      <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-10 border-2 bg-white border-slate-100 text-slate-300 text-sm lg:text-lg p-1 lg:p-2 rounded-full shadow-lg">
        <FaHeart />
      </div>
      <div className="w-[116px] h-[173px] mx-[auto] mt-[12px] lg:w-[154px] lg:h-[243px] lg:mt-[20px]">
        <div className="lg:h-[143px] h-[76px] bg-slate-200 overflow-hidden relative">
          <Image src={img} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="h-[34px] lg:h-[40px] text-xs lg:text-sm font-bold text-primary">
          {name}
        </div>
        <div className="flex items-center tracking-wide h-[21px] mb-[4px] lg:h-[24px] lg:mb-[7px] mt-[8px] text-xs">
          <div className="border-2 border-orange-300 text-orange-300 rounded-md px-1 font-semibold">
            17%
          </div>
          <div className="pl-2 line-through decoration-1 decoration-slate-600 text-slate-500">
            Rp. 65.000
          </div>
        </div>
        <div className="flex justify-between text-sm items-center text-primary">
          <div className="font-bold">Rp. {price}</div>
          <div className="text-xs lg:text-sm font-semibold">/ {unit}</div>
        </div>
      </div>
      <div className="border-2 rounded-md border-pritext-primary w-[116px] h-[32px] mx-auto mt-[12px] lg:w-[154px] lg:h-[30px] lg:mt-[18px] text-center py-1 text-primary text-xs font-semibold">
        Keranjang
      </div>
    </div>
  );
}

export default CardHomeBottom;
