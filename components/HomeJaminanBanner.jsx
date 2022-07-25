import Image from "next/image";

function HomeJaminanBanner() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 justify-between">
      <div className="lg:w-[320px] lg:h-[161px] px-[20px] bg-hover-button rounded-lg shadow-lg">
        <div className="w-[290px] h-[93px] flex justify-between mx-auto mt-[34px]">
          <div className="w-[70px] h-[85px] overflow-hidden relative">
            <Image src={"/jaminan1.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[200px] text-primary">
            <div className="text-lg font-bold">100% Obat Asli</div>
            <div className="text-xs font-medium mt-[8px]">
              Semua produk yang kami jual dijamin asli & kualitas terbaik untuk
              anda.
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[320px] lg:h-[161px] mt-[16px] lg:mt-0 bg-hover-button rounded-lg shadow-lg">
        <div className="w-[290px] h-[93px] flex justify-between mx-auto mt-[34px]">
          <div className="w-[61px] h-[85px] overflow-hidden relative">
            <Image src={"/jaminan2.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[203px] text-primary">
            <div className="text-lg font-bold">Dijamin Hemat</div>
            <div className="text-xs font-medium mt-[8px]">
              Kami menjamin akan mengembalikan uang dari selisih perbedaan
              harga.
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[320px] lg:h-[161px] mt-[16px] lg:mt-0 bg-hover-button rounded-lg shadow-lg">
        <div className="w-[290px] h-[93px] flex justify-between mx-auto mt-[34px]">
          <div className="w-[90px] h-[50px] overflow-hidden relative mt-[19px] ">
            <Image src={"/jaminan3.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[180px] text-primary">
            <div className="text-lg font-bold">Gratis Ongkir</div>
            <div className="text-xs font-medium mt-[8px]">
              Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos
              kirim!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeJaminanBanner;
