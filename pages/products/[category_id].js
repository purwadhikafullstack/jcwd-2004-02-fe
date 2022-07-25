import Head from "next/head";
import UserProductSidebar from "../../components/UserProductSidebar";
import UserProductMainPage from "../../components/UserProductMainPage";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers";
import debounce from "lodash.debounce";
import { Router, useRouter } from "next/router";
import MetaDecorator from "../../components/MetaDecorator";
import healthymedlogo from "../../public/healthymed-logo.svg";

export default function UserProduct() {
  const route = useRouter();
  let { category_id } = route.query;
  category_id = parseInt(category_id);

  const [component, setComponent] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    search: "",
    category: category_id,
    symptom: [],
    type: [],
    brand: [],
    min_price: "",
    max_price: "",
    order: "",
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
      `${API_URL}/products/fetchuserproduct?page=${page}&category=${input.category}&symptom=${input.symptom}&type=${input.type}&brand=${input.brand}&search=${input.search}&order=${input.order}
      `
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
    console.log(category_id);
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
      <div>
        <MetaDecorator
          title={`${categorySelected} / Healthymed`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div>
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
              input={input}
              setInput={setInput}
              handleInput={handleInput}
              handleCheckbox={handleCheckbox}
              isLoading={isLoading}
            />
            <UserProductMainPage
              categorySelected={categorySelected}
              data={data}
              input={input}
              handleInput={handleInput}
              totalData={totalData}
              isLoading={isLoading}
              pageChangeHandler={setPage}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
