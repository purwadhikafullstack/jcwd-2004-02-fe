import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Rupiah from "../../../helpers/convertToRupiah";
import { Select } from "@chakra-ui/react";

function subtractMonths(numOfMonths, date = new Date()) {
  date.setMonth(date.getMonth() - numOfMonths);

  return date;
}

function Report() {
  const [filter, setfilter] = useState({
    filter: "monthly",
    bulan: subtractMonths(1).getMonth() + 1,
    tahun: subtractMonths(1).getFullYear(),
  });

  console.log(profitloss, "pnl");
  console.log(filter.tahun, "tahun");
  const [profitloss, setprofitloss] = useState([]);

  // mau nya adalah apabila month yang dipencet(profitloss.penjualan) lebih dari sama dengan current month(newdate), tampilannya "data tidak ada"

  const ayaya = () => {
    if (parseInt(filter.bulan) - 1 > subtractMonths(1).getMonth() + 1) {
      return console.log("berhasil");
    } else {
      return console.log("gagal");
    }
  };
  //
  console.log(profitloss.penjualanBarang?.bulan, " juli = 7");
  console.log(new Date().getMonth(), "getmont juli = 6");

  useEffect(() => {
    getProfitloss();
    ayaya();
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

  // Penjualan Barang
  const penjualanBersih = parseInt(profitloss?.penjualanBarang?.sum);

  // laba kotor
  const labaKotor = penjualanBersih - parseInt(profitloss?.hargaPokok?.sum);

  // Pengeluaran Operasional
  const gaji = 2000000;
  const listrik = 500000;
  const air = 200000;
  const telepon = 0;
  const internet = 500000;
  const sewa = 0;
  const peralatan = 0;
  const pengadaan = 0;
  const biayaOps = 0;

  const pengeluaranOperasional =
    gaji +
    listrik +
    air +
    telepon +
    internet +
    sewa +
    peralatan +
    pengadaan +
    biayaOps;

  const labaBersih = parseInt(labaKotor) - parseInt(pengeluaranOperasional);

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
              disabled={filter.filter == "yearly"}
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
            </Select>
          </div>
        </div>
        <div className="h-full p-[32px] mt-[24px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center pt-5 ">
            <div className="font-bold text-2xl">Laporan Laba & Rugi</div>
            <div className="mt-3 text-xs">Periode Bulan Tahun 2022</div>
            <div className="text-xs">Terbit:</div>
          </div>

          {parseInt(filter.bulan) > subtractMonths(1).getMonth() + 1 ||
          parseInt(filter.tahun) > subtractMonths(1).getFullYear() ? (
            <div className="flex items-center justify-center mt-10 text-2xl w-full text-primary font-bold">
              Laporan Tidak Tersedia
            </div>
          ) : (
            <div>
              {/* menu */}
              <div className="labarugi">
                <div className="flex labarugi2">
                  <div>Penjualan</div>
                  <div>Dalam Rupiah</div>
                </div>
                <div className="flex labarugi3 ">
                  <div>1. Penjualan barang</div>
                  {!profitloss?.penjualanBarang?.sum ? (
                    Rupiah(0)
                  ) : (
                    <div>{Rupiah(profitloss?.penjualanBarang?.sum)}</div>
                  )}
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
                  <div>{Rupiah(0)}</div>
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
                  <div>{Rupiah(penjualanBersih)}</div>
                </div>
              </div>
              {/* menu */}
              <div className="labarugi">
                <div className="flex labarugi2">Laba Kotor</div>
                <div className="flex labarugi3 ">
                  <div>1. Penjualan Bersih</div>
                  <div>{Rupiah(penjualanBersih)}</div>
                </div>
                <div className="flex labarugi3 ">
                  <div>2. Harga Beli Produk</div>
                  {!profitloss.penjualanBarang?.sum ? (
                    Rupiah(0)
                  ) : (
                    <div>{Rupiah(profitloss?.penjualanBarang?.sum)}</div>
                  )}
                </div>
                <hr className="mt-3" />
                <div className="flex labarugi3 font-bold mt-1">
                  <div>Laba Kotor</div>
                  <div>{Rupiah(labaKotor)}</div>
                </div>
              </div>
              {/* menu */}

              {filter.filter == "monthly" ? (
                <div className="labarugi">
                  <div className="flex labarugi2">Pengeluaran Operasional</div>
                  <div className="flex labarugi3 ">
                    <div>1. Gaji Karyawan</div>
                    <div>{Rupiah(gaji)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>2. Listrik</div>
                    <div>{Rupiah(listrik)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>3. Air</div>
                    <div>{Rupiah(air)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>4. Telepon</div>
                    <div>{Rupiah(telepon)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>5. Internet</div>
                    <div>{Rupiah(internet)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>6. Sewa Tempat</div>
                    <div>{Rupiah(sewa)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>7. Peralatan Kantor</div>
                    <div>{Rupiah(peralatan)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>8. Biaya Pengadaan</div>
                    <div>{Rupiah(pengadaan)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>9. Biaya Operasioan Lainnya</div>
                    <div>{Rupiah(biayaOps)}</div>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex labarugi3 font-bold mt-1">
                    <div>Pengeluaran Operasional</div>
                    <div>{Rupiah(pengeluaranOperasional)}</div>
                  </div>
                </div>
              ) : (
                <div className="labarugi">
                  <div className="flex labarugi2">Pengeluaran Operasional</div>
                  <div className="flex labarugi3 ">
                    <div>1. Gaji Karyawan</div>
                    <div>{Rupiah(gaji * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>2. Listrik</div>
                    <div>{Rupiah(listrik * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>3. Air</div>
                    <div>{Rupiah(air * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>4. Telepon</div>
                    <div>{Rupiah(telepon * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>5. Internet</div>
                    <div>{Rupiah(internet * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>6. Sewa Tempat</div>
                    <div>{Rupiah(sewa * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>7. Peralatan Kantor</div>
                    <div>{Rupiah(peralatan * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>8. Biaya Pengadaan</div>
                    <div>{Rupiah(pengadaan * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>9. Biaya Operasioan Lainnya</div>
                    <div>{Rupiah(biayaOps * 12)}</div>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex labarugi3 font-bold mt-1">
                    <div>Pengeluaran Operasional</div>
                    <div>{Rupiah(pengeluaranOperasional * 12)}</div>
                  </div>
                </div>
              )}

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
              {filter.filter == "monthly" ? (
                <div className="labarugi">
                  <div className="flex labarugi2">Laba Bersih</div>
                  <div className="flex labarugi3 ">
                    <div>1. Laba Kotor</div>
                    <div>{Rupiah(labaKotor)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>2. Pengeluaran Operasional</div>
                    <div>{Rupiah(pengeluaranOperasional)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>3. Pendapatan Lainnya</div>
                    <div>{Rupiah(0)}</div>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex labarugi3 font-bold mt-1">
                    <div>Laba Bersih</div>
                    <div>{Rupiah(labaBersih)}</div>
                  </div>
                </div>
              ) : (
                <div className="labarugi">
                  <div className="flex labarugi2">Laba Bersih</div>
                  <div className="flex labarugi3 ">
                    <div>1. Laba Kotor</div>
                    <div>{labaKotor}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>2. Pengeluaran Operasional</div>
                    <div>{Rupiah(pengeluaranOperasional * 12)}</div>
                  </div>
                  <div className="flex labarugi3 ">
                    <div>3. Pendapatan Lainnya</div>
                    <div>{Rupiah(0)}</div>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex labarugi3 font-bold mt-1">
                    <div>Laba Bersih</div>
                    <div>{Rupiah(labaKotor + pengeluaranOperasional * 12)}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Report;
