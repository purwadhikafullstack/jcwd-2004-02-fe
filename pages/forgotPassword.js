import { ButtonPrimary } from "../components/button";
import { MdEmail } from "react-icons/md";
import React from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import { toast } from "react-toastify";
import { useState } from "react";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";
import Link from "next/link";

const ForgotPassword = () => {
  const [inputEmail, setInputEmail] = useState({
    email: "",
  });

  const handleInput = (e) => {
    setInputEmail({ ...inputEmail, [e.target.name]: e.target.value });
  };

  const onSendForgotPass = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/forgotPassword`, {
        email: inputEmail.email,
      });
      toast.success("Please Check Your Email", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <MetaDecorator
          title={"Forgot Password / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div className="flex">
        <div className="xl:w-1/2 hidden xl:inline-block xl:h-full">
          <img className="xl:h-screen xl:w-screen" src={"/Frame.svg"} />
        </div>
        <div className="px-8 xl:w-1/2 xl:h-screen xl:px-20 xl:pt-10">
          <div className="mt-20 flex flex-col xl:mt-3">
            <div>
              <span className="font-bold text-2xl xl:text-2xl">
                Lupa Kata Sandi
              </span>
            </div>
          </div>
          <div className="mt-8">
            <form onSubmit={onSendForgotPass}>
              <div className="flex flex-col relative mb-4 xl:mb-8">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                  Email Address
                </p>
                <input
                  name="email"
                  placeholder="Masukkan email anda"
                  className="border-2 xl:h-10 h-12 pl-8 pb-1 w-full xl:pl-10 rounded-xl focus:outline-none xl:text-sm"
                  onChange={handleInput}
                ></input>
                <div className="absolute xl:bottom-3 bottom-4 ml-3 text-purple-800 text-lg">
                  <MdEmail />
                </div>
              </div>
              <div>
                <ButtonPrimary type="submit" className="w-full h-12 xl:h-10">
                  Kirim Email
                </ButtonPrimary>
              </div>
            </form>
          </div>
          <div className="mt-8 xl:flex xl:items-center xl:justify-center ">
            <span className="xl:text-sm">Belum Punya Akun?</span>
            <Link href={"/register"}>
              <span className="text-purple-800 xl:text-sm font-semibold xl:ml-1 cursor-pointer">
                Daftar
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
