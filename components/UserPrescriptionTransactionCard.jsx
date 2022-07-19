import dayjs from "dayjs";
import Image from "next/image";
import { BsFillChatDotsFill } from "react-icons/bs";
import { API_URL } from "../helpers";
import Link from "next/link";
import { useEffect, useState } from "react";

function UserTransactionPrescriptionCard({ data }) {
  const {
    id,
    status,
    prescription_number,
    transaction_number,
    pr_image,
    updated_at,
    products,
    subtotal,
    expired_at,
    created_at,
    recipient,
    address,
    courier,
    pr_status,
    payment,
  } = data;

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let time = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => clearInterval(time);
  }, []);

  const countdown = (time, type) => {
    let expired = new Date(expired_at).getTime();
    let now = new Date(time).getTime();
    let detik = Math.round((expired - now) / 1000);
    if (detik < 0) {
      return 0;
    }

    let jam = Math.floor(detik / 3600);
    detik = detik % 3600;
    if (type === "jam") {
      return jam;
    }

    let menit = Math.floor(detik / 60);
    detik = detik % 60;
    if (type === "menit") {
      return menit;
    }

    return detik;
  };

  return (
    <>
      {prescription_number ? (
        <>
          <Link href={`/userprofile/transaction_detail/${id}`}>
            <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
              <div className="flex justify-between items-center text-xs font-semibold">
                <div>{dayjs(created_at).format("DD MMMM YYYY hh:mm A")}</div>
                {status == "menunggu konfirmasi" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-orange-300 
                  text-orange-300 bg-warning text-xs flex items-center px-[14px]"
                  >
                    Menunggu Konfirmasi
                  </div>
                ) : null}
                {status == "menunggu pembayaran" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-orange-300 
                      text-orange-300 bg-warning text-xs flex items-center px-[10px]"
                  >
                    Menunggu Pembayaran
                  </div>
                ) : null}
                {status == "dikirim" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[22px]"
                  >
                    Sedang Pengiriman
                  </div>
                ) : null}
                {status == "diproses" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[28px]"
                  >
                    Pesanan Diproses
                  </div>
                ) : null}
                {status == "selesai" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[28px]"
                  >
                    Pesanan Diterima
                  </div>
                ) : null}
                {status == "dibatalkan" ? (
                  <div
                    className="w-[156px] h-[26px] rounded-sm border-2 border-red-400 
                      text-red-400 bg-red-200 text-xs flex items-center px-[22px]"
                  >
                    Pesanan Dibatalkan
                  </div>
                ) : null}
              </div>
              <div className="border-b-2 mt-[12px]" />
              <div className="flex py-[12px] ">
                <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
                  <Image
                    src={`${API_URL}/${pr_image}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex ml-[17px] justify-between w-full">
                  <div className="text-xs font-medium">
                    <p>Nomor Resep</p>
                    <p className="text-base mt-[2px]">{prescription_number}</p>
                    <div className="mt-[22px] text-secondary">
                      Tampilkan Detail
                    </div>
                  </div>
                  {!products.length ? (
                    <div className="flex">
                      <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                        {countdown(timer, "jam")}
                      </div>
                      <div className="text-xl font-bold text-red-400 mx-[11.6px]">
                        :
                      </div>
                      <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                        {countdown(timer, "menit")}
                      </div>
                      <div className="text-xl font-bold text-red-400 mx-[11.6px]">
                        :
                      </div>
                      <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                        {countdown(timer, "detik")}
                      </div>
                    </div>
                  ) : null}
                </div>
                {products.length ? (
                  <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
                    <div>Sub Total</div>
                    <div className="font-bold">{rupiah(subtotal)}</div>
                  </div>
                ) : null}
              </div>
              <div className="border-b-2 mt-[2px]" />
              <div className="flex justify-between mt-[14px]">
                <div className="flex text-secondary items-center ">
                  <BsFillChatDotsFill className="text-xl" />
                  <p className="ml-[14px] text-xs font-semibold">
                    Chat Customer Service
                  </p>
                </div>
                {status == "menunggu pembayaran" ? (
                  <div className="flex items-center ">
                    <div className="text-xs mr-[16px] text-right">
                      <p>Bayar Sebelum</p>
                      <p>
                        {dayjs(updated_at)
                          .add(2, "day")
                          .format("DD MMMM YYYY hh:mm A")}
                      </p>
                    </div>
                    <button
                      className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center"
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                ) : null}
                {status == "dikirim" ? (
                  <div className="flex items-center ">
                    <div className="text-xs mr-[16px] text-right">
                      <p>Konfirmasi Terima Sebelum</p>
                      <p>
                        {dayjs(updated_at)
                          .add(7, "day")
                          .format("DD MMMM YYYY hh:mm A")}
                      </p>
                    </div>
                    <button
                      className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center"
                    >
                      Pesanan Diterima
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        </>
      ) : null}
    </>
  );
}

export default UserTransactionPrescriptionCard;