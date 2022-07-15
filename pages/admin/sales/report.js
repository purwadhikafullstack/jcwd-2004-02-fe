import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Cookies from "js-cookie";
import Rupiah from "../../../helpers/convertToRupiah";

function Report() {
  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>

      <div className="bg-admin px-[48px] pt-[32px] pb-[32px] ">
        <div className="flex justify-between ">
          <div className="text-lg font-bold text-violet-900 tracking-wide">
            Semua Pesanan
          </div>
          <div className="flex ">
            <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500">
              <FiDownload className="text-sm" />
              <div className="text-xs font-semibold px-2">Unduh PDF</div>
            </div>
            <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500 ml-5">
              <IoDocumentText className="text-sm" />
              <div className="text-xs font-semibold px-2">Excel</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex">
          <div className="flex">
            <div className="border-2 rounded-lg bg-white text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ">
              <select
                className="text-sm font-medium outline-none w-full"
                placeholder="Filter"
                name="filter"
                // value={input.category}
                // onChange={(e) => handleInput(e)}
              >
                <option value="">Filter</option>
              </select>
            </div>
            <div className="border-2 rounded-lg bg-white text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
              <select
                className="text-sm font-medium outline-none w-full"
                placeholder="Urutkan"
                name="sort"
                // value={input.category}
                // onChange={(e) => handleInput(e)}
              >
                <option value="">Urutkan</option>
              </select>
            </div>
          </div>
        </div>
        <div className="h-[1150px] p-[32px] mt-[24px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center pt-5 ">
            <div className="font-bold text-2xl">Laporan Laba & Rugi</div>
            <div className="mt-3 text-xs">Periode Bulan Januari Tahun 2022</div>
            <div className="text-xs">
              Terbit: Minggu 13 Februari, 2022 pukul 18.14 (GMT)
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">
              <div>Penjualan</div>
              <div>Dalam Rupiah</div>
            </div>
            <div className="flex labarugi3 ">
              <div>1. penjualan barang</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Total Service</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Total Embalanse</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Ongkos Kirim</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Diskon penjualan</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>6. Retur Penjualan</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Penjualan Bersih</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Harga Pokok Penjualan</div>
            <div className="flex labarugi3 ">
              <div>1. Persediaan Awal</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Pembelian Kotor</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Retur Pembelian Kotor</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Mutasi barang Masuk</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Mutasi barang Keluar</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>6. Persediaan Akhir</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Harga Pokok Penjualan</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Laba Kotor</div>
            <div className="flex labarugi3 ">
              <div>1. Penjualan Bersih</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Harga Kotor Penjualan</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Laba Kotor</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Pengeluaran Operasional</div>
            <div className="flex labarugi3 ">
              <div>1. Gaji Karyawan</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Listrik</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Air</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Telepon</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Internet</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>6. Sewa Tempat</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>7. Peralatan Kantor</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>8. Biaya Pengadaan</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>9. Biaya Operasioan Lainnya</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Pengeluaran Operasional</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Pendapatan Lainnya</div>
            <div className="flex labarugi3 ">
              <div>1. Cashback Pembelian</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Keuntungan Konsinyasi</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Pendapatan Lainnya</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Laba Bersih</div>
            <div className="flex labarugi3 ">
              <div>1. Laba Kotor</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Pengeluaran Operasional</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Pendapatan Lainnya</div>
              <div>{Rupiah(18000)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Laba Bersih</div>
              <div>{Rupiah(18000)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
