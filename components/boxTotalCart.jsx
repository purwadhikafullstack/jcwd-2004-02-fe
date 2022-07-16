import Link from "next/link";
import { ButtonPrimary } from "./button";
import { useRouter } from "next/router";
import Rupiah from "../helpers/convertToRupiah";

const BoxTotalCart = ({ subTotal }) => {
  const router = useRouter();

  const handleCart = () => {
    router.push("/checkout");
  };
  return (
    <div className="h-[300px] w-[405px] px-[24px] py-[10px] border-[1px] border-slate-100 rounded-lg shadow-lg shadow-slate-200 ">
      <span className="font-bold text-purple-900 text-lg">Total</span>
      <div className="flex justify-between mt-7">
        <span className="text-gray-400">Sub Total</span>
        <span className="font-bold text-gray-400">{Rupiah(subTotal)}</span>
      </div>
      <div className="my-5">
        <img src={"./Line19.svg"} />
      </div>
      <div className="flex justify-between mt-7">
        <span className="font-medium text-purple-900">Total</span>
        <span className="font-bold text-purple-900">{Rupiah(subTotal)}</span>
      </div>
      <Link href={"/checkout"}>
        <button
          onClick={handleCart}
          className="w-full h-[45px] mt-10 bg-purple-900 text-white rounded-lg text-xs"
        >
          Bayar
        </button>
      </Link>
    </div>
  );
};

export default BoxTotalCart;
