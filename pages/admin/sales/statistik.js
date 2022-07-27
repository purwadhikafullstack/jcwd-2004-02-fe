import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helpers";
import { Select } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as Chartjs,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import healthymedlogo from "../../../public/healthymed-logo.svg";
import MetaDecorator from "../../../components/MetaDecorator";

Chart.register(CategoryScale, LineElement, LinearScale, PointElement);
function Report({ statistik, chart }) {
  // filter mingguan dan bulanan
  const [filter, setfilter] = useState({
    filterPendapatan: "monthly",
    filterPenjualan: "monthly",
    filterStatistik: "monthly",
  });

  const [statistikState, setstatistikState] = useState({});
  const [chartState, setchartState] = useState({});

  // looping mingguan penjualan obat
  const [dataPenjualanMonthly, setdataPenjualanMonthly] = useState([]);
  const [dataPenjualanWeekly, setdataPenjualanWeekly] = useState([]);

  // looping mingguan pendapatan obat
  const [dataPendapatanMonthly, setdataPendapatanMonthly] = useState([]);
  const [dataPendapatanWeekly, setdataPendapatanWeekly] = useState([]);

  // handlechange filter
  const handleChange = (e) => {
    setfilter({ ...filter, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getStatistik();
    getChart();
    getDataPenjualanMonthly();
    getDataPenjualanWeekly();
    getDataPendapatanMonthly();
    getDataPendapatanWeekly();
  }, [filter]);

  //  get pesanan baru, siap dikirim, dll
  const getStatistik = async () => {
    try {
      let res = await axios.get(`${API_URL}/report/summary?filter=weekly`);
      setstatistikState(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // get chart data
  const getChart = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/report/summary/chart?filter=weekly`
      );
      setchartState(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // looping data penjualan
  const getDataPenjualanMonthly = () => {
    let databulan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < chart?.penjualan.length; i++) {
      databulan[chart.penjualan[i].bulan - 1] = parseInt(
        chart.penjualan[i].jumlah
      );
    }
    setdataPenjualanMonthly(databulan);
  };

  const getDataPenjualanWeekly = () => {
    let dataminggu = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < chartState?.penjualan?.length; i++) {
      dataminggu[chartState.penjualan[i].hari] = parseInt(
        chartState.penjualan[i].jumlah
      );
    }
    setdataPenjualanWeekly(dataminggu);
  };

  // looping data pendapatan
  const getDataPendapatanMonthly = () => {
    let databulan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < chart?.pendapatan.length; i++) {
      databulan[chart.pendapatan[i].bulan - 1] = parseInt(
        chart.pendapatan[i].jumlah
      );
    }
    setdataPendapatanMonthly(databulan);
  };

  const getDataPendapatanWeekly = () => {
    let dataminggu = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < chartState?.pendapatan?.length; i++) {
      dataminggu[chartState.pendapatan[i].hari - 1] = parseInt(
        chartState.pendapatan[i].jumlah
      );
    }
    setdataPendapatanWeekly(dataminggu);
  };

  // data penjualan mingguan dan bulanan
  const dataPenjualanBulanan = {
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
        data: dataPenjualanMonthly,
        borderColor: ["rgba(107, 76, 146, 1)"],
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        hoverPointRadius: 0,
        tension: 0.5,
      },
    ],
  };
  const dataPenjualanMingguan = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],

    datasets: [
      {
        label: "Obat",
        data: dataPenjualanWeekly,
        borderColor: ["rgba(107, 76, 146, 1)"],
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        hoverPointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  // data pendapatan mingguan dan bulanan
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
        data: dataPendapatanMonthly,
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
    labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],

    datasets: [
      {
        label: "Obat",
        data: dataPendapatanWeekly,
        borderColor: ["rgba(107, 76, 146, 1)"],
        backgroundColor: "transparent",
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
          stepSize: 25,
          padding: 10,
        },
      },
    },
  };
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

      <div className="bg-admin px-[48px] pt-[32px] pb-[32px]">
        <div className="flex justify-between ">
          <div className="text-lg font-bold text-violet-900 tracking-wide">
            Ringkasan Statistik
          </div>
          <Select
            name="filterStatistik"
            defaultValue={"monthly"}
            size="xs"
            w={150}
            onChange={handleChange}
            bg="white"
          >
            <option value="Mingguan">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </Select>
        </div>

        {filter.filterStatistik == "monthly" ? (
          <div className="flex -ml-3 w-full">
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Pesanan Baru</div>
              {!statistik?.pesananBaru?.pesanan_baru ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistik?.pesananBaru?.pesanan_baru}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Siap Dikirim</div>
              {!statistik?.siapDikirim?.siap_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistik?.siapDikirim?.siap_dikirim}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Sedang Dikirim</div>
              {!statistik?.sedangDikirim?.sedang_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistik?.sedangDikirim?.sedang_dikirim}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Selesai</div>
              {!statistik?.selesai?.selesai ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistik?.selesai?.selesai}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Dibatalkan</div>
              {!statistik?.siapDikirim?.siap_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistik?.dibatalkan?.dibatalkan}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Chat Baru</div>
              <div className="statistik_ket_no">0</div>
            </div>
          </div>
        ) : (
          <div className="flex -ml-3 w-full">
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Pesanan Baru</div>
              {!statistikState?.pesananBaru?.pesanan_baru ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistikState?.pesananBaru?.pesanan_baru}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Siap Dikirim</div>
              {!statistikState?.siapDikirim?.siap_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistikState?.siapDikirim?.siap_dikirim}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Sedang Dikirim</div>
              {!statistikState?.sedangDikirim?.sedang_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistikState?.sedangDikirim?.sedang_dikirim}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Selesai</div>
              {!statistikState?.selesai?.selesai ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistikState?.selesai?.selesai}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Dibatalkan</div>
              {!statistikState?.siapDikirim?.siap_dikirim ? (
                <div className="statistik_ket_no"> 0</div>
              ) : (
                <div className="statistik_ket_no">
                  {statistikState?.dibatalkan?.dibatalkan}
                </div>
              )}
            </div>
            <div className="flex container_statistik_sm">
              <div className="statistik_ket text-primary">Chat Baru</div>
              <div className="statistik_ket_no">0</div>
            </div>
          </div>
        )}
        <div className="flex container_statistik_lg">
          <div className="flex justify-between pr-3">
            <div className="statistik_ket_md text-primary">Penjualan Obat</div>
            <Select
              name="filterPenjualan"
              defaultValue={"monthly"}
              size="xs"
              w={150}
              onChange={handleChange}
            >
              <option value="Mingguan">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </Select>
          </div>

          {filter.filterPenjualan == "monthly" ? (
            <div className="flex">
              <div className="w-4/5 h-4/6">
                <Line
                  height="50px"
                  options={options}
                  data={dataPenjualanBulanan}
                />
              </div>
              <div className="flex container_statistik_sm_2 w-1/5 ">
                <div className="statistik_ket text-primary">
                  Avg. Penjualan per Bulan
                </div>
                <div className="statistik_ket_no">{chart?.avgMonth}</div>
              </div>
            </div>
          ) : (
            <div className="w-10/12 h-4/6 flex justify-between">
              <Line
                height="50px"
                options={options}
                data={dataPenjualanMingguan}
              />
              <div>
                <div className=" container_statistik_sm">
                  <div className="statistik_ket text-primary">
                    Avg. Penjualan per Minggu
                  </div>
                  <div className="statistik_ket_no">{chartState?.avgWeek}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex container_statistik_lg ">
          <div className="flex justify-between pr-3">
            <div className="statistik_ket_md text-primary ">
              Tren Pendapatan
            </div>
            <Select
              defaultValue={"monthly"}
              size="xs"
              w={150}
              name={"filterPendapatan"}
              onChange={handleChange}
            >
              <option value="Mingguan">Mingguan</option>
              <option value="monthly">Bulanan</option>
              {/* <option value="Tahunan">Tahunan</option> */}
            </Select>
          </div>

          {filter.filterPendapatan == "monthly" ? (
            <div className="h-4/6 pr-4">
              <Line
                height="50px"
                options={options}
                data={dataPendapatanBulanan}
              />
            </div>
          ) : (
            <div className="h-4/6 pr-4">
              <Line
                height="50px"
                options={options}
                data={dataPendapatanMingguan}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Report;

export async function getServerSideProps(context) {
  const { req, res } = context;

  try {
    const res1 = axios.get(`${API_URL}/report/summary`);
    const res2 = axios.get(`${API_URL}/report/summary/chart`);

    const [statistik, chart] = await Promise.all([res1, res2]);
    return {
      props: {
        statistik: statistik.data,
        chart: chart.data,
      },
    };
  } catch {
    res.status = 404;
    return {
      props: {},
    };
  }
}
