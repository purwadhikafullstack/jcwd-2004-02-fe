import BoxTimePayment from "../../components/BoxTimePayment";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import RingkasanOrder from "../../components/ringkasanOrder";
import { Divider, Button } from "@chakra-ui/react";
import React, { Component, useCallback, createRef } from "react";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../helpers";
import { BsImage } from "react-icons/bs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCartAction } from "../../redux/actions";
import Rupiah from "../../helpers/convertToRupiah";
import MetaDecorator from "../../components/MetaDecorator";
import healthymedlogo from "../../public/healthymed-logo.svg";

const Payment = ({ getCartAction }) => {
  const router = useRouter();

  const { cart } = useCart();
  console.log("yang ini cartnya", cart);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const { transactionID } = router.query;
  // transactionID = parseInt(transactionID);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("accepted", acceptedFiles);
    console.log("rejected", rejectedFiles);
  }, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop,
    accept: "image/png",
    noClick: true,
    noKeyboard: true,
  });

  const onSubmitPayment = async () => {
    let token = Cookies.get("token");
    const formData = new FormData();

    formData.append("payment", acceptedFiles[0]);

    try {
      let res = await axios.put(
        `${API_URL}/transaction/uploadPayment?transaction_id=${transactionID}`,
        formData,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      setData(res.data);
      console.log("ini data transaction", data);
      toast.success("Konfirmasi Pembayaran Berhasil", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("Konfirmasi Pembayaran Gagal", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < order.length; i++) {
      const quantity = order[i].quantity;
      const price = order[i].price;
      subTotal = subTotal + quantity * price;
    }
    return subTotal;
  };

  const getTransaction = async () => {
    let token = Cookies.get("token");

    try {
      let res = await axios.get(
        `${API_URL}/transaction/waitingPayment/${transactionID}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ini ordernya", order);

  useEffect(() => {
    // getCartAction()
    getTransaction();
  }, []);

  return (
    <div>
      <div>
        <MetaDecorator
          title={`Pembayaran / Healthymed`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <Navbar />
      <div className="my-10">
        <span className="text-xl text-purple-900 text-left ml-[250px] font-bold ">
          Menunggu Pembayaran
        </span>
      </div>
      <div className="flex flex-col items-center gap-y-10 ">
        <BoxTimePayment
          created_at={order[0]?.created_at}
          expired_at={order[0]?.expired_at}
        />
        <div className=" w-[800px] min-h-[260px] rounded-lg shadow-md p-6 font-bold text-purple-900">
          Ringkasan Order
          <div className="my-4">
            <Divider />
          </div>
          <div>
            {order.map((pay, index) => (
              <RingkasanOrder
                key={index}
                id={pay.id}
                name={pay.name}
                price={pay.price * pay.quantity}
                unit={pay.unit}
                quantity={pay.quantity}
                image={API_URL + pay.image}
              />
            ))}
          </div>
          <Divider marginLeft="48" w="556px" />
          <div className="mt-4 w-[556px] ml-48 flex justify-between">
            <span>Subtotal</span>
            <span>{Rupiah(subTotal())}</span>
          </div>
        </div>
        {/* <BoxPaymentProof/> */}
        <div className="w-[800px] h-[400px] rounded-lg shadow-md p-6 font-bold text-purple-900">
          Upload Bukti Pembayaran
          <div className="my-5">
            <Divider />
            <div>
              {!acceptedFiles[0] ? (
                <div
                  className="containerx ml-6 my-2 flex items-center justify-center w-[700px] h-[300px]"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="mb-6 text-2xl"> Tarik & Letakkan File</div>
                  <div className="flex">
                    <div className="hl"></div>
                    <div className="mb-6 text-sm mx-2">atau</div>
                    <div className="hl"></div>
                  </div>
                  <Button
                    colorScheme={"purple"}
                    className="w-[260px]"
                    type="button"
                    onClick={open}
                  >
                    Unggah Bukti Pembayaran
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="container2 ml-6 my-2 flex w-[700px] h-[300px]">
                    <div className="flex border-solid border-gray-200 rounded-lg border-2 px-5 py-2">
                      <BsImage className="text-2xl text-purple-600 " />
                      <ul className="ml-6 text-sm">
                        <div className="flex">
                          <div key={acceptedFiles[0].path}>
                            {acceptedFiles[0].path}
                          </div>
                          <div
                            className="text-purple-600 ml-3"
                            key={acceptedFiles[0].path}
                          >
                            {acceptedFiles[0].size / 1000} KB
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-36">
        <button
          onClick={onSubmitPayment}
          className="w-[500px] h-[45px] mt-10 bg-purple-900 text-white rounded-lg text-sm text-center"
        >
          Konfirmasi Pembayaran
        </button>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default connect(null, { getCartAction })(Payment);
