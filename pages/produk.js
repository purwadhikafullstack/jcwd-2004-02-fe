import Head from "next/head";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";
import CardCart from "../components/CardCart";
import Footer from "../components/Footer";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import debounce from "lodash.debounce";
import CardLoader from "../components/CartLoader";

export default function UserProduct() {
  const [component, setComponent] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    search: "",
    category: 1,
    symptom: "",
    type: "",
    brand: "",
    min_price: 0,
    max_price: 0,
  });
  const [categorySelected, setCategorySelected] = useState("");

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  const fetchComponentObat = async () => {
    try {
      let res = await axios.get(`${API_URL}/products/component`);
      setComponent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDaftarProduk = async (page, input, cb) => {
    // token + headers
    // let res = await axios.get(
    //   `${API_URL}/products/fetchuserproduct?page=${page}&search=${input.search}&category=${input.category}
    //   &symptom=${input.symptom}&type=${input.type}&brand=${input.brand}&min_price=${input.min_price}&max_price=${input.max_price}`
    // );
    let res = await axios.get(
      `${API_URL}/products/fetchuserproduct?page=${page}&category=${input.category}`
    );
    cb(res);
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getDaftarProduk(page, input, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchComponentObat();
    categoryName();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    debouncedFetchData(page, input, (res) => {
      setTotalData(parseInt(res.headers["x-total-product"]));
      setData([...res.data]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
    console.log(totalData, "ini total data");
    categoryName();
  }, [page, input]);

  const categoryName = () => {
    component.category?.map((val) => {
      if (input.category === val.id) {
        setCategorySelected(val.name);
      }
    });
  };

  return (
    <>
      <Navbar />

      <div className="user-container">
        <div className="mb-[38px]">
          <span className="text-secondary">Beranda / Kategori</span> /{" "}
          {categorySelected}
        </div>
        <div className="flex">
          <UserProductSidebar
            component={component}
            category_id={input.category}
            handleInput={handleInput}
            isLoading={isLoading}
          />
          <div className=" w-[900px]">
            <div className="text-2xl font-bold text-primary pb-[16px] border-b-2">
              Obat
            </div>
            <div className="flex mt-[24px] justify-between items-center">
              <div className="text-slate-400">
                {totalData} Produk di Obat-obatan
              </div>
              <div className="flex items-center">
                <div className="text-slate-400">Urutkan</div>
                <div className="border-2 rounded-lg text-slate-400 border-slate-300 py-1 w-[137px] px-1 h-[36px] ml-[16px]">
                  <select
                    className="text-sm font-medium outline-none w-full"
                    placeholder="Terpopular"
                    name="category"
                  >
                    <option value="">Terpopular</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-[36px] grid grid-cols-4 gap-4">
              {isLoading ? (
                <>
                  <CardLoader />
                  <CardLoader />
                  <CardLoader />
                  <CardLoader />
                </>
              ) : (
                <>
                  {data.map((val, ind) => {
                    return (
                      <>
                        <CardCart
                          key={ind}
                          img={`${API_URL}${val.image}`}
                          name={val.name}
                          price={val.hargaJual}
                          unit={val.unit}
                        />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
