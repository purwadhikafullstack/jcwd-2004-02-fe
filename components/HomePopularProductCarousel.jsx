import React, { Component } from "react";
import Slider from "react-slick";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";
import { API_URL } from "../helpers";
import CardHomeBottom from "./CardHomeBottom";
import { useRouter } from "next/router";
import CardHomeTop from "./CartHomeTop";

function HomePopularProductCarousel({ data }) {
  const router = useRouter();
  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute bottom-[150px] -right-5 "
      >
        <HiOutlineChevronRight className="text-3xl text-primary" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="p-2 rounded-full bg-white drop-shadow-lg text-2xl absolute z-50 bottom-[150px] -left-5 "
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
    <div className="w-full">
      <Slider {...settings}>
        {data.map((val, ind) => {
          return (
            <div
              key={ind}
              className="pb-[20px] cursor-pointer"
              onClick={() => {
                router.push(
                  `/products/detail/${val.id}?brand=${val.brand_name}`
                );
              }}
            >
              <CardHomeBottom
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

export default HomePopularProductCarousel;
