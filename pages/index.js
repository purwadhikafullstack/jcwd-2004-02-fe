import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState({ quantity: 1 });
  const [quantity, setquantity] = useState(1);

  const handleChange = (e, prop) => {
    setInput({ ...input, [prop]: e });
  };

  const incNum = () => {
    let count = parseInt(input.quantity) + 1;
    setInput({ ...input, quantity: count });
  };

  const decNum = () => {
    let count = parseInt(input.quantity) - 1;
    count = count < 1 ? 1 : count;
    setInput({ ...input, quantity: count });
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="user-container">
        <div>
          <div className="absolute bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[200px] left-[70px]">
            <HiOutlineChevronLeft className="text-3xl text-primary" />
          </div>
          <div className="lg:h-[226px] h-[76px] overflow-hidden relative rounded-xl">
            <Image src={"/home1.svg"} layout="fill" objectFit="cover"></Image>
          </div>
          <div className="absolute bg-white z-50 h-[56px] w-[56px] rounded-full p-[12px] shadow-xl border-[1px] border-slate-100 top-[200px] right-[70px]">
            <HiOutlineChevronRight className="text-3xl text-primary" />
          </div>
        </div>
        <div className="flex mt-[56px] rounded-xl shadow-lg shadow-slate-100 border-[0.1px] border-slate-50 justify-between">
          <div className="rounded-xl">
            <div className="lg:h-[170px] lg:w-[511px] h-[76px] overflow-hidden relative rounded-xl ">
              <Image src={"/home2.svg"} layout="fill" objectFit="cover"></Image>
            </div>
          </div>
          <div className="w-[352px] ml-[11px] my-auto">
            <div className="text-2xl font-bold tracking-wide text-primary">
              Punya Resep Doktor?
            </div>
            <div className="text-sm font-medium tracking-wide text-slate-700 mt-[12px]">
              Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto
              tidak boleh lebih dari 10 MB
            </div>
          </div>
          <div className="my-auto mr-[28px]">
            <Button
              height="48px"
              width="274px"
              textColor={"whiteAlpha.900"}
              bgColor={"brand.primary"}
            >
              {" "}
              Unggah Resep
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-end">
            <div className="w-[150px] h-[38px] pl-5 pr-3 bg-gray-200 rounded-xl ml-5 flex justify-between items-center">
              {/* <img src={"./min.svg"} />  */}
              <button
                onClick={() => {
                  let count = parseInt(quantity) - 1;
                  count = count + "";
                  setquantity(count);
                }}
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                onChange={(value) => setquantity(value)}
                value={quantity}
                className="text-sm font-bold text-purple-900 ml-2 w-5"
              />
              {/* <div onChange={(e) => handleChange(e,"quantity")}></div> */}
              {/* <img src={"./plus.svg"} onClick={increase}/>  */}
              <button
                onClick={() => {
                  let count = parseInt(quantity) + 1;
                  count = count + "";
                  setquantity(count);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
