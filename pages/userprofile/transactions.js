import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../components/UserTransactionPagianation";
import UserTransactionCard from "../../components/UserTransactionCard";
import UserProfileSidebar from "../../components/UserProfileSidebar";
import axios from "axios";
import { API_URL } from "../../helpers";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserTransactionPrescriptionCard from "../../components/UserPrescriptionTransactionCard";
import MetaDecorator from "../../components/MetaDecorator";
import healthymedlogo from "../../public/healthymed-logo.svg";
import useUser from "../../hooks/useUser";
import debounce from "lodash.debounce";

function UserTransaction() {
  const [input, setInput] = useState({
    order: "",
    filter: "",
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useUser();

  let token = Cookies.get("token");
  const getUserTransaction = async (page, input, startDate, endDate, cb) => {
    try {
      let res = await axios.get(
        `${API_URL}/transaction/getusertransaction?page=${page}&order=${
          input.order
        }&filter=${input.filter}&from_date=${
          startDate ? dayjs(startDate).format("YYYY-MM-DD HH:mm:ss") : ""
        }&to_date=${
          endDate ? dayjs(endDate).format("YYYY-MM-DD HH:mm:ss") : ""
        }`,
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
      getUserTransaction(page, input, startDate, endDate, cb);
    }, 1000),
    []
  );

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  useEffect(() => {
    getUserTransaction();
    console.log(input);
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
          title={`${name} / Transaksi`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <>
        <Navbar />

        <div className="mt-[130px] mb-[44px] mx-[64px] flex justify-between ">
          {/* User sidebar */}
          <UserProfileSidebar />

          {/* User main page */}
          <div className="w-[800px] px-[40px] py-[28px] rounded-lg border-[1px] border-slate-100 shadow-lg text-primary ">
            <div className="text-md font-bold">Daftar Pemesanan</div>
            <div className="pt-[10px]">
              <Tabs isFitted textColor={"brand.primary"}>
                <TabList height={"48px"}>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Semua
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Menunggu
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Diproses
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Dikirim
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Selesai
                  </Tab>
                  <Tab
                    _selected={{
                      borderBottom: "4px solid",
                      borderBottomColor: "brand.secondary",
                    }}
                  >
                    Dibatalkan
                  </Tab>
                </TabList>

                <div className="flex justify-between mt-[44px]">
                  <div className="font-bold flex items-center text-sm cursor-pointer">
                    <div className="mr-[12px]">Jenis Obat</div>
                    {!input.filter ? (
                      <div className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary text-white bg-secondary rounded-full">
                        Semua Obat
                      </div>
                    ) : (
                      <div
                        className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary text-secondary hover:bg-hover-button rounded-full"
                        onClick={() => setInput({ ...input, ["filter"]: "" })}
                      >
                        Semua Obat
                      </div>
                    )}

                    {input.filter == "resep" ? (
                      <div className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary  text-white bg-secondary rounded-full">
                        Obat Resep
                      </div>
                    ) : (
                      <div
                        className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary text-secondary hover:bg-hover-button rounded-full"
                        onClick={() =>
                          setInput({ ...input, ["filter"]: "resep" })
                        }
                      >
                        Obat Resep
                      </div>
                    )}

                    {input.filter == "bebas" ? (
                      <div className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary text-white bg-secondary rounded-full">
                        Obat Bebas
                      </div>
                    ) : (
                      <div
                        className="mr-[12px] w-[105px] h-[33px] text-center pt-[3px] font-semibold border-2 border-secondary text-secondary hover:bg-hover-button rounded-full"
                        onClick={() =>
                          setInput({ ...input, ["filter"]: "bebas" })
                        }
                      >
                        Obat Bebas
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="text-slate-400">Urutkan</div>
                    <div className="border-2 rounded-lg text-slate-400 border-slate-300 py-1 w-[137px] px-1 h-[36px] ml-[16px]">
                      <select
                        className="text-sm font-medium outline-none w-full"
                        placeholder="Urutkan"
                        name="order"
                        value={input.order}
                        onChange={(e) => handleInput(e)}
                      >
                        <option value="">Terbaru</option>
                        <option value="terlama">Terlama</option>
                      </select>
                    </div>
                  </div>
                </div>

                <TabPanels>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          <UserTransactionCard
                            data={val}
                            isLoading={loadingStatus}
                            setIsLoading={setLoadingStatus}
                          />
                          <UserTransactionPrescriptionCard
                            data={val}
                            isLoading={loadingStatus}
                            setIsLoading={setLoadingStatus}
                          />
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          {val.status == "menunggu pembayaran" ||
                          val.status == "menunggu konfirmasi" ? (
                            <>
                              <UserTransactionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                              <UserTransactionPrescriptionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          {val.status == "diproses" ? (
                            <>
                              <UserTransactionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                              <UserTransactionPrescriptionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          {val.status == "dikirim" ? (
                            <>
                              <UserTransactionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                              <UserTransactionPrescriptionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          {val.status == "selesai" ? (
                            <>
                              <UserTransactionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                              <UserTransactionPrescriptionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel px={0}>
                    {data.map((val, id) => {
                      return (
                        <div key={id}>
                          {val.status == "dibatalkan" ? (
                            <>
                              <UserTransactionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                              <UserTransactionPrescriptionCard
                                data={val}
                                isLoading={loadingStatus}
                                setIsLoading={setLoadingStatus}
                              />
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <div>
                <Pagination
                  totalData={totalData}
                  dataPerPage={10}
                  pageChangeHandler={setPage}
                  totalPage={Math.ceil(totalData / 10)}
                  startDate={startDate}
                  endDate={endDate}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    </>
  );
}

export default UserTransaction;
