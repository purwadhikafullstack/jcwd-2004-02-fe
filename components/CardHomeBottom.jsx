import { FaHeart } from "react-icons/fa";
import Image from "next/image";

function CardHomeBottom({ img, name, price, unit }) {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div className="w-[140px] h-[245px] lg:w-[153px] lg:h-[280px] lg:px-[15px] border-2 border-slate-100 rounded-xl shadow-md relative bg-white hover:no-underline no-underline">
      <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-10 border-[1px] bg-white border-slate-100 text-slate-300 text-sm lg:text-lg p-1 lg:p-2 rounded-full shadow-lg">
        <FaHeart />
      </div>
      <div className="w-[116px] h-[173px] mx-[auto] mt-[12px] g:w-[124px] lg:h-[222px] lg:mt-[20px]">
        <div className="lg:h-[113px] h-[76px] bg-slate-200 overflow-hidden relative">
          <Image
            src={img || "/bisolvon.jpg"}
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className="h-[60px] mb-2 mt-2 lg:h-[60px] lg:mb-4 text-xs lg:text-sm font-bold text-primary text-ellipsis overflow-hidden">
          {name}
        </div>

        <div className="flex justify-between text-sm items-center text-primary">
          <div className="font-bold">{rupiah(price)}</div>
          <div className="text-xs font-semibold">/{unit}</div>
        </div>
      </div>
      <div className="border-2 rounded-md border-primary w-[116px] h-[32px] mx-auto mt-[12px] lg:w-[120px] lg:h-[25px] lg:mt-[2px] text-center py-[2px] text-primary text-xs font-semibold hover:bg-hover-button">
        Keranjang
      </div>
    </div>
  );
}

export default CardHomeBottom;
