import { AiOutlineSearch } from "react-icons/ai";
import useUser from "../hooks/useUser";
import { ButtonPrimary, ButtonSecondary } from "./button";

const Navbar = () => {
  const { isLogin } = useUser();

  return (
    <div className="sticky top-0 z-50">
      <div className="flex h-20 bg-white shadow-md">
        <div className="w-80 h-full  flex items-center justify-center">
          <div>
            <img src={"/logo.svg"} className="text-sm" />
          </div>
        </div>
        <div className="w-3/5 ">
          <div className="mt-5 h-10 border-[1px] rounded-md border-slate-500 flex bg-white">
            <div className="w-full flex items-center">
              <input
                placeholder="Cari Obat,Suplemen,Vitamin,Produk kesehatan"
                className="w-96 border-0 ml-2 focus:outline-none text-sm"
              />
            </div>
            <div>
              <AiOutlineSearch className="text-slate-500 mt-2 mr-1 text-xl" />
            </div>
          </div>
        </div>
        {isLogin ? (
          <div className="w-96 flex items-center justify-center">
            <img src={"/CART.svg"} />
            <img src={"/Bell_fill.svg"} className="mx-10" />
            <img src={"/profile.svg"} />
            <span className="text-xs text-purple-800">arunika kiara...</span>
          </div>
        ) : (
          <div className="w-96 flex items-center justify-center">
            <ButtonSecondary className="w-24 h-9 mx-2">Masuk</ButtonSecondary>
            <ButtonPrimary className="w-24 h-9 mx-2">Daftar</ButtonPrimary>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
