import { FaHeart } from "react-icons/fa";
import Image from "next/image";

function CardCart({ img, name, price, unit }) {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <div className="w-[158px] h-[247px] lg:w-[172px] lg:h-[300px] border-[1px] border-slate-100 rounded-xl shadow-md relative cursor-pointer hover:-translate-y-2 hover:no-underline no-underline">
      <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-10 border-2 bg-white border-slate-100 text-slate-300 text-sm lg:text-lg p-1 lg:p-2 rounded-full shadow-lg">
        <FaHeart />
      </div>
      <div className="w-[134px] h-[173px] mx-[auto] mt-[12px] lg:w-[150px] lg:h-[230px] lg:mt-[20px]">
        <div className="lg:h-[123px] h-[86px] bg-slate-200 overflow-hidden relative">
          <Image src={img} layout="fill" objectFit="cover"></Image>
        </div>
        <div className="h-[34px] lg:h-[40px] text-xs lg:text-sm font-bold text-primary truncate">
          {name}
        </div>
        <div className="flex items-center tracking-wide h-[21px] mb-[4px] lg:h-[24px] lg:mb-[7px] mt-[8px] text-xs">
          <div className="border-2 border-orange-400 text-orange-400 rounded-md px-1 font-semibold">
            17%
          </div>
          <div className="pl-2 line-through decoration-1 decoration-slate-600 text-slate-500">
            {rupiah(65000)}
          </div>
        </div>
        <div className="flex justify-between text-sm items-center text-primary">
          <div className="font-bold">{rupiah(price)}</div>
          <div className="text-xs lg:text-sm font-semibold">/ {unit}</div>
        </div>
      </div>
      <div
        className="border-2 rounded-md border-secondary w-[134px] h-[32px] mx-auto mt-[12px] 
      lg:w-[130px] lg:h-[30px] lg:mt-[7px] text-center py-1 text-secondary text-xs font-semibold
      hover:bg-hover-button"
      >
        Keranjang
      </div>
    </div>
  );
}

export default CardCart;
