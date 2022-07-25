import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../helpers";
import { useEffect, useState } from "react";
import CardHomeBottom from "../components/CardHomeBottom";
import HomeTitleCard from "../components/HomeTitleCard";
import HomePrescriptionCard from "../components/HomePrescriptionCard";
import HomeCategoryCarousel from "../components/HomeCategoryCarousel";
import HomeDiscount from "../components/HomeDiscount";
import HomePopularProductCarousel from "../components/HomePopularProductCarousel";
import HomeJaminanBanner from "../components/HomeJaminanBanner";
import Footer from "../components/Footer";
import MetaDecorator from "../components/MetaDecorator";
// import healthymedlogo from "../public/healthymed-logo.svg";

import Cookies from "js-cookie";

import { toast } from "react-toastify";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDaftarProduk = async () => {
    try {
      let res = await axios.get(`${API_URL}/products/fetchuserproduct`);
      setData([...res.data]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDaftarProduk();
  }, []);

  useEffect(() => {
    getAlamat();
  }, []);

  const [alamat, setalamat] = useState([]);
  const getAlamat = async () => {
    try {
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/profile/address/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setalamat(res.data);
      console.log("alamat list ", res.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response?.data.message, {
      //   position: "top-right",
      //   autoClose: 1000,
      //   closeOnClick: true,
      //   draggable: true,
      // });
    }
  };
  return (
    <>
      <MetaDecorator
        title={"Home / Healthymed"}
        description={
          "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
        }
        imageUrl={"/healthymed-logo.svg"}
      />
      <div>
        <Navbar />
      </div>
      <div className="user-container">
        {/* Home Title Card */}
        <HomeTitleCard />

        {/* Home Prescription Card */}
        <HomePrescriptionCard alamat={alamat} />

        {/* Category Carousel  */}
        <div className="flex justify-between mt-[50px] items-end ">
          <div className="font-bold text-xl text-primary">Kategori</div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <div className="mt-[20px]">
          <HomeCategoryCarousel />
        </div>
      </div>

      {/* Discount Products */}
      <div className="mt-[30px] border-b-2 lg:w-[1024px] lg:mx-auto" />
      <div className="flex justify-between mt-[38px] items-end lg:w-[1024px] w-[327px] mx-auto">
        <div className="font-bold text-xl text-primary ">
          Kejar Diskon Hari Ini
        </div>
        <div className="font-bold text-md text-secondary">Lihat Semua</div>
      </div>
      <div className="lg:w-[1024px] lg:mx-auto">
        <HomeDiscount data={data} />
      </div>
      <div className="mt-[40px] border-b-2" />

      <div className="user-container">
        {/* Event Banner */}
        <div>
          <div className="mt-[48px] grid lg:grid-cols-2 gap-6">
            <div className="lg:h-[180px] lg:w-[500px] h-[124px] w-[326px] col-span-1 overflow-hidden relative rounded-xl ">
              <Image src={"/home4.svg"} layout="fill" objectFit="cover"></Image>
            </div>
            <div className="lg:h-[180px] lg:w-[500px] h-[124px] w-[326px] col-span-1 overflow-hidden relative rounded-xl ">
              <Image src={"/home5.svg"} layout="fill" objectFit="cover"></Image>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mt-[48px] border-b-2" />
        <div className="flex justify-between mt-[48px] items-end ">
          <div className="font-bold text-xl text-primary">Popular Product</div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <div className="mt-[28px]">
          <HomePopularProductCarousel data={data} />
        </div>

        {/* Jaminan */}
        <div className="mt-[48px] border-b-2" />
        <div className="mt-[48px] items-end ">
          <div className="font-bold text-2xl text-primary">
            Jaminan Untuk Anda
          </div>
        </div>
        <div className="mt-[28px]">
          <HomeJaminanBanner />
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="min-w-fit hidden lg:block lg:h-[160px] bg-hover-button mt-[110px]">
        <div className="text-center text-primary font-semibold pt-[24px] ">
          Metode Pembayaran
        </div>
        <div className="w-[941px] h-[68px] mt-[14px] mx-auto overflow-hidden relative ">
          <Image
            src={"/metodepembayaran.svg"}
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
      </div>

      {/* Footer */}
      <div className="hidden lg:inline">
        <Footer />
      </div>
    </>
  );
}
