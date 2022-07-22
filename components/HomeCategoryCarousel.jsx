import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../helpers";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

function HomeCategoryCarousel() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const IconArr = [
    "/Obat.svg",
    "/Nutrition.svg",
    "/Herbal.svg",
    "/Vitamin.svg",
    "/Alat Kesehatan.svg",
    "/Perawatan Tubuh.svg",
    "/Perawatan Tubuh.svg",
  ];

  const getCategories = async () => {
    try {
      let res = await axios.get(`${API_URL}/products/getcategory`);
      setCategories([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    console.log(categories);
  }, []);

  function HomeCategoryCard({ icon, caption }) {
    return (
      <div className="w-[195px] h-[119px] border-[2px] border-slate-100 shadow-lg hover:border-secondary shadow-slate-100 rounded-xl text-center my-5 ">
        <div className="h-[64px] w-[64px] mx-auto my-[8px] overflow-hidden relative">
          <Image src={icon} layout="fill" objectFit="cover" />
        </div>
        <div className="font-bold text-primary">{caption}</div>
      </div>
    );
  }

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute bottom-[60px] -right-5 "
      >
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute z-50 bottom-[60px] -left-5 "
      >
        <HiOutlineChevronLeft className="text-3xl text-primary" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="w-[1244px]">
      <Slider {...settings}>
        {categories.map(({ id, name }) => {
          return (
            <div
              key={id}
              className="cursor-pointer"
              onClick={() => {
                router.push(`/products/${id}`);
              }}
            >
              <HomeCategoryCard icon={IconArr[id - 1]} caption={name} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeCategoryCarousel;
