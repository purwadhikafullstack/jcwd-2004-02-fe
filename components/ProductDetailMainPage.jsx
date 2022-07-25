import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
// import { API_URL } from "../../../helpers";
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
import { API_URL } from "../helpers";

function ProductDetailMainPage({
  product,
  decrease,
  increase,
  onBuyClick,
  description,
  quantity,
  handleChange,
}) {
  const route = useRouter();

  // react-slick configuration
  function NextArrow({ onClick }) {
    return (
      <div
        className="p-1 rounded-full bg-white drop-shadow-md border-slate-50 border-[2px] text-2xl absolute bottom-[110px] -right-[70px]"
        onClick={onClick}
      >
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        className="p-1 rounded-full bg-white drop-shadow-md border-slate-50 border-[2px] text-2xl absolute bottom-[110px] -left-[70px]"
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

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center justify-center md:block">
          {/* Image Carousel */}
          <div
            className=" w-[405px] h-[300px] md:border-2 border-slate-50 
    rounded-md md:shadow-md md:shadow-slate-200"
          >
            <div className=" w-[223px] h-[239px] mx-auto mt-[25px]">
              <Slider {...settings}>
                {product.images?.map((val, i) => {
                  return (
                    <div
                      key={i}
                      className=" w-[223px] h-[239px] overflow-hidden relative"
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
          <div className="hidden md:flex mt-[24px]">
            <div
              className="flex justify-between text-center items-center w-full h-full md:w-[145px] md:h-[46px]
       text-xs tracking-wide font-medium bg-secondary rounded-full text-white px-[24px] cursor-pointer"
            >
              <BsFillChatDotsFill className="text-xl" />
              <span>Chat Admin</span>
            </div>
            <div
              className="flex justify-between text-center items-center w-full h-full md:w-[145px] md:h-[46px]
       text-xs tracking-wide font-medium bg-secondary rounded-full text-white px-[35px] ml-[10px] cursor-pointer"
            >
              <IoShareSocial className="text-xl" />
              <span>Bagikan</span>
            </div>
          </div>
        </div>

        {/* Other information */}
        <div className="md:ml-[122px] w-full px-4 md:px-0">
          <div className="text-sm font-bold text-primary">
            {product.brand_name}
          </div>
          <div className="text-2xl text-primary mt-[5px]">{product.name}</div>
          <div className="text-primary items-center flex mt-[20px]">
            <span className="text-2xl font-bold mr-[12px]">
              {rupiah(product.hargaJual)}
            </span>
            <span className="text-sm">/ {product.unit}</span>
          </div>
          <div className="flex items-center tracking-wide mb-[24px] md:h-[24px] mt-[11px] text-sm">
            <div className="pr-2 line-through decoration-1 decoration-slate-400 text-slate-400">
              {rupiah(65000)}
            </div>
            <div className="border-2 border-orange-300 text-orange-300 rounded-md px-1 font-semibold">
              17%
            </div>
          </div>
          <div className="flex items-center md:mb-[44px]">
            <div className="grid grid-cols-3 text-center items-center text-secondary h-[38px] w-[164px] bg-slate-200 rounded-md cursor-pointer">
              <div className="text-xl mx-auto" onClick={decrease}>
                <HiMinus />
              </div>
              <input
                type="number"
                min={"0"}
                max={product.total_stock}
                value={quantity}
                className="bg-slate-200 font-semibold text-center outline-none"
                onChange={(e) => handleChange(e)}
              ></input>
              <div className="text-xl mx-auto" onClick={increase}>
                <HiPlus />
              </div>
            </div>
            <div className="text-sm text-slate-400 ml-[12px]">
              Sisa {product.total_stock} {product.unit}
            </div>
          </div>
          <div className="hidden md:flex justify-between md:w-[427px] ">
            <div
              className="flex items-center w-[194px] h-[47px] border-2 border-secondary rounded-md text-secondary hover:bg-hover-button cursor-pointer"
              onClick={() => onBuyClick()}
            >
              <FaCartPlus className="text-xl ml-[40px]" />
              <span className="text-sm font-semibold ml-[20px]">Keranjang</span>
            </div>
            <div
              className="flex items-center w-[153px] h-[47px] bg-secondary rounded-md text-white cursor-pointer"
              onClick={() => {
                try {
                  onBuyClick();
                  route.push("/cart");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <span className="mx-auto">Beli</span>
            </div>
            <div className="flex items-center w-[48px] h-[47px] border-2 border-secondary rounded-md text-secondary">
              <FiHeart className="text-xl mx-auto" />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 md:mt-[76px] border-t-2"></div>

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
                  <div className="col-span-1">{product.usage}</div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-2 py-[16px]">
                  <div className="col-span-1 font-semibold">Peringatan</div>
                  <div className="col-span-1">{product.warning}</div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default ProductDetailMainPage;
