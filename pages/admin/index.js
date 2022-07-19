import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import healthymedlogo from "../../public/healthymed-logo.svg";
import MetaDecorator from "../../components/MetaDecorator";

function AdminHome() {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div>
        <MetaDecorator
          title={"Admin / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      <div className="bg-admin">
      </div>
      <div className="bg-admin p-5"> 
        <div className="flex flex-col">
          <span className="font-bold text-lg text-slate-700">Analisis Produk & Toko</span> 
          <span className="text-xs">Update Terakhir: 20 Juli 2022</span>
        </div> 
        <div className="flex justify-between my-5">
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs">Profit Hari Ini</span> 
            <span className="font-bold text-2xl">RP.22.000.000</span> 
          </div> 
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs">Total Pemesanan Hari Ini</span> 
            <span className="font-bold text-2xl">220</span> 
          </div>
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs">Sisa Stok Hari Ini</span> 
            <span className="font-bold text-2xl">2200</span> 
          </div>
        </div> 
        <div className="flex mt-9">
          <div className="w-[475px] mr-2">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-700">Penting Hari Ini</span>
              <span className="text-xs">Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan</span>
            </div> 
            <div className="flex justify-between my-3">
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Pesananan Baru</span>
                <span className="font-bold text-2xl">10</span>
              </div>
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Siap Dikirim</span>
                <span className="font-bold text-2xl">10</span>
              </div>
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Sedang Dikirim</span>
                <span className="font-bold text-2xl">10</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Selesai</span>
                <span className="font-bold text-2xl">10</span>
              </div>
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Dibatalkan</span>
                <span className="font-bold text-2xl">10</span>
              </div>
              <div className="w-[140px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold">Chat Baru</span>
                <span className="font-bold text-2xl">10</span>
              </div>
            </div>
          </div>
          <div className="w-[420px] ml-3">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-700">Kadaluwarsa Hari Ini</span>
              <span className="text-xs">Cek tanggal Kadaluwarsa untuk mengorganisir stok obat</span>
            </div> 
            <div className="h-[170px] w-[300px] bg-white rounded-lg my-3 px-3 py-7">
              <div className="flex justify-between">
                <span className="font-bold">Telah Kadaluwarsa</span>
                <span className="font-bold">17</span>
              </div>
              <div className="flex justify-between my-4">
                <span className="font-bold">kadaluwarsa Bulan Ini</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">kadaluwarsa 3 Bulan Kedepan</span>
                <span className="font-bold">5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-5">
          <div className="w-[475px] h-[350px] bg-white rounded-lg"></div> 
          <div className="w-[475px] h-[350px] bg-white rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
