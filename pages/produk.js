import Head from "next/head";
import UserProductSidebar from "../components/UserProductSidebar";
import UserProductMainPage from "../components/UserProductMainPage";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import debounce from "lodash.debounce";

export default function UserProduct() {
  const [component, setComponent] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    search: "",
    category: 1,
    symptom: [],
    type: [],
    brand: [],
    min_price: 0,
    max_price: 0,
  });
  const [categorySelected, setCategorySelected] = useState("");

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  const handleCheckbox = (e, prop) => {
    let tempArr = input[prop];
    if (e.target.checked) {
      tempArr.push(parseInt(e.target.value));
    } else {
      tempArr = tempArr.filter((id) => id !== parseInt(e.target.value));
      // let ind = tempArr.findIndex(val)
    }
    console.log(tempArr);
    setInput({ ...input, [prop]: tempArr });
    console.log(input);
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
      `${API_URL}/products/fetchuserproduct?page=${page}&category=${input.category}&symptom=${input.symptom}&type=${input.type}&brand=${input.brand}`
    );
    cb(res);
  };

  const getSelectedCategory = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/products/getusercategoryselected/${input.category}`
      );
      setCategorySelected(res.data[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getDaftarProduk(page, input, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchComponentObat();
    getSelectedCategory();
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
    getSelectedCategory();
  }, [page, input]);

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
            handleCheckbox={handleCheckbox}
            isLoading={isLoading}
          />
          <UserProductMainPage
            categorySelected={categorySelected}
            data={data}
            totalData={totalData}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
