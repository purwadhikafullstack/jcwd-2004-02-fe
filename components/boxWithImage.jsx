import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { API_URL } from "../helpers";
import { getCartAction } from "../redux/actions";
import { connect } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import Rupiah from "../helpers/convertToRupiah";
import { toast } from "react-toastify";

const BoxWithImage = ({
  id,
  name,
  price,
  unit,
  total,
  kuantitas,
  imageProduct,
  productId,
  getCartAction,
  total_stock,
}) => {
  const [input, setInput] = useState({ quantity: kuantitas });
  const [quantity, setquantity] = useState("");
  const [totalqty, settotalqty] = useState(1);

  const router = useRouter();

  const handleChange = (e, prop) => {
    setInput({ ...input, [prop]: e });
  };

  const increase = () => {
    let count = parseInt(input.quantity) + 1;
    count = count >= total_stock ? total_stock : count;
    setInput({ ...input, quantity: count });
    if (quantity <= total_stock) {
      plusHandle();
    }
  };

  const decrease = () => {
    let count = parseInt(input.quantity) - 1;
    count = count < 1 ? 1 : count;
    setInput({ ...input, quantity: count });

    if (quantity <= total_stock) {
      minHandle();
    }
  };

  const onDeleteClick = async () => {
    let token = Cookies.get("token");
    try {
      const res = await axios.delete(
        `${API_URL}/transaction/deleteCart/${id}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      toast.success("Berhasil Delete Cart", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      getCartAction();
    }
  };

  const plusHandle = async (e) => {
    let token = Cookies.get("token");
    try {
      const res = await axios.put(
        `${API_URL}/transaction/plusCart/${id}`,
        null,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      getCartAction();
    }
  };

  const minHandle = async (e) => {
    let token = Cookies.get("token");
    try {
      const res = await axios.put(
        `${API_URL}/transaction/minCart/${id}`,
        null,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      getCartAction();
    }
  };

  return (
    <div className=" md:w-[680px] md:h-[240px] mb-[26px] md:rounded-lg md:border-[1px] w-[900px] md:border-slate-100 md:shadow-lg md:shadow-slate-200 md:px-[20px] md:pr-8 pr-20">
      <div>
        <div className="ml-2">
          {/* <input type={"checkbox"} className="mr-2"/> */}
          {/* <span className="text-base text-purple-900">Pilih Semua</span>  */}
          {/* <img className="my-6" src={"./Line24.svg"}/> */}
          <div className="h-6 w-96">
            <img className="my-6 " src={"/Line24.svg"} />
          </div>
        </div>
        <div className="flex ml-2">
          <div className="flex items-center">
            <div>{/* <input type={"checkbox"}/>  */}</div>
            <div className="md:w-[86px] md:h-[86px] w-[200px] h-[200px]">
              <img src={imageProduct} />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col ml-10">
              <span className="md:text-lg text-3xl text-purple-900 font-semibold">
                {name}
              </span>
              <span className="md:text-xs text-2xl text-purple-900">
                {kuantitas} {unit}
              </span>
            </div>
            <div className="">
              <span className="font-bold md:text-base text-2xl text-purple-900">
                {Rupiah(price)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center md:justify-end mt-5">
          <span className="md:text-sm text-2xl text-purple-900 md:mr-0 mr-[305px]">
            Pindahkan ke whistlist
          </span>
          <span className="mx-3">|</span>
          <div>
            <BsFillTrashFill
              className="md:w-[20px] md:h-[20px] w-[30px] h-[30px] text-purple-900"
              onClick={onDeleteClick}
            />
          </div>
          <div className="md:w-[150px] md:h-[38px] w-[200px] h-[60px]  bg-gray-200 rounded-xl ml-5 flex justify-between items-center">
            {/* <img src={"./min.svg"}  />  */}
            <button
              className="font-extrabold md:text-2xl text-5xl text-purple-900 ml-7"
              onClick={decrease}
            >
              -
            </button>
            {/* <input name="quantity" onChange={(value) => setquantity(value)} value={quantity} className="text-sm font-bold text-purple-900 ml-2 w-5 bg-gray-200"/> */}
            <div className="mr-5 ml-4 md:text-base text-3xl">
              {input.quantity}
            </div>
            {/* <img src={"./plus.svg"}  />   */}
            {/* // quantity lebih atau = maka true */}
            <button
              className="font-bold md:text-2xl text-5xl text-purple-900 mr-7"
              onClick={increase}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getCartAction })(BoxWithImage);
