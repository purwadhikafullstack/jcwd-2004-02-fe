import { ButtonPrimary } from "./button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../helpers";
import { useDisclosure } from "@chakra-ui/react";

const BoxChooseAddress = ({ terpilih, addressa, setSelectedAddress }) => {
  const { id, firstname, lastname, address, phonenumber } = addressa;
  const { onClose } = useDisclosure();

  const defaultAddress = async () => {
    setSelectedAddress(addressa);
    onClose();
  };

  return (
    <div>
      <div className=" h-[150px] flex flex-col rounded-lg shadow-md p-3">
        <div className="mb-7">
          <div className="flex justify-between">
            <span>
              {firstname} {lastname}
            </span>
            <button
              disabled={terpilih}
              onClick={defaultAddress}
              className={
                `${terpilih ? "bg-slate-500" : "bg-purple-900"} ` +
                "w-[100px] h-[30px]  text-white rounded-lg text-xs"
              }
            >
              {terpilih ? "terpilih" : "Pilih"}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <span>{phonenumber}</span>
          <span>{address}</span>
        </div>
      </div>
    </div>
  );
};

export default BoxChooseAddress;
