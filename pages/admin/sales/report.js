import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Cookies from "js-cookie";
import Rupiah from "../../../helpers/convertToRupiah";
import { Select } from "@chakra-ui/react";

function Report() {
  const [filter, setfilter] = useState({
    filter: "monthly",
    bulan: new Date().getMonth() + 1,
    tahun: new Date().getFullYear(),
  });
  console.log(profitloss, "pnl");
  console.log(filter.tahun, "tahun");
  console.log(filter.bulan, "bulan");
  const [profitloss, setprofitloss] = useState([]);

  useEffect(() => {
    getProfitloss();
    console.log(filter, "filter");
  }, [filter]);

  //  get pesanan baru, siap dikirim, dll
  const getProfitloss = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/report/report?filter=${filter.filter}&tahun=${filter.tahun}&bulan=${filter.bulan}`
      );
      setprofitloss(res.data);
      console.log("masuk", profitloss);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const handleChange = (e) => {
    setfilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>

      <div className="bg-admin px-[48px] pt-[32px] pb-[32px] ">
        <div className="text-lg font-bold text-violet-900 tracking-wide">
          Semua Pesanan
        </div>
        <div className="flex text-sm text-primary mt-3">
          <div>
            <div className="font-semibold mb-1"> Periode</div>
            <Select
              name="filter"
              defaultValue={"monthly"}
              size="xs"
              w={150}
              onChange={handleChange}
              bg="white"
            >
              <option value="yearly">Tahunan</option>
              <option value="monthly">Bulanan</option>
            </Select>
          </div>
          <div className="ml-5">
            <div className="font-semibold mb-1"> Bulan</div>
            <Select
              name="bulan"
              defaultValue={filter.bulan}
              size="xs"
              w={150}
              onChange={handleChange}
              bg="white"
            >
              <option value={1}>Januari</option>
              <option value={2}>Februari</option>
              <option value={3}>Maret</option>
              <option value={4}>April</option>
              <option value={5}>Mei</option>
              <option value={6}>Juni</option>
              <option value={7}>Juli</option>
              <option value={8}>Agustus</option>
              <option value={9}>September</option>
              <option value={10}>Oktober</option>
              <option value={11}>November</option>
              <option value={12}>Desember</option>
            </Select>
          </div>
          <div className="ml-5">
            <div className="font-semibold mb-1"> Tahun</div>
            <Select
              name="tahun"
              defaultValue={filter.tahun}
              size="xs"
              w={150}
              onChange={handleChange}
              bg="white"
            >
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              {/* <option value="Tahunan">Tahunan</option> */}
            </Select>
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
              <div>1. Penjualan barang</div>
              {/* {!profitloss.penjualanBarang[0]?.sum ? (
                Rupiah(0)
              ) : (
                <div>{Rupiah(profitloss.penjualanBarang[0]?.sum)}</div>
              )} */}
            </div>
            <div className="flex labarugi3 ">
              <div>2. Total Service</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Total Embalanse</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Ongkos Kirim</div>
              <div>{Rupiah(1)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Diskon penjualan</div>
              <div>{Rupiah(0)} </div>
            </div>
            <div className="flex labarugi3 ">
              <div>6. Retur Penjualan</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Penjualan Bersih</div>
              <div>{Rupiah(0)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Harga Pokok Penjualan</div>
            <div className="flex labarugi3 ">
              <div>1. Persediaan Awal</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Pembelian Kotor</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Retur Pembelian Kotor</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Mutasi barang Masuk</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Mutasi barang Keluar</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>6. Persediaan Akhir</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Harga Pokok Penjualan</div>
              <div>{Rupiah(0)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Laba Kotor</div>
            <div className="flex labarugi3 ">
              <div>1. Penjualan Bersih</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Harga Kotor Penjualan</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Laba Kotor</div>
              <div>{Rupiah(0)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Pengeluaran Operasional</div>
            <div className="flex labarugi3 ">
              <div>1. Gaji Karyawan</div>
              <div>{Rupiah(2000000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Listrik</div>
              <div>{Rupiah(500000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Air</div>
              <div>{Rupiah(200000)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>4. Telepon</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>5. Internet</div>
              <div>{Rupiah(500000)}</div>
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
              <div>{Rupiah(0)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Pendapatan Lainnya</div>
            <div className="flex labarugi3 ">
              <div>1. Cashback Pembelian</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Keuntungan Konsinyasi</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Pendapatan Lainnya</div>
              <div>{Rupiah(0)}</div>
            </div>
          </div>
          {/* menu */}
          <div className="labarugi">
            <div className="flex labarugi2">Laba Bersih</div>
            <div className="flex labarugi3 ">
              <div>1. Laba Kotor</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>2. Pengeluaran Operasional</div>
              <div>{Rupiah(0)}</div>
            </div>
            <div className="flex labarugi3 ">
              <div>3. Pendapatan Lainnya</div>
              <div>{Rupiah(0)}</div>
            </div>
            <hr className="mt-3" />
            <div className="flex labarugi3 font-bold mt-1">
              <div>Laba Bersih</div>
              <div>{Rupiah(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
