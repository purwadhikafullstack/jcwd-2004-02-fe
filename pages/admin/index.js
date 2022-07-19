import { useEffect, useState, useRef } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { API_URL } from "../../helpers";
import Rupiah from "../../helpers/convertToRupiah";
import { Select } from "@chakra-ui/react";
import { Line, Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as Chartjs,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import Chart from "chart.js/auto";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
Chart.register(CategoryScale, LineElement, LinearScale, PointElement);

function AdminHome({ data, penjualan, profit }) {
  const [menu, setMenu] = useState(0);
  const [penjualan2, setPenjualan] = useState([]);
  const [profit2, setProfit] = useState([]);
  const [dataBulanan, setDataBulanan] = useState([]);
  const [dataMingguan, setDataMingguan] = useState([]);
  const [profitBulanan, setprofitBulanan] = useState([]);
  const [profitMingguan, setprofitMingguan] = useState([]);

  const [input, setInput] = useState({
    filterProfit: "monthly",
    filterPenjualan: "monthly",
  });
  // insert data penjualan per bulan
  const dataperbulan = () => {
    let databulan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < penjualan.length; i++) {
      databulan[penjualan[i].bulan - 1] = parseInt(penjualan[i].jumlah);
    }
    setDataBulanan(databulan);
    console.log("ini data bula", databulan);
  };
  // insert data penjualan perminggu
  const dataPerMinggu = () => {
    let dataMinggu = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < penjualan2.length; i++) {
      dataMinggu[penjualan2[i].hari - 1] = parseInt(penjualan2[i].jumlah);
    }
    setDataMingguan(dataMinggu);
  };
  // insert data profit per bulan
  const profitperbulan = () => {
    let profitbulan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < profit.length; i++) {
      profitbulan[profit[i].bulan - 1] = parseInt(profit[i].profit);
    }
    setprofitBulanan(profitbulan);
  };
  // insert data penjualan perminggu
  const profitperminggu = () => {
    let profitMinggu = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < profit2.length; i++) {
      profitMinggu[profit2[i].hari - 1] = parseInt(profit2[i].profit);
    }
    setprofitMingguan(profitMinggu);
  };
  // get data penjualan perminggu
  const getDataPendapatan = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/report/penjualanobat?filter=weekly`
      );
      setPenjualan(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      dataPerMinggu();
    }
  };
  // get data profit perminggu
  const getDataProfit = async () => {
    try {
      let res = await axios.get(`${API_URL}/report/profit?filter=weekly`);
      setProfit(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      profitperminggu();
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  console.log("ini data penjualan", penjualan);

  useEffect(() => {
    // getDataPenjualan();
    dataperbulan();
    profitperbulan();
  }, []);

  useEffect(() => {
    getDataPendapatan();
    getDataProfit();
    dataPerMinggu();
    profitperminggu();
    console.log(dataMingguan);
  }, [input]);

  const dataProfitBulanan = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],

    datasets: [
      {
        label: "Obat",
        data: profitBulanan,
        borderColor: "blue",
        backgroundColor: "rgba(0, 95, 175, 1),rgba(33, 205, 192, 0.6)",
        borderWidth: 0,
        pointRadius: 1,
        hoverPointRadius: 0,
        tension: 10,
        borderRadius: 80,
      },
    ],
  };
  const dataProfitMingguan = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],

    datasets: [
      {
        label: "Obat",
        data: profitMingguan,
        borderColor: "blue",
        backgroundColor: ["rgba(0, 95, 175, 1),rgba(33, 205, 192, 0.6)"],
        borderWidth: 0,
        pointRadius: 0,
        hoverPointRadius: 0,
        tension: 0.5,
        borderRadius: 100,
      },
    ],
  };

  const dataPendapatanBulanan = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],

    datasets: [
      {
        label: "Obat",
        data: dataBulanan,
        borderColor: ["rgba(107, 76, 146, 1)"],
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        hoverPointRadius: 0,
        tension: 0.5,
      },
    ],
  };
  const dataPendapatanMingguan = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],

    datasets: [
      {
        label: "Obat",
        data: dataMingguan,
        borderColor: ["rgba(107, 76, 146, 1)"],
        backgroundColor: "blue",
        borderWidth: 2,
        pointRadius: 0,
        hoverPointRadius: 0,
        tension: 0.5,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          stepSize: 250,
          padding: 10,
        },
      },
    },
  };

  const value = 0.66;
  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      <div className="bg-admin p-5">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-slate-700">
            Analisis Produk & Toko
          </span>
          <span className="text-xs">Update Terakhir: 20 Juli 2022</span>
        </div>
        <div className="flex justify-between my-5">
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs text-purple-900 font-bold">
              Profit Hari Ini
            </span>
            <div className="flex justify-between">
              <span className="font-bold text-2xl text-purple-900">
                {Rupiah(data.profit[0].profit) || "ganyampe bos"}
              </span>
              <div style={{ width: 50, height: 50 }} className="font-bold">
                <CircularProgressbar value={value} text={`${value * 100}%`} />
              </div>
            </div>
            <span className="text-[10px] font-bold">+ 2.500.000</span>
          </div>
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs text-purple-900 font-bold">
              Total Pemesanan Hari Ini
            </span>
            <div className="flex justify-between">
              <span className="font-bold text-2xl text-purple-900">
                {data.pesananHariIni[0]?.pesanan_hari_ini}
              </span>
              <div style={{ width: 50, height: 50 }} className="font-bold">
                <CircularProgressbar value={value} text={`${value * 100}%`} />
              </div>
            </div>
            <span className="text-[10px] font-bold">+ 2.500.000</span>
          </div>
          <div className="w-[310px] h-[110px] rounded-lg bg-white flex flex-col px-3 py-3">
            <span className="text-xs text-purple-900 font-bold">
              Sisa Stok Hari Ini
            </span>
            <div className="flex justify-between">
              <span className="font-bold text-2xl text-purple-900">
                {data.sisaStock[0]?.sisa_stock}
              </span>
              <div style={{ width: 50, height: 50 }} className="font-bold">
                <CircularProgressbar value={value} text={`${value * 100}%`} />
              </div>
            </div>
            <span className="text-[10px] font-bold">+ 2.500.000</span>
          </div>
        </div>
        <div className="flex mt-9">
          <div className="w-[475px] mr-2">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-700">
                Penting Hari Ini
              </span>
              <span className="text-xs">
                Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan
                pelanggan
              </span>
            </div>
            <div className="flex justify-between my-3">
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Pesananan Baru
                </span>
                <span className="font-bold text-2xl text-purple-900">
                  {data.pesananBaru[0]?.pesanan_baru}
                </span>
              </div>
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Siap Dikirim
                </span>
                <span className="font-bold text-2xl text-purple-900">
                  {data.siapDikirim[0]?.siap_dikirim}
                </span>
              </div>
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Sedang Dikirim
                </span>
                <span className="font-bold text-2xl text-purple-900">
                  {data.sedangDikrim[0]?.sedang_dikirim}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Selesai
                </span>
                <span className="font-bold text-2xl text-purple-900">
                  {data.selesai[0]?.selesai}
                </span>
              </div>
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Dibatalkan
                </span>
                <span className="font-bold text-2xl text-purple-900">
                  {data.dibatalkan[0]?.dibatalkan}
                </span>
              </div>
              <div className="w-[150px] h-[80px] rounded-lg bg-white flex flex-col px-5 py-3">
                <span className="text-xs font-semibold text-purple-900">
                  Chat Baru
                </span>
                <span className="font-bold text-2xl text-purple-900">10</span>
              </div>
            </div>
          </div>
          <div className="w-[420px] ml-3">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-700">
                Kadaluwarsa Hari Ini
              </span>
              <span className="text-xs">
                Cek tanggal Kadaluwarsa untuk mengorganisir stok obat
              </span>
            </div>
            <div className="h-[170px] w-[300px] bg-white rounded-lg my-3 px-3 py-7">
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">
                  Telah Kadaluwarsa
                </span>
                <span className="font-bold text-orange-700">
                  {data.telahExpired[0]?.telah_expired}
                </span>
              </div>
              <div className="flex justify-between my-4">
                <span className="font-bold text-purple-900">
                  kadaluwarsa Bulan Ini
                </span>
                <span className="font-bold text-blue-500">
                  {data.expiredThisMonth[0]?.thismonth_expired}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">
                  kadaluwarsa 3 Bulan Kedepan
                </span>
                <span className="font-bold text-purple-900">
                  {data.expired3Month[0]?.latermonth_expired}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-5">
          <div className="w-[475px] h-[350px] bg-white rounded-lg">
            <div className="flex justify-between px-[10px] pt-[35px] mb-[60px]">
              <div className="flex flex-col">
                <span>Profit</span>
                <span className="text-xs">Data dinyatakan dalam rupiah</span>
              </div>
              <Select
                // placeholder="Select option"
                name="filterProfit"
                defaultValue={"monthly"}
                size="xs"
                w={150}
                onChange={handleChange}
              >
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </Select>
            </div>
            {input.filterProfit == "monthly" ? (
              <Bar height="125px" options={options} data={dataProfitBulanan} />
            ) : (
              <Bar height="125px" options={options} data={dataProfitMingguan} />
            )}
          </div>
          <div className="w-[475px] h-[350px] bg-white rounded-lg">
            <div className="flex justify-between px-[10px] pt-[35px] mb-[75px]">
              <span>Penjualan Obat</span>
              <Select
                // placeholder="Select option"
                name="filterPenjualan"
                defaultValue={"monthly"}
                size="xs"
                w={150}
                onChange={handleChange}
              >
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </Select>
            </div>
            {input.filterPenjualan == "monthly" ? (
              <Line
                height="125px"
                options={options}
                data={dataPendapatanBulanan}
              />
            ) : (
              <Line
                height="125px"
                options={options}
                data={dataPendapatanMingguan}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;

export async function getServerSideProps(context) {
  const { req, res } = context;

  try {
    const res1 = axios.get(`${API_URL}/report/salesreport`);

    let res2 = axios.get(`${API_URL}/report/penjualanobat`);

    let res3 = axios.get(`${API_URL}/report/profit`);

    const [data, penjualan, profit] = await Promise.all([res1, res2, res3]);
    return {
      props: {
        data: data.data,
        penjualan: penjualan.data,
        profit: profit.data,
      }, // will be passed to the page component as props
    };
  } catch {
    res.status = 404;
    return {
      props: {},
    };
  }
}
