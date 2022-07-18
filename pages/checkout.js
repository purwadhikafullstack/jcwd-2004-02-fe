import { AiFillCheckCircle } from "react-icons/ai";
import BoxAddress from "../components/boxAddress";
import BoxCheckout from "../components/boxCheckout";
import BoxTotalTransaction from "../components/boxTotalTransaction";
import Navbar from "../components/Navbar";
import RingkasanOrder from "../components/ringkasanOrder";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../helpers";
import { getCartAction } from "../redux/actions";
import { connect } from "react-redux";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";
import Rupiah from "../helpers/convertToRupiah";
import RingkasanOrderCheckout from "../components/RingkasanOrderCheckout";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";

const Checkout = ({ getCartAction }) => {
  const [data, setData] = useState([]);
  const [getUserAddress, setGetUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectBank, setSelectBank] = useState(null);
  const [bank, setBank] = useState([]);

  const { isLogin } = useUser();
  const { cart } = useCart();

  const getBank = async () => {
    try {
      const res = await axios.get(`${API_URL}/transaction/getBank`);
      setBank(res.data);
      console.log("ini res banknya ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getDataCart = async () => {
  //     let token = Cookies.get('token')
  //     try {
  //         const res = await axios.get(
  //             `${API_URL}/transaction/getDataCart`,{
  //                 headers: {
  //                     authorization: `bearer ${token}`
  //                 }
  //             }
  //         )
  //         setData(res.data)
  //         console.log('yang ini adalah res.data',res.data)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const quantity = cart[i].quantityCart;
      const price = cart[i].hargaJual;
      subTotal = subTotal + quantity * price;
    }
    return subTotal;
  };

  const getAddress = async () => {
    let token = Cookies.get("token");
    try {
      const res = await axios.get(`${API_URL}/transaction/getAllAddress`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setGetUserAddress(res.data);
      setSelectedAddress(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBank();
    getCartAction();
    getAddress();
  }, []);

  return (
    <div>
      <div>
        <MetaDecorator
          title={"Checkout / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <>
        <Navbar />
        <div className="flex px-[96px] pt-10 pb-14">
          <div className="flex flex-col">
            <div>
              <BoxAddress
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
                getAddress={getUserAddress}
              />
            </div>
            <div className=" w-[700px] min-h-[260px] rounded-lg mr-12 shadow-xl shadow-purple-100 p-6 text-purple-900 font-bold">
              Ringkasan Order
              <div>
                <div className="ml-2">
                  <img className="my-6" src={"/Line24.svg"} />
                </div>
                {cart.map((checkout, index) => (
                  <RingkasanOrderCheckout
                    key={index}
                    id={checkout.id}
                    name={checkout.product_name}
                    price={checkout.totalHarga}
                    unit={checkout.unit}
                    quantityCart={checkout.quantityCart}
                  />
                ))}

                <div className="flex flex-col items-end justify-end">
                  <div>
                    <img src={"/Line17.svg"} />
                  </div>
                  <div className="flex justify-between w-[523px] mt-5">
                    <span className="text-purple-900 text-md font-semibold">
                      Subtotal
                    </span>
                    <span className="text-purple-900 text-md font-bold">
                      {Rupiah(subTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BoxTotalTransaction
            subTotal={subTotal()}
            address={getUserAddress}
            selectedAddress={selectedAddress}
            selectBank={selectBank}
            setSelectBank={setSelectBank}
            bank={bank}
            setBank={setBank}
            getBank={getBank}
          />
        </div>
      </>
    </div>
  );
};

export default connect(null, { getCartAction })(Checkout);
