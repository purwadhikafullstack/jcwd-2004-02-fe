import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/navbar";
import { API_URL } from "../../../helpers";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPlus,
  HiMinus,
} from "react-icons/hi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoShareSocial } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import HomePopularProductCarousel from "../../../components/HomePopularProductCarousel";

function ProductDetail() {
  const route = useRouter();
  let { product_id } = route.query;
  product_id = parseInt(product_id);

  const [data, setData] = useState({});
  const [description, setDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getProductDetail = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/products/getdetailproduct/${product_id}`
      );
      setData(res.data[0]);
      descriptionToState(res.data[0].description);
      console.log(description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  function descriptionToState(val) {
    let descriptions = Object.entries(val);
    setDescription(descriptions);
  }

  // react-slick configuration
  function NextArrow({ onClick }) {
    return (
      <div
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute bottom-[60px] -right-5"
        onClick={onClick}
      >
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute bottom-[60px] -left-5"
        onClick={onClick}
      >
        <HiOutlineChevronLeft className="text-3xl text-primary" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="w-100">
        <ul className="list-unstyled flex-row justify-content-center align-items-center mb-4">
          {dots}
        </ul>
      </div>
    ),
  };

  const increase = () => {
    let count = parseInt(quantity) + 1;
    count = count >= data.total_stock ? data.total_stock : count;
    setQuantity(count);
  };

  const decrease = () => {
    let count = parseInt(quantity) - 1;
    count = count < 1 ? 1 : count;
    setQuantity(count);
  };

  const handleChange = (e) => {
    if (e.target.value >= data.total_stock) {
      setQuantity(data.total_stock);
    } else {
      setQuantity(e.target.value);
    }
  };
  return (
    <>
      <Navbar />

      <div className="user-container">
        {/* Breadcrumb */}
        <div className="mb-[38px]">
          <span className="text-secondary">Beranda / Kategori / Obat</span>
        </div>

        {/* Product detail*/}
        <div className="flex">
          <div>
            {/* Image Carousel */}
            <div
              className="lg:w-[405px] lg:h-[300px] border-2 border-slate-50 
            rounded-lg shadow-lg shadow-slate-200"
            >
              <div className="lg:w-[223px] lg:h-[239px] mx-auto mt-[25px]">
                <Slider {...settings} className="">
                  {data.images?.map((val, i) => {
                    return (
                      <div
                        key={i}
                        className="lg:w-[223px] lg:h-[239px] overflow-hidden relative"
                      >
                        <Image
                          src={`${API_URL}${val.image}`}
                          layout="fill"
                          objectFit="cover"
                        ></Image>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            {/* Button */}
            <div className="flex mt-[24px]">
              <div
                className="flex justify-between text-center items-center lg:w-[145px] lg:h-[46px]
               text-xs tracking-wide font-medium bg-secondary rounded-full text-white px-[24px]"
              >
                <BsFillChatDotsFill className="text-xl" />
                <span>Chat Admin</span>
              </div>
              <div
                className="flex justify-between text-center items-center lg:w-[145px] lg:h-[46px]
               text-xs tracking-wide font-medium bg-secondary rounded-full text-white px-[35px] ml-[10px]"
              >
                <IoShareSocial className="text-xl" />
                <span>Bagikan</span>
              </div>
            </div>
          </div>

          {/* Other information */}
          <div className="ml-[122px] w-full">
            <div className="text-sm font-bold text-primary">
              {data.brand_name}
            </div>
            <div className="text-2xl text-primary mt-[5px]">{data.name}</div>
            <div className="text-primary items-center flex mt-[20px]">
              <span className="text-2xl font-bold mr-[12px]">
                Rp.{data.hargaJual}
              </span>
              <span className="text-sm">/ {data.unit}</span>
            </div>
            <div className="flex items-center tracking-wide mb-[24px] lg:h-[24px] mt-[11px] text-sm">
              <div className="pr-2 line-through decoration-1 decoration-slate-400 text-slate-400">
                Rp. 65.000
              </div>
              <div className="border-2 border-orange-300 text-orange-300 rounded-md px-1 font-semibold">
                17%
              </div>
            </div>
            <div className="flex items-center mb-[44px]">
              <div className="grid grid-cols-3 text-center items-center text-secondary h-[38px] w-[164px] bg-slate-200 rounded-lg">
                <div className="text-xl mx-auto" onClick={decrease}>
                  <HiMinus />
                </div>
                <input
                  type="number"
                  min={"0"}
                  max={data.total_stock}
                  value={quantity}
                  className="bg-slate-200 font-semibold text-center outline-none"
                  onChange={(e) => handleChange(e)}
                ></input>
                <div className="text-xl mx-auto" onClick={increase}>
                  <HiPlus />
                </div>
              </div>
              <div className="text-sm text-slate-400 ml-[12px]">
                Sisa {data.total_stock} {data.unit}
              </div>
            </div>
            <div className="flex justify-between w-[427px]">
              <div className="flex items-center w-[194px] h-[47px] border-2 border-secondary rounded-lg text-secondary ">
                <FaCartPlus className="text-xl ml-[40px]" />
                <span className="text-sm font-semibold ml-[20px]">
                  Keranjang
                </span>
              </div>
              <div className="flex items-center w-[153px] h-[47px] bg-secondary rounded-lg text-white">
                <span className="mx-auto">Beli</span>
              </div>
              <div className="flex items-center w-[48px] h-[47px] border-2 border-secondary rounded-lg text-secondary">
                <FiHeart className="text-xl mx-auto" />
              </div>
            </div>

            {/* Description */}
            <div className="mt-[76px] border-t-2"></div>
            <Tabs isFitted textColor={"brand.primary"}>
              <TabList height={"58px"}>
                <Tab
                  _selected={{
                    borderBottom: "4px solid",
                    borderBottomColor: "brand.primary",
                  }}
                >
                  Deskripsi
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "4px solid",
                    borderBottomColor: "brand.primary",
                  }}
                >
                  Cara Pakai
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "4px solid",
                    borderBottomColor: "brand.primary",
                  }}
                >
                  Peringatan
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {description.map((val, id) => {
                    return (
                      <div
                        key={id}
                        className={`grid grid-cols-2 py-[16px] ${
                          id < description.length - 1 ? "border-b-2" : null
                        }`}
                        // className="grid grid-cols-2 border-b-2 py-[16px]"
                      >
                        <div className="col-span-1 font-semibold">{val[0]}</div>
                        <div className="col-span-1">{val[1]}</div>
                      </div>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-2 py-[16px]">
                    <div className="col-span-1 font-semibold">
                      Cara Penggunaan
                    </div>
                    <div className="col-span-1">{data.usage}</div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-2 py-[16px]">
                    <div className="col-span-1 font-semibold">Peringatan</div>
                    <div className="col-span-1">{data.warning}</div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        <div className="border-b-2 mt-[50px]"></div>
        <div className="mt-[60px] text-2xl text-primary font-bold">
          Produk Terkait
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
