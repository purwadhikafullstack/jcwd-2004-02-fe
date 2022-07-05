import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import CardHomeBottom from "../components/CardHomeBottom";
import HomeTitleCard from "../components/HomeTitleCard";
import HomePrescriptionCard from "../components/HomePrescriptionCard";
import HomeCategoryCarousel from "../components/HomeCategoryCarousel";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="user-container">
        <HomeTitleCard />
        <HomePrescriptionCard />
        <div className="flex justify-between mt-[50px] items-end ">
          <div className="font-bold text-2xl text-primary">Kategori</div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <div className="mt-[28px]">
          <HomeCategoryCarousel />
        </div>
        <div className="mt-[56px] border-b-2" />
        <div className="flex justify-between mt-[48px] items-end ">
          <div className="font-bold text-2xl text-primary">
            Kejar Diskon Hari Ini
          </div>
          <div className="font-bold text-md text-secondary">Lihat Semua</div>
        </div>
        <div className="mt-[28px]">
          <div className="lg:h-[395px] lg:w-[301px] overflow-hidden absolute rounded-xl ">
            <Image src={"/home3.svg"} layout="fill" objectFit="cover"></Image>
          </div>
          <div className="py-[32px] pl-[211px] grid grid-cols-5 gap-0">
            <CardHomeBottom />
            <CardHomeBottom />
            <CardHomeBottom />
            <CardHomeBottom />
            <CardHomeBottom />
            <div
              className="absolute right-[120px] top-[1130px] bg-white z-50 h-[56px] w-[56px] 
            rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 "
            >
              <HiOutlineChevronRight className="text-3xl text-primary" />
            </div>
          </div>
        </div>
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
