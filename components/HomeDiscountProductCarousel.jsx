import React, { Component } from "react";
import Slider from "react-slick";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";
import CardHomeTop from "./CartHomeTop";
import { API_URL } from "../helpers";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

function HomeDiscountProductCarousel({ data }) {
  const router = useRouter();

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute top-[120px] -right-1 z-10 lg:inline hidden "
      >
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute z-10 bottom-[60px] -left-5 hidden "
      >
        <HiOutlineChevronLeft className="text-3xl text-primary" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <Slider {...settings}>
        {data.map((val, ind) => {
          return (
            <div
              key={ind}
              className="py-2 px-[3px] cursor-pointer "
              onClick={() => {
                router.push(
                  `/products/detail/${val.id}?brand=${val.brand_name}`
                );
              }}
            >
              <CardHomeTop
                img={`${API_URL}${val.images[0].image}`}
                name={val.name}
                price={val.hargaJual}
                unit={val.unit}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeDiscountProductCarousel;
