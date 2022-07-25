import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../helpers";
import { ButtonPrimary } from "./button";
import PaymentMethod from "./paymentMethod";
import Rupiah from "../helpers/convertToRupiah";
import { Divider } from "@chakra-ui/react";

const BoxTotalTransaction = ({
  subTotal,
  selectedAddress,
  selectBank,
  setSelectBank,
  bank,
  setBank,
  getBank,
  ongkir,
  total,
}) => {
  let { id, firstname, lastname, address, phonenumber } = selectedAddress;

  return (
    <div className="w-[900px] md:h-[400px] md:w-[360px] md:p-5 md:rounded-lg md:shadow-xl md:shadow-purple-100 md:border-[0.5px] md:text-base text-2xl">
      <span className="md:inline-block hidden font-bold text-purple-900 text-lg">
        Total
      </span>
      <div className="flex justify-between mt-7">
        <span className="text-purple-900 md:text-sm">Sub Total</span>
        <span className="md:font-bold text-purple-900">{Rupiah(subTotal)}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-purple-900 md:text-sm">pengiriman</span>
        <span className="md:font-bold text-purple-900">
          {Rupiah(parseInt(ongkir.ongkos))}
        </span>
      </div>
      <div className="my-5 hidden md:inline-block">
        <img src={"./Line19.svg"} />
      </div>
      <Divider className="my-7 md:hidden inline-block" />
      <div className="flex justify-between ">
        <span className="font-medium text-purple-900">Total</span>
        <span className="font-bold text-purple-900">
          {Rupiah(parseInt(total))}
        </span>
      </div>
      <div className="hidden md:inline-block">
        <img src={"./Line20.svg"} />
      </div>
      <div className="flex flex-col my-4">
        <span className="md:inline-block hidden font-bold text-purple-900">
          Metode Pembayaran
        </span>
        <span className="md:inline-block hidden text-xs text-purple-900">
          silahkan pilih metode pembayaran anda disini
        </span>
      </div>
      <PaymentMethod
        selectedAddress={selectedAddress}
        selectBank={selectBank}
        setSelectBank={setSelectBank}
        bank={bank}
        setBank={setBank}
        getBank={getBank}
        ongkir={ongkir}
        total={total}
      />
    </div>
  );
};

export default BoxTotalTransaction;
