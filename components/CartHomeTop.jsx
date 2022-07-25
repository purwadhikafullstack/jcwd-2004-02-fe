import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { API_URL } from "../helpers";

function CardHomeTop({ img, name, price, unit }) {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div className="w-[121px] h-[253px] lg:px-[15px] lg:w-[153px] lg:h-[280px] border-[1px] border-slate-100 rounded-xl shadow-md relative bg-white">
      <div className="absolute top-2 right-2 lg:top-2 lg:right-2 z-10 border-[1px] bg-white border-slate-100 text-slate-300 text-sm lg:text-lg p-1 lg:p-2 rounded-full shadow-lg">
        <FaHeart />
      </div>
      <div className="w-[105px] h-[191px] mx-[auto] mt-[12px] lg:w-[124px] lg:h-[222px] lg:mt-[20px]">
        <div className="lg:h-[113px] h-[76px] bg-slate-200 overflow-hidden relative">
          <Image src={img} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="h-[34px] lg:h-[30px] mt-2 text-xs lg:text-sm font-bold text-purple-800 truncate">
          {name}
        </div>
        <div className="flex items-center tracking-wide h-[21px] mb-[4px] lg:h-[24px] lg:mb-[7px] mt-[8px] text-xs">
          <div className="border-2 border-orange-300 text-orange-300 rounded-md px-1 font-semibold">
            17%
          </div>
          <div className="text-xs pl-2 line-through decoration-1 decoration-slate-600 text-slate-500">
            {rupiah(65000)}
          </div>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 lg:grid-cols-3 text-xs text-purple-800">
          <div className="col-span-2 font-bold">{rupiah(price)}</div>
          <div className="text-xs lg:text-xs font-semibold lg:text-right">
            /{unit}
          </div>
        </div>
      </div>
      <div className="border-2 rounded-md border-purple-800 w-[105px] h-[32px] mx-auto mb-[14px] lg:w-[120px] lg:h-[25px] lg:mt-[2px] text-center py-[2px] text-purple-800 text-xs font-semibold hover:bg-hover-button">
        Keranjang
      </div>
    </div>
  );
}

export default CardHomeTop;
