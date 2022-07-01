import React, { Component } from "react";
import Slider from "react-slick";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";

function HomeCategoryCarousel() {
  function HomeCategoryCard({ icon, caption }) {
    return (
      <div className="w-[195px] h-[119px] border-[1px] border-slate-100 shadow-lg shadow-slate-100 rounded-xl text-center my-5 ">
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
        <div>
          <HomeCategoryCard icon={"/Obat.svg"} caption={"Obat-obatan"} />
        </div>
        <div>
          <HomeCategoryCard icon={"/Nutrition.svg"} caption={"Nutrisi"} />
        </div>
        <div>
          <HomeCategoryCard icon={"/Herbal.svg"} caption={"Herbal"} />
        </div>
        <div>
          <HomeCategoryCard
            icon={"/Vitamin.svg"}
            caption={"Vitamin & Suplemen"}
          />
        </div>
        <div>
          <HomeCategoryCard
            icon={"/Alat Kesehatan.svg"}
            caption={"Alat Kesehatan"}
          />
        </div>
        <div>
          <HomeCategoryCard
            icon={"/Perawatan Tubuh.svg"}
            caption={"Perawatan Tubuh"}
          />
        </div>
        <div>
          <HomeCategoryCard
            icon={"/Perawatan Tubuh.svg"}
            caption={"Ibu dan Anak"}
          />
        </div>
      </Slider>
    </div>
  );
}

export default HomeCategoryCarousel;
