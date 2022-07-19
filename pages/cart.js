import { useState, useEffect } from "react";
import BoxWithImage from "../components/boxWithImage";
import BoxTotalCart from "../components/boxTotalCart";
// import BoxTotalTransaction from "../components/boxTotalTransaction";
import Navbar from "../components/Navbar";
import BoxAddress from "../components/boxAddress";
// import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../helpers";
import { getCartAction } from "../redux/actions";
import { connect } from "react-redux";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";
import CardHomeBottom from "../components/CardHomeBottom";
import HomePopularProductCarousel from "../components/HomePopularProductCarousel";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";

const Cart = ({ getCartAction }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [quantity, setquantity] = useState([]);
  const [address, setAddress] = useState([]);
  const router = useRouter();

  const { isLogin, name } = useUser();
  const { cart } = useCart();

  const fetchDaftarProduk = async () => {
    try {
      let res = await axios.get(`${API_URL}/products/fetchuserproduct`);
      setData([...res.data]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    let token = Cookies.get("token");
    try {
      const res = await axios.get(`${API_URL}/transaction/getAllAddress`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setAddress(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const quantity = cart[i].quantityCart;
    const price = cart[i].hargaJual;
    subTotal = subTotal + quantity * price;
  }

  useEffect(() => {
    getCartAction();
    fetchDaftarProduk();
    getAddress();
    // hitungqty()
  }, []);
  console.log("yang ini cart", cart);

  useEffect(() => {
    // hitungTotal()
  }, [quantity]);

  return (
    <>
      <div>
        <MetaDecorator
          title={`${name} / Cart`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <Navbar />
      <div className="">
        <div className="text-xl font-bold text-purple-900 mb-[36px] mx-20">
          Keranjang Saya
        </div>
        <div className="mx-20">
          <div className="px-20">
            {cart.length ? (
              <div className="flex justify-between">
                <div className="flex flex-col">
                  {cart.map((cart, index) => (
                    <BoxWithImage
                      // {/* <BoxAddress/> */}
                      key={index}
                      id={cart.id}
                      name={cart.product_name}
                      imageProduct={API_URL + cart.images.image}
                      price={cart.hargaJual}
                      kuantitas={cart.quantityCart}
                      unit={cart.unit}
                      total={cart.totalHarga}
                      index={index}
                      productId={cart.product_id}
                      total_stock={cart.total_stock}
                    />
                  ))}
                </div>
                <BoxTotalCart subTotal={subTotal} address={address} />
              </div>
            ) : (
              <div className="text-primary text-xl font-semibold text-center">
                <div>Tidak ada produk di cart.</div>
                <div>Yuk tambahkan produk terlebih dahulu.</div>
                <button
                  className="bg-secondary text-white font-semibold rounded-lg py-[10px] px-[15px] mt-[20px]"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}
          </div>

          <div className="py-14 px-20">
            <div className="w-full border-b-2 border-slate mb-[28px]" />
            <span className="text-xl font-bold text-purple-900">
              Produk Terkait
            </span>
            <div className="mt-[28px]">
              <HomePopularProductCarousel data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default connect(null, { getCartAction })(Cart);