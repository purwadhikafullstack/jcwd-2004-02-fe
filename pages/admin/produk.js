import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ModalInputAdmin from "../../components/admin/ModalInputAdmin";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { HiSearch, HiOutlineDotsVertical } from "react-icons/hi";
import NewTable from "../../components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers";
import Pagination from "../../components/Pagination";
import { flushSync } from "react-dom";
import debounce from "lodash.debounce";

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

  // const [pending, startTransition] = useTransition();

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
  };

  const getComponent = async () => {
    let res2 = await axios.get(`${API_URL}/products/getcategory`);
    setComponent([...res2.data]);
  };

  const getDaftarProduk = async (page, input, cb) => {
    // token + headers
    let res = await axios.get(
      `${API_URL}/products/fetchdaftarproduk?page=${page}&search=${input.search}&category=${input.category}`
    ); // FIXME Dipersingkat querynya (dibuat conditional)
    cb(res);
  };

  const getLastProduct = async () => {
    // token + headers
    let res = axios.get(`${API_URL}/products/getlastproduct`);
    console.log(res.headers);
    // setTotalData(parseInt(res.headers["x-total-product"]));
    setData([...data, ...res.data]);
  };

  const submitProduct = async (values) => {
    try {
      // let token = Cookies.get("token");
      await axios.post(`${API_URL}/products/addproduct`, values, {
        // headers: {
        //   // authorization: `Bearer ${token}`,
        // },
      });
    } catch (error) {
      console.log(error);
    } finally {
      getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getDaftarProduk(page, input, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    getComponent();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    debouncedFetchData(page, input, (res) => {
      setTotalData(parseInt(res.headers["x-total-product"]));
      setData([...res.data]);
      setIsLoading(false);
    });
    console.log(totalData, "ini total data");
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

  const DetailButton = ({ val }) => {
    return (
      <div className="flex justify-between text-center items-center">
        <div className="text-sm text-primary rounded-lg font-semibold py-1 px-2 border-[1px] mr-1 border-primary bg-white ">
          Lihat Detail {val}
        </div>
        <div className="text-sm text-primary rounded-md font-semibold py-2 px border-[1px] border-primary bg-white">
          <HiOutlineDotsVertical />
        </div>
      </div>
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
      accessor: "no_obat",
    },
    {
      Header: "No BPOM",
      accessor: "no_BPOM",
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
      accessor: "hargaBeli",
    },
    {
      Header: "Nilai Jual",
      accessor: "hargaJual",
    },
    {
      Header: "Atur",
      // accessor: "id",
      Cell: (data) => <DetailButton val={data.row.original.id} />,
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
              <ModalInputAdmin submitProduct={submitProduct} />
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
