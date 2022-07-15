import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Cookies from "js-cookie";
import { Select } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
function Report() {
  const data = {
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
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Obat",
        data: [55, 23, 96, 84, 67, 34, 55, 78, 34, 32, 11, 46],
        // you can set indiviual colors for each bar
        borderColor: ["rgba(107, 76, 146, 1)"],
        borderWidth: 2,
        pointRadius: 0,
        hoverPointRadius: 0,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    ],
  };
  const options = {
    scales: {
      xAxes: [
        {
          ticks: { beginAtZero: true },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>

      <div className="bg-admin px-[48px] pt-[32px] pb-[32px]  ">
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
        <div className="flex -ml-3 w-[1112px]">
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Pesanan Baru</div>
            <div className="statistik_ket_no">7</div>
          </div>
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Siap Dikirim</div>
            <div className="statistik_ket_no">7</div>
          </div>
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Sedang Dikirim</div>
            <div className="statistik_ket_no">7</div>
          </div>
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Selesai</div>
            <div className="statistik_ket_no">7</div>
          </div>
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Dibatalkan</div>
            <div className="statistik_ket_no">7</div>
          </div>
          <div className="flex container_statistik_sm">
            <div className="statistik_ket text-primary">Chat Baru</div>
            <div className="statistik_ket_no">7</div>
          </div>
        </div>
        <div className="flex container_statistik_lg">
          <div className="flex justify-between pr-3">
            <div className="statistik_ket text-primary">Penjualan Obat</div>
            <Select placeholder="Select option" size="xs" w={150}></Select>
          </div>
          <div>
            <div className="w-[700px]  bg-pink-100">
              <Line
                height="50px"
                //   width={"1000px"}
                options={options}
                data={data}
              />{" "}
            </div>
          </div>
        </div>
        <div className="-ml-3 w-[1112px]">
          <div className="flex justify-between">
            <div className="flex container_statistik_md ml-3">
              <div className="flex justify-between pr-3">
                <div className="statistik_ket text-primary ">
                  Tren Pendapatan
                </div>
                <Select placeholder="Select option" size="xs" w={150}></Select>
              </div>
              <div>grapiknya</div>
            </div>
            <div className="flex container_statistik_md ml-3">
              <div className="flex justify-between pr-3">
                <div className="statistik_ket text-primary ">
                  Tren Pembatalan
                </div>
                <Select placeholder="Select option" size="xs" w={150}></Select>
              </div>
              <div>grapiknya</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
