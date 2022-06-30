import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardHomeBottom from "../components/CardHomeBottom";
import HomeTitleCard from "../components/HomeTitleCard";
import HomePrescriptionCard from "../components/HomePrescriptionCard";
import HomeCategoryCarousel from "../components/HomeCategoryCarousel";
import HomeDiscount from "../components/HomeDiscount";
import axios from "axios";
import { API_URL } from "../helpers";

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

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="user-container">
        {/* Home Title Card */}
        <HomeTitleCard />

        {/* Home Prescription Card */}
        <HomePrescriptionCard />

        {/* Category Carousel  */}
        <div className="flex justify-between mt-[50px] items-end ">
          <div className="font-bold text-2xl text-primary">Kategori</div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <div className="mt-[28px]">
          <HomeCategoryCarousel />
        </div>

        {/* Discount Product */}
        <div className="mt-[56px] border-b-2" />
        <div className="flex justify-between mt-[48px] items-end ">
          <div className="font-bold text-2xl text-primary">
            Kejar Diskon Hari Ini
          </div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <HomeDiscount data={data} />

        <div className="mt-[48px] border-b-2" />
        <div className="mt-[48px] flex justify-between">
          <div className="lg:h-[212px] lg:w-[616px] overflow-hidden relative rounded-xl ">
            <Image src={"/home4.svg"} layout="fill" objectFit="cover"></Image>
          </div>
          <div className="lg:h-[212px] lg:w-[616px] overflow-hidden relative rounded-xl ">
            <Image src={"/home5.svg"} layout="fill" objectFit="cover"></Image>
          </div>
        </div>
        <div className="mt-[48px] border-b-2" />
        <div className="flex justify-between mt-[48px] items-end ">
          <div className="font-bold text-2xl text-primary">Popular Product</div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
      </div>
    </>
  );
}
