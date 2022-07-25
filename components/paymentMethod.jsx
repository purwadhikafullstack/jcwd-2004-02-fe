import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../helpers";
import { useRouter } from "next/router";
import useCart from "../hooks/useCart";
import { useEffect } from "react";
import Rupiah from "../helpers/convertToRupiah";
import { toast } from "react-toastify";

const PaymentMethod = ({
  selectedAddress,
  selectBank,
  setSelectBank,
  bank,
  setBank,
  getBank,
  ongkos,
  total,
}) => {
  let { firstname, address } = selectedAddress;
  let { id, name, no_rekening, kode_bank } = bank;

  const { cart } = useCart();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tab, setTab] = useState(0);

  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const quantity = cart[i].quantityCart;
      const price = cart[i].hargaJual;
      subTotal = subTotal + quantity * price;
    }
    return subTotal;
  };

  const userCheckout = async () => {
    let token = Cookies.get("token");
    try {
      let res = await axios.post(
        `${API_URL}/transaction/userCheckout`,
        {
          address: selectedAddress.address,
          recipient: selectedAddress.firstname,
          bank_id: selectBank,
          cart: cart,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      toast.success("Berhasil Checkout", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });

      console.log("ini res data", res.data);
      router.push(`/payment/${res.data[0].id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getBank();
  }, []);
  console.log("ini tab", tab);
  return (
    <>
      <Button
        w="300px"
        fontSize="md"
        h="50px"
        bgColor="purple"
        textColor="white"
        onClick={onOpen}
      >
        Pilih Metode Pembayaran
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="500px" minH="500px">
          <ModalHeader textAlign="center">
            Metode Pembayaran
            <IoIosArrowBack
              onClick={() => setTab(0)}
              className="cursor-pointer"
            />
            <div className="w-[400px] h-[70px] mt-5 rounded-lg shadow-md flex items-start justify-between p-2">
              <div className="flex flex-col">
                <span className="text-sm">Total Harga</span>
                <span className="text-lg font-bold">{Rupiah(total)}</span>
              </div>
              <div>
                <span className="text-xs">lihat Detail</span>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          {tab === 0 ? (
            <ModalBody>
              <div className=" w-[400px] h-[310px]">
                <img src={"/Line18.png"} className="w-full" />
                <div>
                  <div className="w-[400px] h-[30px]  flex">
                    <div className="w-[80px] h-[15px]">
                      <img src={"/bca.png"} />
                    </div>
                    <span className="mt-1 ml-3 text-sm text-purple-900">
                      ATM {bank[0]?.name} Transfer{" "}
                    </span>
                    <button
                      onClick={() => {
                        setTab(1), setSelectBank(bank[0].id);
                      }}
                    >
                      <IoIosArrowForward className="mt-2 ml-40 cursor-pointer" />
                    </button>
                  </div>
                </div>
                <img src={"/Line18.png"} className="w-full" />
                <div className="w-[400px] h-[30px] flex ">
                  <div className="w-[80px] h-[15px]">
                    <img src={"/mandiri.png"} className="" />
                  </div>
                  <span className="mt-1 ml-3 text-sm text-purple-900">
                    ATM {bank[1]?.name} Transfer
                  </span>
                  <IoIosArrowForward
                    onClick={() => {
                      setTab(2), setSelectBank(bank[1].id);
                    }}
                    className="mt-2 ml-[137px] cursor-pointer"
                  />
                </div>
                <img src={"/Line18.png"} className="w-full" />
                <div className="w-[400px] h-[30px] flex ">
                  <div className="w-[80px] h-[15px]">
                    <img
                      src={"/permata.png"}
                      className="flex items-center mb-2"
                    />
                  </div>
                  <span className="mt-1 ml-3 text-sm text-purple-900">
                    ATM {bank[2]?.name} Transfer
                  </span>
                  <IoIosArrowForward
                    onClick={() => {
                      setTab(3), setSelectBank(bank[2].id);
                    }}
                    className="mt-2 ml-[100px] cursor-pointer"
                  />
                </div>
                <img src={"/Line18.png"} className="w-full" />
              </div>
            </ModalBody>
          ) : null}

          {tab === 1 ? (
            <ModalBody>
              <div className=" w-[400px] h-[270px] shadow-md  rounded-lg mb-2">
                <div className="flex justify-between p-2">
                  <span className="mt-1 text-purple-900">
                    ATM {bank[0]?.name} Transfer
                  </span>
                  <div className="w-[80px] h-[15px]">
                    <img src={"/bca.png"} />
                  </div>
                </div>
                <div>
                  <span className="ml-2 mb-3 text-purple-900">
                    Cara Pembayaran
                  </span>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      masukan 6 digit PIN ATM
                    </span>
                  </div>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Lalu pilih menu transaksi lainnya
                    </span>
                  </div>
                  <div className="flex ">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Kemudian pilih menu transfer dan tekan opsi ke rek bank
                      lain
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-[6px] mt-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      masukkan kode bank {bank[0]?.kode_bank} diikuti dengan
                      nomor rekening {bank[0].no_rekening}
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-2" />
                    <span className="text-sm ml-2 text-purple-900">
                      Selanjutnya konfirmasi nama, rekening, dan jumlah yang
                      ditransfer, klik OK atau YA jika informasi sudah betul
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
          ) : null}

          {tab === 2 ? (
            <ModalBody>
              <div className=" w-[400px] h-[270px] shadow-md rounded-lg mb-5">
                <div className="flex justify-between p-2">
                  <span className="mt-1 text-purple-900 ml-2">
                    ATM {bank[1].name} Transfer
                  </span>
                  <div className="w-[80px] h-[15px]">
                    <img src={"/mandiri.png"} />
                  </div>
                </div>
                <div>
                  <span className="text-purple-900 ml-4">Cara Pembayaran</span>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      memasukan sejumlah 6 digit PIN ATM
                    </span>
                  </div>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Lalu pilih menu transaksi lainnya
                    </span>
                  </div>
                  <div className="flex ">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Kemudian pilih menu transfer dan tekan opsi ke rek bank
                      lain
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-[6px] mt-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      masukkan kode bank {bank[1].kode_bank} diikuti dengan
                      nomor rekening {bank[1]?.no_rekening}
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-2" />
                    <span className="text-sm ml-2 text-purple-900">
                      Selanjutnya konfirmasi nama, rekening, dan jumlah yang
                      ditransfer, klik OK atau YA jika informasi sudah betul
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
          ) : null}

          {tab === 3 ? (
            <ModalBody>
              <div className=" w-[400px] h-[270px] shadow-md rounded-lg mb-5">
                <div className="flex justify-between p-2">
                  <span className="mt-1 text-purple-900 ml-2">
                    ATM {bank[2]?.name} Transfer
                  </span>
                  <div className="w-[80px] h-[15px]">
                    <img src={"/Permata.png"} />
                  </div>
                </div>
                <div>
                  <span className="text-purple-900 ml-4">Cara Pembayaran</span>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      masukan 6 digit PIN ATM
                    </span>
                  </div>
                  <div className="flex items-center">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Lalu pilih menu transaksi lainnya
                    </span>
                  </div>
                  <div className="flex ">
                    <GoPrimitiveDot className="ml-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      Kemudian pilih menu transfer dan tekan opsi ke rek bank
                      lain
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-[6px] mt-1" />
                    <span className="text-sm ml-2 text-purple-900">
                      masukkan kode bank {bank[2]?.kode_bank} diikuti dengan
                      nomor rekening {bank[2]?.no_rekening}
                    </span>
                  </div>
                  <div className="flex">
                    <GoPrimitiveDot className="ml-2" />
                    <span className="text-sm ml-2 text-purple-900">
                      Selanjutnya konfirmasi nama, rekening, dan jumlah yang
                      ditransfer, klik OK atau YA jika informasi sudah betul
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
          ) : null}

          <ModalFooter>
            <Button
              colorScheme="purple"
              w="400px"
              h="50px"
              bgColor="purple"
              onClick={userCheckout}
              disabled={!selectBank}
            >
              Pilih Metode
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentMethod;
