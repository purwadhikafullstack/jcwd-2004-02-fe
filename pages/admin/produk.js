import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";
import NewTable from "../../components/Table";
import { useEffect, useMemo, useState, useTransition } from "react";
import axios from "axios";
import { API_URL } from "../../helpers";
import Pagination from "../../components/Pagination";
import { flushSync } from "react-dom";

//  USE DEBOUNCE

function DaftarProduk() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    search: "",
    category: "",
  });
  const [value, setLimit] = useState(10);
  const [comp, setComponent] = useState([]);

  const [pending, startTransition] = useTransition();

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
  };

  const getComponent = async () => {
    let res2 = await axios.get(`${API_URL}/adminproduk/component`);
    setComponent([...res2.data]);

    // console.log(comp, "inicom");
  };

  const getDaftarProduk = async (page, input) => {
    let res = await axios.get(
      `${API_URL}/adminproduk/fetchdaftarproduk?page=${page}&search=${input.search}&category=${input.category}`
    );
    setTotalData(parseInt(res.headers["x-total-product"]));
    setData([...res.data]);
    setIsLoading(false);
    // console.log(res.data);
    // console.log(res.headers["x-total-product"]);
    // console.log(res.headers);
  };

  useEffect(() => {
    getComponent();
  }, []);

  useEffect(() => {
    getDaftarProduk(page, input);
    console.log(totalData);
  }, [page, input]);

  const Categories = ({ val }) => {
    return (
      <>
        {val.map((category, i) => {
          return (
            <>
              <span
                key={i}
                className="bg-violet-300 font-semibold capitalize py-1 px-2 mr-1 text-sm rounded-xl"
              >
                {category.name}
              </span>
            </>
          );
        })}
      </>
    );
  };

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "id",
      isNumeric: true,
    },
    {
      Header: "Nama Obat",
      accessor: "name",
    },
    {
      Header: "No Obat",
      accessor: "med_number",
    },
    {
      Header: "No BPOM",
      accessor: "bpom_number",
    },
    {
      Header: "Kategori",
      accessor: "categories",
      Cell: ({ cell: { value } }) => <Categories val={value} />,
    },
    {
      Header: "Stok",
      accessor: "total_stock",
      isNumeric: true,
    },
    {
      Header: "Satuan",
      accessor: "unit",
    },
    {
      Header: "Nilai Barang",
      accessor: "buy_price",
    },
    {
      Header: "Nilai Jual",
      accessor: "sell_price",
    },
    {
      Header: "Atur",
    },
  ]);

  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      <div className="bg-admin">
        <div className="px-[48px] pt-[32px] pb-[32px]">
          <div className="flex justify-between">
            <div className="text-lg font-bold text-violet-900 tracking-wide">
              Daftar Obat
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
          <div className="p-[32px] mt-[34px] bg-white rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex border-2 rounded-lg text-slate-400  border-slate-300 px-[12px] py-[11px] w-[328px] justify-between ">
                  <input
                    className="text-sm font-medium outline-none w-[270px]"
                    placeholder="Cari nama obat"
                    name="search"
                    value={input.search}
                    onChange={(e) => handleInput(e)}
                  ></input>
                  <HiSearch className="text-xl" />
                </div>
                <div className="border-2 rounded-lg text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
                  <select
                    className="text-sm font-medium outline-none w-full"
                    placeholder="Filter"
                    name="category"
                    value={input.category}
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="">All</option>
                    {comp.map(({ id, name }) => {
                      return (
                        <>
                          <option value={id}>{name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-violet-900 p-[11px] text-white">
                <FiDownload className="text-sm" />
                <div className="text-xs font-semibold px-2 tracking-wide">
                  Tambah Obat
                </div>
              </div>
            </div>
            <div className="w-full border-b-2 mt-[38px]"></div>
            <div className="mt-[32px] rounded-lg border-2">
              <NewTable columns={columns} data={data} isLoading={isLoading} />

              <Pagination
                totalData={totalData}
                dataPerPage={10} // ganti value
                pageChangeHandler={setPage}
                updateLimit={updateLimit}
                value={value}
                totalPage={Math.ceil(totalData / 10)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DaftarProduk;
