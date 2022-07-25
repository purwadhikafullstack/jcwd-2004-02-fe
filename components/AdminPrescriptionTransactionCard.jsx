import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { API_URL } from "../helpers";
import dayjs from "dayjs";
import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import { flushSync } from "react-dom";
import Rupiah from "../helpers/convertToRupiah";
import { toast } from "react-toastify";

function AdminPrescriptionTransactionCard({ data, setIsLoading, isLoading }) {
  const {
    status,
    prescription_number,
    transaction_number,
    pr_image,
    updated_at,
    products,
    subtotal,
    expired_at,
    created_at,
    recipient,
    address,
    courier,
    pr_status,
    id,
    nama_pasien,
    nama_dokter,
  } = data;

  const [tab, setTab] = useState(0);
  // get list nama obat
  const [productList, setproductList] = useState([]);
  const [input, setinput] = useState({
    nama_pasien: "",
    nama_dokter: "",
    quantity: 0,
    unit: "",
    dosis: "",
    name: "",
  });

  const [dataResep, setdataResep] = useState([]);
  const [dataPrescUser, setdataPrescUser] = useState({});

  const [quantity, setquantity] = useState(0);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const {
    isOpen: isOpenCustomOrder,
    onOpen: onOpenCustomOrder,
    onClose: onCloseCustomOrder,
  } = useDisclosure();
  // handle
  const handleChange = (e, prop) => {
    if (prop === "quantity") {
      if (e.target.value >= input.name.value.total_stock) {
        setinput({ ...input, [prop]: input.name.value.total_stock });
      } else {
        setinput({ ...input, [prop]: e.target.value });
      }
    } else {
      setinput({ ...input, [prop]: e.target.value });
    }
  };
  const handleChangeQty = (e) => {
    setquantity(e);
  };

  // handle select
  // individu -> e.value, multi -> e
  const handleChangeSelect = (e, prop) => {
    setinput({ ...input, [prop]: e });
    console.log(e);
  };
  useEffect(() => {
    fetchComponentObat();
  }, []);

  // get data symptom, category, dll
  const fetchComponentObat = async () => {
    try {
      let res = await axios.get(`${API_URL}/transaction/product`);
      setproductList(res.data);
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

  const fetchPrescription = async () => {
    try {
      let res = await axios.get(`${API_URL}/transaction/pic/${id}`);
      setdataPrescUser(res.data);
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

  const onclickpr = (id) => {
    fetchPrescription(id);
    onOpenPrescription();
  };
  // add obat
  const tambahObatClick = async (e) => {
    // fitur tambahin obat
    setdataResep([
      ...dataResep,
      {
        ...input.name.value,
        quantity: quantity,
        dosis: input.dosis,
        unit: input.unit,
      },
    ]);
    // console.log(dataResep, "added Data to table");
    setinput({
      ...input,
      quantity: 0,
      unit: "",
      dosis: "",
      name: null,
    });
    // di push
  };

  // submit form
  const onSaveDataClick = async (e) => {
    e.preventDefault();
    let insertData = {
      prescription_number: input.prescription_number,
      nama_pasien: input.nama_pasien,
      nama_dokter: input.nama_dokter,
      dataResep: dataResep,
    };
    // console.log(insertData, "inserted data");

    try {
      await submitProduct(insertData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      flushSync(() => {
        setTab(5);
      });
      setinput({
        nama_pasien: "",
        nama_dokter: "",
      });
      setdataResep({ quantity: 0, unit: "", dosis: "", name: null });
      setTimeout(() => {
        onCloseCustomOrder();
      }, 1000);
    }
  };

  const submitProduct = async (values) => {
    try {
      console.log(id, "masuk sini");
      await axios.put(`${API_URL}/transaction/submit/${id}`, values);
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

  // untuk isi dari select dari database
  const nameOptions = productList.product?.map((val) => {
    return { value: val, label: val.name };
  });
  // const incNum = () => {
  //   let count = parseInt(input.quantity) + 1;
  //   // count = count >= productList.total_stock ? productList.total_stock : count;
  //   setinput({ ...input, quantity: count });
  // };

  // const decNum = () => {
  //   let count = parseInt(input.quantity) - 1;
  //   count = count < 1 ? 1 : count;
  //   setinput({ ...input, quantity: count });
  // };

  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < dataResep.length; i++) {
      const qty = dataResep[i].quantity;
      const harga = dataResep[i].hargaJual;
      subTotal = subTotal + qty * harga;
    }
    return subTotal;
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const {
    isOpen: isOpenAccept,
    onOpen: onOpenAccept,
    onClose: onCloseAccept,
  } = useDisclosure();

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const {
    isOpen: isOpenReject,
    onOpen: onOpenReject,
    onClose: onCloseReject,
  } = useDisclosure();

  const {
    isOpen: isOpenSend,
    onOpen: onOpenSend,
    onClose: onCloseSend,
  } = useDisclosure();

  const {
    isOpen: isOpenPrescription,
    onOpen: onOpenPrescription,
    onClose: onClosePrescription,
  } = useDisclosure();

  const terimaPesanan = async () => {
    try {
      await axios.put(`${API_URL}/transaction/acceptPayment/${id}`);

      setIsLoading(!isLoading);
      toast.success(`Pesanan No. ${transaction_number} berhasil diterima.`, {
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
      setIsLoading(!isLoading);
    }
  };

  let token = Cookies.get("token");
  const tolakPesanan = async () => {
    try {
      await axios.post(`${API_URL}/transaction/rejectPayment/${id}`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(!isLoading);
      toast.success(`Pesanan No. ${transaction_number} berhasil ditolak.`, {
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
      setIsLoading(!isLoading);
    }
  };

  const kirimPesanan = async () => {
    try {
      await axios.patch(`${API_URL}/transaction/sendorder/${id}`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(!isLoading);
      toast.success(`Pesanan No. ${transaction_number} berhasil dikirim.`, {
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
      setIsLoading(!isLoading);
    }
  };

  return (
    <>
      {prescription_number ? (
        <>
          {pr_status == "menunggu konfirmasi" ? (
            // MENUNGGU KONFIRMASI
            <div className="bg-white mt-[32px] rounded-lg">
              <div className="py-[16px] px-[26px] border-l-4 rounded-t-lg border-b-2 items-center">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div>
                      <Checkbox
                        borderColor={"gray.300"}
                        colorScheme="purple"
                        // isChecked={checkedItems[0]}
                        // onChange={(e) =>
                        //   setCheckedItems([e.target.checked, checkedItems[1]])
                        // }
                      >
                        <p className="text-primary font-bold">Pesanan Baru </p>
                      </Checkbox>
                    </div>
                    <div className="pl-[4px] font-bold text-primary">
                      <span className="text-slate-300 font-normal">/</span>
                      {transaction_number}
                    </div>
                    <div className="pl-[4px] text-slate-500 flex items-center">
                      <span className="text-slate-300">/</span>
                      <AiOutlineClockCircle className="ml-[6px] mr-[2px]" />{" "}
                      {dayjs(created_at).format("DD MMMM YYYY hh:mm A")}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold text-primary mr-[8px]">
                      Respon Sebelum
                    </div>
                    <div
                      className="w-[164px] h-[28px] rounded-md border-2 border-orange-300 
              text-orange-300 bg-warning text-xs flex items-center px-[10px] font-medium"
                    >
                      <AiOutlineClockCircle className="ml-[2px] mr-[1px]" />
                      {dayjs(updated_at)
                        .add(2, "day")
                        .format("DD MMMM YYYY hh:mm A")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[19px] px-[32px]">
                <div className="flex">
                  <div className="w-[75px] h-[75px] rounded-lg border-2 mr-[24px] overflow-hidden relative">
                    <Image
                      src={`${API_URL}${pr_image}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-[216px] border-r-2 text-sm">
                    <div className="truncate pr-[32px] font-bold text-primary">
                      Resep Dokter
                    </div>
                    <button
                      onClick={onOpenCustomOrder}
                      className="text-center mt-[10px] w-[123px] h-[32px] bg-secondary rounded-md font-medium text-white text-xs"
                    >
                      Buat Salinan Resep
                    </button>
                  </div>
                  <div className="ml-[32px] flex text-primary">
                    <div className="text-sm mr-[32px] w-[141px]">
                      <div className="font-semibold">Pembeli</div>
                      <div>{recipient}</div>
                    </div>
                    <div className="text-sm mr-[32px] w-[244px]">
                      <div className="font-semibold">Alamat</div>
                      <div>{address}</div>
                    </div>
                    <div className="text-sm mr-[32px]">
                      <div className="font-semibold">Kurir</div>
                      <div>{courier}</div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-[19px] p-[16px] bg-slate-100 rounded-md flex justify-between">
              <div className="font-bold text-primary">
                Total Harga
                <span className="text-xs font-normal text-slate-600">
                  (4 Obat)
                </span>
              </div>
              <div className="font-bold text-primary">Rp 46.000</div>
            </div> */}

                <div className="mt-[28px] flex justify-between">
                  <div className="flex text-primary">
                    <div className="flex items-center">
                      <div>
                        <BsFillChatDotsFill className="text-xl" />
                      </div>
                      <div className="ml-[10px] font-medium text-sm">
                        Chat Pembeli
                      </div>
                    </div>
                    <div className="flex items-center ml-[36px]">
                      <div className="h-[22px] w-[20px] overflow-hidden relative">
                        <Image
                          src={"/transaction2.png"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div
                        className="ml-[10px] font-medium text-sm cursor-pointer"
                        onClick={onOpenDetail}
                      >
                        Detail Pesanan
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm font-medium items-center">
                    <div
                      className="mr-[46px] text-primary cursor-pointer"
                      onClick={onOpenReject}
                    >
                      Tolak Pesanan
                    </div>
                    <button
                      disabled
                      className="text-white bg-slate-400 w-[156px] rounded-md h-[32px] py-[5px] px-[25px]"
                    >
                      Terima Pesanan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // TERKONFIRMASI
            <div className="bg-white mt-[32px] rounded-lg">
              <div className="py-[16px] px-[26px] border-l-4 rounded-t-lg border-b-2 items-center">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div>
                      <Checkbox
                        borderColor={"gray.300"}
                        colorScheme="purple"
                        // isChecked={checkedItems[0]}
                        // onChange={(e) =>
                        //   setCheckedItems([e.target.checked, checkedItems[1]])
                        // }
                      >
                        {status == "menunggu pembayaran" ? (
                          <p className="text-primary font-bold">
                            Menunggu Pembayaran
                          </p>
                        ) : null}
                        {status == "menunggu konfirmasi" ? (
                          <p className="text-primary font-bold">Pesanan Baru</p>
                        ) : null}
                        {status == "diproses" ? (
                          <p className="text-primary font-bold">Siap Dikirim</p>
                        ) : null}
                        {status == "dikirim" ? (
                          <p className="text-primary font-bold">
                            Dalam Pengiriman
                          </p>
                        ) : null}
                        {status == "selesai" ? (
                          <p className="text-primary font-bold">Selesai</p>
                        ) : null}
                        {status == "dibatalkan" ? (
                          <p className="text-primary font-bold">Dibatalkan</p>
                        ) : null}
                      </Checkbox>
                    </div>
                    <div className="pl-[4px] font-bold text-primary">
                      <span className="text-slate-300 font-normal">/</span>
                      {transaction_number}
                    </div>
                    <div className="pl-[4px] text-slate-500 flex items-center">
                      <span className="text-slate-300">/</span>
                      <AiOutlineClockCircle className="ml-[6px]" />{" "}
                      {dayjs(created_at).format("DD MMMM YYYY hh:mm A")}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold text-primary mr-[8px]">
                      Respon Sebelum
                    </div>
                    <div
                      className="w-[164px] h-[28px] rounded-md border-2 border-orange-300 
            text-orange-300 bg-warning text-xs flex items-center px-[10px] font-medium"
                    >
                      <AiOutlineClockCircle className="ml-[2px]" />
                      {dayjs(updated_at)
                        .add(1, "day")
                        .format("DD MMMM YYYY hh:mm A")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[19px] px-[32px]">
                <div className="flex">
                  <div className="w-[75px] h-[75px] rounded-lg border-2 mr-[24px] overflow-hidden relative">
                    <Image
                      src={`${API_URL}${pr_image}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-[216px] border-r-2 text-sm">
                    <div className="truncate pr-[32px] font-bold text-primary">
                      Resep Dokter
                    </div>
                    <button
                      onClick={() => onclickpr(id)}
                      className="text-center mt-[10px] w-[123px] h-[32px] border-secondary  hover:bg-hover-button rounded-md font-medium text-secondary border-2 text-xs"
                    >
                      Lihat Salinan Resep
                    </button>
                  </div>
                  <div className="ml-[32px] flex text-primary">
                    <div className="text-sm mr-[32px] w-[141px]">
                      <div className="font-semibold">Pembeli</div>
                      <div>{recipient}</div>
                    </div>
                    <div className="text-sm mr-[32px] w-[244px]">
                      <div className="font-semibold">Alamat</div>
                      <div>{address}</div>
                    </div>
                    <div className="text-sm mr-[32px]">
                      <div className="font-semibold">Kurir</div>
                      <div>{courier}</div>
                    </div>
                  </div>
                </div>

                {products.length < 1 ? null : (
                  <div className="mt-[19px] p-[16px] bg-slate-100 rounded-md flex justify-between">
                    <div className="font-bold text-primary">
                      Total Harga{" "}
                      <span className="text-xs font-normal text-slate-600">
                        ({products.length} Obat)
                      </span>
                    </div>
                    <div className="font-bold text-primary">
                      {rupiah(subtotal)}
                    </div>
                  </div>
                )}

                <div className="mt-[28px] flex justify-between">
                  <div className="flex text-primary">
                    <div className="flex items-center">
                      <div>
                        <BsFillChatDotsFill className="text-xl" />
                      </div>
                      <div className="ml-[10px] font-medium text-sm">
                        Chat Pembeli
                      </div>
                    </div>
                    <div className="flex items-center ml-[36px]">
                      <div className="h-[22px] w-[20px] overflow-hidden relative">
                        <Image
                          src={"/transaction2.png"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div
                        className="ml-[10px] font-medium text-sm cursor-pointer"
                        onClick={onOpenDetail}
                      >
                        Detail Pesanan
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm font-medium items-center">
                    {status == "menunggu konfirmasi" ? (
                      <>
                        <div
                          className="mr-[46px] text-primary"
                          onClick={onOpenReject}
                        >
                          Tolak Pesanan
                        </div>
                        <button
                          onClick={onOpenAccept}
                          className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                        >
                          Terima Pesanan
                        </button>
                      </>
                    ) : null}

                    {status == "diproses" ? (
                      <button
                        onClick={onOpenSend}
                        className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                      >
                        Minta Penjemputan
                      </button>
                    ) : null}
                    {status == "dikirim" ? (
                      <button className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]">
                        Lihat Rincian
                      </button>
                    ) : null}
                    {status == "selesai" ? (
                      <button className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]">
                        Lihat Rincian
                      </button>
                    ) : null}
                    {status == "dibatalkan" ? (
                      <button className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]">
                        Lihat Rincian
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* modal custom order resep */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenCustomOrder}
        onClose={onCloseCustomOrder}
      >
        <ModalOverlay />
        {tab === 0 ? (
          <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
            <ModalHeader>Tambah Obat</ModalHeader>
            <ModalCloseButton />

            <div>
              <ModalBody pb={6}>
                <div className="flex">
                  {/*yg bungkus */}
                  <div className="mr-10 items-center justify-center flex">
                    <img src={`${API_URL + pr_image}`} />
                  </div>
                  <div className="w-[450px]">
                    <div className="flex">
                      <FormControl mt={"3"}>
                        <FormLabel pt={2} fontSize="sm" w="175px">
                          No. Pemesanan
                        </FormLabel>
                        <Stack spacing={3}>
                          <Input
                            className="text-gray-400"
                            w="210px"
                            h="30px"
                            fontSize="xs"
                            placeholder="AB000569D"
                            onChange={(e) => handleChange(e, "no_pemesanan")}
                            name="no_pemesanan"
                            value={prescription_number}
                          />
                        </Stack>
                      </FormControl>

                      <FormControl mt={"3"} className="ml-7">
                        <FormLabel pt={2} fontSize="xs" w="175px">
                          Tgl. Pemesanan
                        </FormLabel>
                        <input
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                          className="h-[30px] px-3 mt-[3px] text-xs text-gray-400 w-[210px]"
                          type="string"
                          value={dayjs(created_at).format("DD-MM-YYYY")}
                        />
                      </FormControl>
                    </div>
                    <FormControl mt={"3"}>
                      <FormLabel pt={2} fontSize="xs" w="175px">
                        Nama Pasien
                      </FormLabel>
                      <Input
                        w="450px"
                        h="30px"
                        fontSize="xs"
                        placeholder="Masukkan nama pasien"
                        onChange={(e) => handleChange(e, "nama_pasien")}
                        name="nama_pasien"
                        value={input.nama_pasien}
                      />
                    </FormControl>
                    <FormControl mt={"3"}>
                      <FormLabel pt={2} fontSize="xs" w="175px">
                        Nama Dokter
                      </FormLabel>
                      <Input
                        w="450px"
                        h="30px"
                        fontSize="xs"
                        placeholder="Masukkan nama dokter"
                        onChange={(e) => handleChange(e, "nama_dokter")}
                        name="nama_dokter"
                        value={input.nama_dokter}
                      />
                    </FormControl>
                    <hr className="mt-5" />
                    <div className="mt-3 text-sm ">Tambah Obat</div>
                    <hr className="bg-purple-800 border-purple-800 rounded-xl border-2 max-w-[82px] mt-[2px]" />
                    <FormControl mt={"3"}>
                      <FormLabel pt={2} fontSize="xs" w="175px">
                        Nama Obat
                      </FormLabel>
                      <Select
                        placeholder="Masukkan nama obat"
                        options={nameOptions}
                        className="text-xs"
                        classNamePrefix="select"
                        onChange={(e) => handleChangeSelect(e, "name")}
                        name="name"
                        value={input.name}
                      />
                    </FormControl>
                    <div className="flex w-[450px]">
                      {/* <FormControl mt={"3"}>
                        <FormLabel pt={2} fontSize="xs">
                          Kuantitas
                        </FormLabel>
                        <div className="flex mr-2 text-xl">
                          <button
                            className="text-purple-600 mr-3"
                            onClick={decNum}
                          >
                            -
                          </button>
                          <div>
                            <input
                              className="w-6 pb-[6px] text-xs  focus:outline-none"
                              type="number"
                              onChange={(e) => handleChange(e, "quantity")}
                              value={input.quantity}
                            />
                          </div>

                          <button
                            disabled={
                              input.quantity >= input.name?.value?.total_stock
                            }
                            className="text-purple-600 "
                            onClick={incNum}
                          >
                            +
                          </button>
                        </div>
                      </FormControl> */}
                      <FormControl mt={"3"}>
                        <FormLabel pt={2} fontSize="xs" w="100px">
                          Kuantitas
                        </FormLabel>
                        <NumberInput
                          size="sm"
                          maxW="100px"
                          defaultValue={0}
                          min={0}
                          max={input?.name?.value?.total_stock}
                          value={quantity}
                          onChange={handleChangeQty}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>

                      <FormControl mt={"3"}>
                        <FormLabel pt={2} fontSize="xs" w="170px">
                          Satuan
                        </FormLabel>
                        <Input
                          w="170px"
                          h="30px"
                          fontSize="xs"
                          placeholder="cth. Strip"
                          onChange={(e) => handleChange(e, "unit")}
                          name="unit"
                          value={input.unit}
                        />
                      </FormControl>

                      <FormControl mt={"3"}>
                        <FormLabel pt={2} fontSize="xs" w="170px">
                          Dosis
                        </FormLabel>
                        <Input
                          w="170px"
                          h="30px"
                          fontSize="xs"
                          placeholder="cth. 3 x 1"
                          onChange={(e) => handleChange(e, "dosis")}
                          name="dosis"
                          value={input.dosis}
                        />
                      </FormControl>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="mt-5"
                        variant={"outline"}
                        colorScheme="purple"
                        size="xs"
                        disabled={
                          !input.nama_dokter ||
                          !input.nama_pasien ||
                          !input.name ||
                          !quantity ||
                          !input.unit ||
                          !input.dosis
                        }
                        onClick={tambahObatClick}
                      >
                        Tambahkan Obat
                      </Button>
                    </div>
                    <TableContainer>
                      <Table
                        mt={3}
                        variant="striped"
                        size="sm"
                        colorScheme="purple"
                      >
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Nama Obat</Th>
                            <Th>Kuantitas</Th>
                            <Th>Satuan</Th>
                            <Th>Dosis</Th>
                            <Th>Atur</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {dataResep?.map((data, index) => {
                            return (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{data.name}</Td>
                                <Td>{data.quantity}</Td>
                                <Td>{data.unit}</Td>
                                <Td>{data.dosis}</Td>
                                <Td>
                                  <Button
                                    colorScheme="purple"
                                    size="xs"
                                    onClick={() => {
                                      setdataResep(
                                        dataResep.filter((e) => e !== data)
                                      );
                                    }}
                                    className="mr-3"
                                    iconSpacing={0}
                                    leftIcon={<FaTrash />}
                                  ></Button>
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>

                        <Tfoot className="bg-red-300 pt-3"></Tfoot>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="purple"
                  mr={3}
                  disabled={
                    !input.nama_dokter || !input.nama_pasien || !dataResep[0]
                  }
                  onClick={() => setTab(1)}
                >
                  Selesai
                </Button>
              </ModalFooter>
            </div>
          </ModalContent>
        ) : null}
        {tab === 1 ? (
          <ModalContent maxW="600px" maxH="400px" pt={4}>
            <ModalHeader className="flex justify-center text-primary">
              Ringkasan Resep
            </ModalHeader>
            <ModalCloseButton />

            <div className="text-primary">
              <ModalBody>
                <div className="w-full pb-5 flex justify-between items-center text-primary">
                  <div className="flex text-[14px] gap-2">
                    <div className="font-bold">{recipient} / </div>
                    <div className=" font-bold pr-2">
                      {transaction_number} /
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        <AiOutlineClockCircle />
                      </span>
                      {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                    </div>
                  </div>
                </div>
                <div>
                  {dataResep?.map((data, index) => {
                    return (
                      <div key={index}>
                        <div className="font-bold mt-3 text-sm">
                          {data.name}
                        </div>
                        <div className="flex justify-between mt-1 w-5/12 text-xs text-primary">
                          <div>
                            {data.quantity} x {Rupiah(data.hargaJual)}
                          </div>
                          <div>{data.unit}</div>
                          <div>{data.dosis}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="ml-2 mt-6 font-bold text-sm flex justify-between">
                    <div> Total Harga</div>
                    <div>{Rupiah(subTotal())}</div>
                  </div>
                  <hr className="mt-5 rounded-lg" />
                </div>
              </ModalBody>

              <ModalFooter className="-mt-2">
                <Button
                  variant="outline"
                  colorScheme="purple"
                  fontSize="sm"
                  mr={3}
                  onClick={() => setTab(0)}
                >
                  Kembali
                </Button>
                <Button
                  colorScheme="purple"
                  fontSize="sm"
                  mr={3}
                  onClick={onSaveDataClick}
                >
                  Terima Pesanan
                </Button>
              </ModalFooter>
            </div>
          </ModalContent>
        ) : null}
        {tab === 5 ? (
          <ModalContent maxW="400px" maxH="800px" pt={4}>
            <ModalCloseButton />

            <div>
              <ModalBody className="flex items-center justify-center">
                <div className="flex items-center justify-center h-[300px]">
                  <img src={"/berhasilAddResep.svg"} />
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        ) : null}
      </Modal>

      {/* DETAIL PESANAN */}
      <Modal
        isOpen={isOpenDetail}
        scrollBehavior="inside"
        onClose={onCloseDetail}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex font-bold justify-center mt-10">
              <div className="text-center text-[20px] text-primary">
                Ringkasan Pesanan
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {products.length ? (
              <div className="w-full pb-5 justify-between items-center text-primary">
                <div className="flex text-[14px] gap-2 mb-[20px]">
                  <div className="font-bold">{recipient} / </div>
                  <div className=" font-bold pr-2">{transaction_number} /</div>
                  <div className="flex items-center gap-2">
                    <span>
                      <AiOutlineClockCircle />
                    </span>
                    {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                  </div>
                </div>

                {products.map((val, id) => {
                  return (
                    <div className="text-[14px] mb-[5px]" key={id}>
                      <div className="font-semibold">{val.name}</div>
                      <div className="flex text-slate-500">
                        <p className="w-[120px]">
                          {val.quantity} x {val.price}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="w-full mt-[37px] h-[32px] px-[10px] py-[8px] bg-slate-200 font-bold rounded-md flex items-center justify-between">
                  <div>
                    Total Harga{" "}
                    <span className="font-medium text-sm">
                      ({products.length} Obat){" "}
                    </span>
                  </div>
                  <div>{rupiah(subtotal)}</div>
                </div>
              </div>
            ) : (
              <div className="text-center font-medium my-[60px] text-primary">
                Pesanan untuk resep ini belum dibuat.
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseDetail}
              bgColor="gray.400"
              colorScheme="black"
            >
              Kembali
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* REJECT PESANAN */}
      <Modal
        isOpen={isOpenReject}
        scrollBehavior="inside"
        onClose={onCloseReject}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-center mt-10 font-bold">
              <div>
                <div className="text-center text-[20px] text-primary cursor-pointer">
                  Tolak Pesanan
                </div>
                <div className="text-center text-[14px] font-medium text-primary">
                  Apakah kamu yakin untuk menolak pesanan ini?
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {products.length ? (
              <div className="w-full pb-5 justify-between items-center text-primary">
                <div className="flex text-[14px] gap-2 mb-[20px]">
                  <div className="font-bold">{recipient} / </div>
                  <div className=" font-bold pr-2">{transaction_number} /</div>
                  <div className="flex items-center gap-2">
                    <span>
                      <AiOutlineClockCircle />
                    </span>
                    {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                  </div>
                </div>

                {products.map((val, id) => {
                  return (
                    <div className="text-[14px] mb-[5px]" key={id}>
                      <div className="font-semibold">{val.name}</div>
                      <div className="flex text-slate-500">
                        <p className="w-[120px]">
                          {val.quantity} x {val.price}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="w-full mt-[37px] h-[32px] px-[10px] py-[8px] bg-slate-200 font-bold rounded-md flex items-center justify-between">
                  <div>
                    Total Harga{" "}
                    <span className="font-medium text-sm">
                      ({products.length} Obat){" "}
                    </span>
                  </div>
                  <div>{rupiah(subtotal)}</div>
                </div>
              </div>
            ) : (
              <div className="text-center font-medium my-[60px] text-primary">
                Pesanan untuk resep ini belum dibuat.
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseReject}
              bgColor="gray.400"
              colorScheme="black"
              mr={3}
            >
              Kembali
            </Button>
            <Button
              bgColor="brand.secondary"
              colorScheme="black"
              onClick={() => {
                tolakPesanan();
                onCloseReject();
              }}
            >
              Tolak Pesanan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* TERIMA PESANAN */}
      <Modal
        isOpen={isOpenAccept}
        scrollBehavior="inside"
        onClose={onCloseAccept}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-center mt-10 font-bold">
              <div>
                <div className="text-center text-[20px] text-primary">
                  Terima Pesanan
                </div>
                <div className="text-center text-[14px] font-medium text-primary">
                  Stok akan berkurang secara otomatis setelah pesanan diterima.
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full pb-5 justify-between items-center text-primary">
              <div className="flex text-[14px] gap-2 mb-[20px]">
                <div className="font-bold">{recipient} / </div>
                <div className=" font-bold pr-2">{transaction_number} /</div>
                <div className="flex items-center gap-2">
                  <span>
                    <AiOutlineClockCircle />
                  </span>
                  {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>

              {products.map((val, id) => {
                return (
                  <div className="text-[14px] mb-[5px]" key={id}>
                    <div className="font-semibold">{val.name}</div>
                    <div className="flex text-slate-500">
                      <p className="w-[120px]">
                        {val.quantity} x {val.price}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="w-full mt-[37px] h-[32px] px-[10px] py-[8px] bg-slate-200 font-bold rounded-md flex items-center justify-between">
                <div>
                  Total Harga{" "}
                  <span className="font-medium text-sm">
                    ({products.length} Obat){" "}
                  </span>
                </div>
                <div>{rupiah(subtotal)}</div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseAccept}
              bgColor="gray.400"
              colorScheme="black"
              mr={3}
            >
              Kembali
            </Button>
            <Button
              bgColor="brand.secondary"
              colorScheme="black"
              onClick={() => {
                terimaPesanan();
                onCloseAccept();
              }}
            >
              Terima Pesanan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* KIRIM PESANAN */}
      <Modal
        isOpen={isOpenSend}
        scrollBehavior="inside"
        onClose={onCloseSend}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-center mt-10 font-bold">
              <div>
                <div className="text-center text-[20px] text-primary">
                  Kirim Pesanan
                </div>
                <div className="text-center text-[14px] font-medium text-primary">
                  Apakah kamu yakin untuk mengirim pesanan ini?
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full pb-5 justify-between items-center text-primary">
              <div className="flex text-[14px] gap-2 mb-[20px]">
                <div className="font-bold">{recipient} / </div>
                <div className=" font-bold pr-2">{transaction_number} /</div>
                <div className="flex items-center gap-2">
                  <span>
                    <AiOutlineClockCircle />
                  </span>
                  {dayjs(created_at).format("DD MMM YYYY, HH:mm WIB")}
                </div>
              </div>

              {products.map((val, id) => {
                return (
                  <div className="text-[14px] mb-[5px]" key={id}>
                    <div className="font-semibold">{val.name}</div>
                    <div className="flex text-slate-500">
                      <p className="w-[120px]">
                        {val.quantity} x {val.price}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="w-full mt-[37px] h-[32px] px-[10px] py-[8px] bg-slate-200 font-bold rounded-md flex items-center justify-between">
                <div>
                  Total Harga{" "}
                  <span className="font-medium text-sm">
                    ({products.length} Obat){" "}
                  </span>
                </div>
                <div>{rupiah(subtotal)}</div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseSend}
              bgColor="gray.400"
              colorScheme="black"
              mr={3}
            >
              Kembali
            </Button>
            <Button
              bgColor="brand.secondary"
              colorScheme="black"
              onClick={() => {
                kirimPesanan();
                onCloseSend();
              }}
            >
              Kirim Pesanan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* DETAIL PRESCRIPT PESANAN */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenPrescription}
        onClose={onClosePrescription}
      >
        <ModalOverlay />
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Salinan Resep</ModalHeader>
          <ModalCloseButton />

          <div>
            <ModalBody pb={6}>
              <div className="flex">
                {/*yg bungkus */}
                <div className="mr-10 items-center justify-center flex">
                  <img src={`${API_URL + pr_image}`} />
                </div>
                <div className="w-[450px]">
                  <div className="flex">
                    <FormControl mt={"3"}>
                      <FormLabel pt={2} fontSize="xs" w="175px">
                        No. Pemesanan
                      </FormLabel>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        className="h-[30px] px-3 pt-[6px] mt-[3px] text-xs text-gray-400 w-[210px]"
                        type="string"
                      >
                        {prescription_number}
                      </div>
                    </FormControl>

                    <FormControl mt={"3"} className="ml-7">
                      <FormLabel pt={2} fontSize="xs" w="175px">
                        Tgl. Pemesanan
                      </FormLabel>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        className="h-[30px] px-3 pt-[6px] mt-[3px] text-xs text-gray-400 w-[210px]"
                        type="string"
                      >
                        {dayjs(created_at).format("DD-MM-YYYY")}
                      </div>
                    </FormControl>
                  </div>
                  <FormControl mt={"3"}>
                    <FormLabel pt={2} fontSize="xs" w="175px">
                      Nama Pasien
                    </FormLabel>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      className="h-[30px] px-3 pt-[6px] mt-[3px] text-xs text-gray-400 w-[450px]"
                      type="string"
                    >
                      {dataPrescUser?.prescription?.nama_pasien}
                    </div>
                  </FormControl>
                  <FormControl mt={"3"}>
                    <FormLabel pt={2} fontSize="xs" w="175px">
                      Nama Dokter
                    </FormLabel>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      className="h-[30px] px-3 pt-[6px] mt-[3px] text-xs text-gray-400 w-[450px]"
                      type="string"
                    >
                      {dataPrescUser?.prescription?.nama_dokter}
                    </div>
                  </FormControl>
                  <hr className="mt-5" />
                  <div className="mt-3 text-sm ">List Obat</div>
                  <hr className="bg-purple-800 border-purple-800 rounded-xl border-2 max-w-[60px] mt-[2px]" />
                  <TableContainer className="mb-4">
                    <Table
                      mt={3}
                      variant="striped"
                      size="sm"
                      colorScheme="purple"
                    >
                      <Thead>
                        <Tr>
                          <Th>No.</Th>
                          <Th>Nama Obat</Th>
                          <Th>Kuantitas</Th>
                          <Th>Satuan</Th>
                          <Th>Dosis</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataPrescUser?.prescriptiond?.map((data, index) => {
                          return (
                            <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>{data.name}</Td>
                              <Td>{data.quantity}</Td>
                              <Td>{data.unit}</Td>
                              <Td>{data.dosis}</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminPrescriptionTransactionCard;
