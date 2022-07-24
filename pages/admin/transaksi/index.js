import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { FiDownload } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { Checkbox } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../components/AdminTransactionPagination";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Cookies from "js-cookie";
import AdminTransactionCard from "../../../components/AdminTransactionCard";
import AdminPrescriptionTransactionCard from "../../../components/AdminPrescriptionTransactionCard";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import healthymedlogo from "../../../public/healthymed-logo.svg";
import MetaDecorator from "../../../components/MetaDecorator";

function SemuaPesanan() {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [input, setInput] = useState({
    filter: "",
    sort: "",
    search: "",
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  let token = Cookies.get("token");
  const getAllTransaction = async (page, input, startDate, endDate, cb) => {
    try {
      let res = await axios.get(
        `${API_URL}/transaction/getalltransaction?page=${page}&filter=${
          input.filter
        }&sort=${input.sort}&search=${input.search}&from_date=${
          startDate ? dayjs(startDate).format("YYYY-MM-DD") : ""
        }&to_date=${endDate ? dayjs(endDate).format("YYYY-MM-DD") : ""}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      cb(res);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, startDate, endDate, cb) => {
      getAllTransaction(page, input, startDate, endDate, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    getAllTransaction();
  }, []);

  useEffect(() => {
    debouncedFetchData(page, input, startDate, endDate, (res) => {
      setTotalData(parseInt(res.headers["x-total-transaction"]));
      setData([...res.data]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [page, input, startDate, endDate, loadingStatus]);

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
      <>
        <div>
          <AdminNavbar />
          <AdminSidebar />
        </div>

        <div className="bg-admin px-[48px] pt-[32px] pb-[32px]">
          <div className="flex justify-between">
            <div className="text-lg font-bold text-violet-900 tracking-wide">
              Semua Pesanan
            </div>
            <div className="flex">
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
          <div className="mt-[68px] flex">
            <div className="flex">
              <div className="flex border-2 bg-white rounded-lg text-slate-400  border-slate-300 px-[12px] py-[11px] w-[328px] justify-between ">
                <input
                  className="text-sm font-medium outline-none w-[270px]"
                  placeholder="Cari nama obat"
                  name="search"
                  value={input.search}
                  onChange={(e) => handleInput(e)}
                ></input>
                <HiSearch className="text-xl" />
              </div>
              <div className="border-2 rounded-lg bg-white text-slate-400  border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
                <select
                  className="text-sm font-medium outline-none w-full"
                  placeholder="Filter"
                  name="filter"
                  value={input.filter}
                  onChange={(e) => handleInput(e)}
                >
                  <option value="">Semua Obat</option>
                  <option value="resep">Obat Resep</option>
                  <option value="bebas">Obat Bebas</option>
                </select>
              </div>
              <div className="border-2 rounded-lg bg-white text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
                <select
                  className="text-sm font-medium outline-none w-full"
                  placeholder="Urutkan"
                  name="sort"
                  value={input.sort}
                  onChange={(e) => handleInput(e)}
                >
                  <option value="">Terbaru</option>
                  <option value="terlama">Terlama</option>
                </select>
              </div>
              <div className="flex text-center items-center ml-[16px]">
                <DatePicker
                  className="w-[210px] border-2 rounded-lg bg-white text-slate-400 text-sm font-semibold  border-slate-300 px-[12px] py-[13px]"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  placeholderText="Pilih Tanggal"
                />
              </div>
            </div>
          </div>

          <div className="mt-[34px] flex items-center justify-between">
            <div>
              <Checkbox
                borderColor={"gray.300"}
                colorScheme="purple"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, e.target.checked])
                }
              >
                <p className="text-primary">Pilih Semua</p>
              </Checkbox>
            </div>
            <div>
              <Pagination
                totalData={totalData}
                dataPerPage={10}
                pageChangeHandler={setPage}
                totalPage={Math.ceil(totalData / 10)}
              />
            </div>
          </div>

          {/* CARD */}
          {data?.map((val, id) => {
            return (
              <div key={id}>
                <AdminTransactionCard
                  data={val}
                  isLoading={loadingStatus}
                  setIsLoading={setLoadingStatus}
                />
                <AdminPrescriptionTransactionCard
                  data={val}
                  isLoading={loadingStatus}
                  setIsLoading={setLoadingStatus}
                />
              </div>
            );
          })}
        </div>
      </>
    </>
  );
}

export default SemuaPesanan;
