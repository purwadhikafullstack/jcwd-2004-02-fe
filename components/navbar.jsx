import { ButtonPrimary, ButtonSecondary } from "./button";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import { API_URL } from "../helpers";
const Navbar = () => {
  const { isLogin, name, profilepic } = useUser();
  const profpic = profilepic ? `${API_URL + profilepic}` : `../no_pic.png`;
  return (
    <div className="flex justify-between h-[80px] bg-white shadow-lg shadow-purple-100 px-5">
      <div className="w-[250px] h-full  flex items-center justify-center">
        <Link href="/">
          <div className="w-[200px] cursor-pointer">
            <img src={"/logo.svg"} className="text-sm" />
          </div>
        </Link>
      </div>
      <div className="w-[680px]">
        <div className="mt-5 h-10 border-[1px] rounded-md border-gray-300 flex bg-white">
          <div className="w-full flex items-center">
            <input
              placeholder="Cari Obat,Suplemen,Vitamin,Produk kesehatan"
              className="w-[595px] border-0 ml-2 focus:outline-none text-sm"
            />
          </div>
          <div>
            <AiOutlineSearch className="text-gray-300 mt-2 mr-3 text-xl" />
          </div>
        </div>
      </div>
      {isLogin ? (
        <div className="w-[270px] ml-10 flex items-center justify-center">
          <IoCart className="text-2xl text-purple-900" />
          <BsBellFill className="text-xl text-purple-900 mx-10" />
          <Link href="/profile">
            <div className="cursor-pointer">
              <Image
                borderRadius="full"
                boxSize="60px"
                src={profpic}
                alt="profilepic"
              />
            </div>
          </Link>
          <Link href="/profile">
            <span className="text-xs text-purple-800 truncate ... cursor-pointer">
              {name}
            </span>
          </Link>
        </div>
      ) : (
        <div className="w-96 flex items-center justify-center">
          <Link href="/login">
            <div>
              <ButtonSecondary className="w-24 h-9 mx-2">Masuk</ButtonSecondary>
            </div>
          </Link>
          <Link href="/register">
            <div>
              <ButtonPrimary className="w-24 h-9 mx-2">Daftar</ButtonPrimary>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
