import Image from "next/image";

function HomeJaminanBanner() {
  return (
    <div className="grid grid-cols-3">
      <div className="lg:w-[405px] lg:h-[181px] bg-hover-button rounded-lg shadow-lg">
        <div className="w-[314px] h-[93px] flex justify-between mx-auto mt-[44px]">
          <div className="w-[75px] h-[92px] overflow-hidden relative">
            <Image src={"/jaminan1.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[203px] text-primary">
            <div className="text-xl font-bold">100% Obat Asli</div>
            <div className="text-sm font-medium mt-[8px]">
              Semua produk yang kami jual dijamin asli & kualitas terbaik untuk
              anda.
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[405px] lg:h-[181px] bg-hover-button rounded-lg shadow-lg">
        <div className="w-[314px] h-[93px] flex justify-between mx-auto mt-[44px]">
          <div className="w-[66px] h-[95px] overflow-hidden relative">
            <Image src={"/jaminan2.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[203px] text-primary">
            <div className="text-xl font-bold">Dijamin Hemat</div>
            <div className="text-sm font-medium mt-[8px]">
              Kami menjamin akan mengembalikan uang dari selisih perbedaan
              harga.
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[405px] lg:h-[181px] bg-hover-button rounded-lg shadow-lg">
        <div className="w-[333px] h-[93px] flex justify-between mx-auto mt-[44px]">
          <div className="w-[101px] h-[56px] overflow-hidden relative mt-[19px] ">
            <Image src={"/jaminan3.svg"} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[203px] text-primary">
            <div className="text-xl font-bold">Gratis Ongkir</div>
            <div className="text-sm font-medium mt-[8px]">
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
