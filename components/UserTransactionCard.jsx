import dayjs from "dayjs";
import Image from "next/image";
import { BsFillChatDotsFill } from "react-icons/bs";
import { API_URL } from "../helpers";

function UserTransactionCard({ data }) {
  const { status, prescription, updated_at, products, subtotal, expired_at } =
    data;

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      {status == "menunggu konfirmasi" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-orange-300 
                      text-orange-300 bg-warning text-xs flex items-center px-[14px]"
            >
              Menunggu Konfirmasi
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${prescription[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p>Nomor Resep</p>
                <p className="text-base mt-[2px]">
                  {prescription[0].prescription_number}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex">
                <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                  24
                </div>
                <div className="text-xl font-bold text-red-400 mx-[11.6px]">
                  :
                </div>
                <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                  45
                </div>
                <div className="text-xl font-bold text-red-400 mx-[11.6px]">
                  :
                </div>
                <div className="w-[31px] h-[32px] text-white bg-red-400 font-semibold rounded-lg text-center py-[3px]">
                  45
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-2 mt-[2px]" />
          <div className="flex text-secondary items-center mt-[14px]">
            <BsFillChatDotsFill className="text-xl" />
            <p className="ml-[14px] text-xs font-semibold">
              Chat Customer Service
            </p>
          </div>
        </div>
      ) : null}

      {status == "menunggu pembayaran" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-orange-300 
                      text-orange-300 bg-warning text-xs flex items-center px-[10px]"
            >
              Menunggu Pembayaran
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${products[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p className="text-base">{products[0].name}</p>
                <p className=" mt-[2px]">
                  {products[0].quantity} {products[0].unit}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex font-bold">{rupiah(products[0].price)}</div>
            </div>
          </div>
          <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
            <div>Sub Total</div>
            <div className="font-bold">{rupiah(subtotal)}</div>
          </div>
          <div className="border-b-2 mt-[2px] " />
          <div className="flex justify-between mt-[14px]">
            <div className="flex text-secondary items-center ">
              <BsFillChatDotsFill className="text-xl" />
              <p className="ml-[14px] text-xs font-semibold">
                Chat Customer Service
              </p>
            </div>
            <div className="flex items-center ">
              <div className="text-xs mr-[16px] text-right">
                <p>Bayar Sebelum</p>
                <p>{new Date(expired_at).toUTCString()}</p>
              </div>
              <div
                className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center py-[4px]"
              >
                Bayar Sekarang
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {status == "dikirim" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[22px]"
            >
              Sedang Pengiriman
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${products[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p className="text-base">{products[0].name}</p>
                <p className=" mt-[2px]">
                  {products[0].quantity} {products[0].unit}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex font-bold">{rupiah(products[0].price)}</div>
            </div>
          </div>
          <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
            <div>Sub Total</div>
            <div className="font-bold">{rupiah(subtotal)}</div>
          </div>
          <div className="border-b-2 mt-[2px] " />
          <div className="flex justify-between mt-[14px]">
            <div className="flex text-secondary items-center ">
              <BsFillChatDotsFill className="text-xl" />
              <p className="ml-[14px] text-xs font-semibold">
                Chat Customer Service
              </p>
            </div>
            <div className="flex items-center ">
              <div className="text-xs mr-[16px] text-right">
                <p>Konfirmasi Terima Sebelum</p>
                <p>6 April 2022, 15:45</p>
              </div>
              <div
                className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center py-[4px]"
              >
                Pesanan Diterima
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {status == "diproses" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[28px]"
            >
              Pesanan Diproses
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${products[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p className="text-base">{products[0].name}</p>
                <p className=" mt-[2px]">
                  {products[0].quantity} {products[0].unit}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex font-bold">{rupiah(products[0].price)}</div>
            </div>
          </div>
          <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
            <div>Sub Total</div>
            <div className="font-bold">{rupiah(subtotal)}</div>
          </div>
          <div className="border-b-2 mt-[2px] " />
          <div className="flex justify-between mt-[14px]">
            <div className="flex text-secondary items-center ">
              <BsFillChatDotsFill className="text-xl" />
              <p className="ml-[14px] text-xs font-semibold">
                Chat Customer Service
              </p>
            </div>
            <div className="flex items-center ">
              <div
                className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center py-[4px]"
              >
                Beli Lagi
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {status == "selesai" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-green-500 
                      text-green-500 bg-green-200 text-xs flex items-center px-[28px]"
            >
              Pesanan Diterima
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${products[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p className="text-base">{products[0].name}</p>
                <p className=" mt-[2px]">
                  {products[0].quantity} {products[0].unit}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex font-bold">{rupiah(products[0].price)}</div>
            </div>
          </div>
          <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
            <div>Sub Total</div>
            <div className="font-bold">{rupiah(subtotal)}</div>
          </div>
          <div className="border-b-2 mt-[2px] " />
          <div className="flex justify-between mt-[14px]">
            <div className="flex text-secondary items-center ">
              <BsFillChatDotsFill className="text-xl" />
              <p className="ml-[14px] text-xs font-semibold">
                Chat Customer Service
              </p>
            </div>
            <div className="flex items-center ">
              <div
                className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center py-[4px]"
              >
                Beli Lagi
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {status == "dibatalkan" ? (
        <div className="mb-[36px] border-2 px-[40px] py-[28px] rounded-lg shadow-md border-slate-100 shadow-slate-200">
          <div className="flex justify-between items-center text-xs font-semibold">
            <div>{new Date(updated_at).toUTCString()}</div>
            <div
              className="w-[156px] h-[26px] rounded-sm border-2 border-red-400 
                      text-red-400 bg-red-200 text-xs flex items-center px-[22px]"
            >
              Pesanan Dibatalkan
            </div>
          </div>
          <div className="border-b-2 mt-[12px]" />
          <div className="flex py-[12px] ">
            <div className="w-[91px] h-[80px] bg-slate-200 rounded-lg overflow-hidden relative">
              <Image
                src={`${API_URL}/${products[0].image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex ml-[17px] justify-between w-full">
              <div className="text-xs font-medium">
                <p className="text-base">{products[0].name}</p>
                <p className=" mt-[2px]">
                  {products[0].quantity} {products[0].unit}
                </p>
                <div className="mt-[22px] text-secondary">Tampilkan Detail</div>
              </div>
              <div className="flex font-bold">{rupiah(products[0].price)}</div>
            </div>
          </div>
          <div className="flex justify-between py-[13px] border-t-2 text-lg ml-[100px]">
            <div>Sub Total</div>
            <div className="font-bold">{rupiah(subtotal)}</div>
          </div>
          <div className="border-b-2 mt-[2px] " />
          <div className="flex justify-between mt-[14px]">
            <div className="flex text-secondary items-center ">
              <BsFillChatDotsFill className="text-xl" />
              <p className="ml-[14px] text-xs font-semibold">
                Chat Customer Service
              </p>
            </div>
            <div className="flex items-center ">
              <div
                className="w-[157px] h-[30px] text-white text-sm font-medium
                        bg-secondary rounded-lg text-center py-[4px]"
              >
                Beli Lagi
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserTransactionCard;
