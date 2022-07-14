import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import { FiDownload } from "react-icons/fi";
import { HiSearch, HiDotsVertical } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../../components/AdminTransactionPagination";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../../../helpers";
import Cookies from "js-cookie";
import AdminTransactionCard from "../../../components/AdminTransactionCard";
import AdminPrescriptionTransactionCard from "../../../components/AdminPrescriptionTransactionCard";

function SemuaPesanan() {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    filter: "",
    sort: "",
    search: "",
  });

  let token = Cookies.get("token");
  const getAllTransaction = async () => {
    try {
      let res = await axios.get(`${API_URL}/transaction/getalltransaction`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData([...res.data]);
      setTotalData(parseInt(res.headers["x-total-transaction"]));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
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
                // value={input.search}
                // onChange={(e) => handleInput(e)}
              ></input>
              <HiSearch className="text-xl" />
            </div>
            <div className="border-2 rounded-lg bg-white text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
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
              totalData={10}
              dataPerPage={10}
              pageChangeHandler={setPage}
              totalPage={Math.ceil(10 / 24)}
            />
          </div>
        </div>

        {/* CARD HERE */}
        {data.map((val, id) => {
          return (
            <div key={id}>
              <AdminTransactionCard data={val} />
              <AdminPrescriptionTransactionCard data={val} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SemuaPesanan;
