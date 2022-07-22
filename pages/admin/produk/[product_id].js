import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import NewTable from "../../../components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "../../../components/Pagination";
import { API_URL } from "../../../helpers";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { HiSearch, HiDotsVertical } from "react-icons/hi";
import dayjs from "dayjs";
import healthymedlogo from "../../../public/healthymed-logo.svg";
import MetaDecorator from "../../../components/MetaDecorator";

function AdminProductLog() {
  const route = useRouter();
  let { product_id } = route.query;
  product_id = parseInt(product_id);

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [name, setName] = useState("");

  const getDaftarLog = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/transaction/getproductlog/${product_id}`
      );
      setData([...res.data.data]);
      setTotalStock(res.data.total_stock);
      setTotalData(parseInt(res.headers["x-total-count"]));
      setName(res.data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    getDaftarLog();
  }, []);

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "no",
      isNumeric: true,
    },
    {
      Header: "Tanggal",
      accessor: "updated_at",
      Cell: ({ cell: { value } }) => {
        return <>{dayjs(value).format("DD MMMM YYYY")}</>;
      },
    },
    {
      Header: "Aktivitas",
      accessor: "activity",
      Cell: ({ cell: { value } }) => {
        return <>{capitalizeFirstLetter(value)}</>;
      },
    },
    {
      Header: "Pembeli",
      accessor: "recipient_name",
    },
    {
      Header: "Keluar",
      id: "keluar",
      accessor: "quantity",
      isNumeric: true,
      Cell: ({ cell: { value } }) => {
        if (value < 0) {
          return <div className="text-center">{value * -1}</div>;
        } else {
          return <div className="text-center">0</div>;
        }
      },
    },
    {
      Header: "Masuk",
      id: "masuk",
      accessor: "quantity",
      isNumeric: true,
      Cell: ({ cell: { value } }) => {
        if (value > 0) {
          return <div className="text-center">{value}</div>;
        } else {
          return <div className="text-center">0</div>;
        }
      },
    },
    {
      Header: "Sisa (per Tgl. Expired)",
      accessor: "stock_exp",
      isNumeric: true,
    },
    {
      Header: "Tgl. Kadaluwarsa",
      accessor: "expired",
      Cell: ({ cell: { value } }) => {
        return <>{dayjs(value).format("DD MMMM YYYY")}</>;
      },
    },
  ]);

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
        <div className="bg-admin">
          <div className="px-[48px] pt-[32px] pb-[32px]">
            <div className="flex justify-between">
              <div className="text-lg font-bold text-violet-900 tracking-wide">
                Detail Obat: {name}
              </div>
              <div className="flex">
                <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500 ml-5">
                  <IoDocumentText className="text-sm" />
                  <div className="text-xs font-semibold px-2">Excel</div>
                </div>
              </div>
            </div>
            <div className="p-[32px] mt-[34px] bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-end">
                <div className="flex">
                  <div>
                    <div className=" pb-[10px] font-semibold text-primary">
                      Bulan
                    </div>
                    <div className="border-2 rounded-lg text-slate-400 border-slate-300 px-[12px] py-[5px] w-[156px]">
                      <select
                        className="text-sm font-medium outline-none w-full"
                        placeholder="Bulan"
                        name="bulan"
                        // value={input.category}
                        // onChange={(e) => handleInput(e)}
                      >
                        <option value="">Juli</option>
                      </select>
                    </div>
                  </div>
                  <div className="ml-[10px]">
                    <div className=" pb-[10px] font-semibold text-primary">
                      Tahun
                    </div>
                    <div className="border-2 rounded-lg text-slate-400 border-slate-300 px-[12px] py-[5px] w-[156px]">
                      <select
                        className="text-sm font-medium outline-none w-full"
                        placeholder="Bulan"
                        name="bulan"
                        // value={input.category}
                        // onChange={(e) => handleInput(e)}
                      >
                        <option value="">2022</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="text-primary font-semibold text-lg pr-4">
                  Total Stock: <span>{totalStock}</span>
                </div>
              </div>
              <div className="w-full border-b-2 mt-[38px]"></div>
              <div className="mt-[32px] rounded-lg border-2">
                <NewTable columns={columns} data={data} isLoading={isLoading} />

                <Pagination
                  totalData={totalData}
                  dataPerPage={10} // ganti value
                  pageChangeHandler={setPage}
                  // updateLimit={updateLimit}
                  // value={value}
                  totalPage={Math.ceil(totalData / 10)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default AdminProductLog;

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
