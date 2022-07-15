import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
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
} from "@chakra-ui/react";
import axios from "axios";
import { flushSync } from "react-dom";
import { DateConverter } from "../helpers";
import { toast } from "react-toastify";

function AdminPrescriptionTransactionCard({ data }) {
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
  } = data;

  const [tab, setTab] = useState(0);
  // get list nama obat
  const [productList, setproductList] = useState([]);
  const [input, setinput] = useState({
    nama_pasien: "",
    nama_dokter: "",
    // tgl pemesanan

    // kuantitas,
    quantity: 0,
    // satuan
    unit: "",
    // dosis
    dosis: "",
    // nama obat
    name: "",
  });
  const [dataResep, setdataResep] = useState([]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const {
    isOpen: isOpenCustomOrder,
    onOpen: onOpenCustomOrder,
    onClose: onCloseCustomOrder,
  } = useDisclosure();

  // handle
  const handleChange = (e, prop) => {
    setinput({ ...input, [prop]: e.target.value });
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
      console.log("resdata", res.data);
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
  // add obat
  const tambahObatClick = async (e) => {
    // fitur tambahin obat
    console.log(input, "inpout");
    // data obat
    // console.log(input.name.value, "name");
    // console.log(input.quantity, "quantity");
    // console.log(input.dosis, "dosis");
    // console.log(input.unit, "unit");
    setdataResep([
      ...dataResep,
      {
        ...input.name.value,
        quantity: input.quantity,
        dosis: input.dosis,
        unit: input.unit,
      },
    ]);
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
    console.log(insertData);

    try {
      await submitProduct(insertData);
    } catch (error) {
      console.log(error);
    } finally {
      flushSync(() => {
        setTab(5);
      });
      setinput({
        // prescription_number: 0,
        nama_pasien: "",
        nama_dokter: "",
      });
      setdataResep({ quantity: 0, unit: "", dosis: "", name: null });
      setTimeout(() => {
        // setTab(0);
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

  const incNum = () => {
    let count = parseInt(input.quantity) + 1;
    // count = count >= productList.total_stock ? productList.total_stock : count;
    setinput({ ...input, quantity: count });
  };

  const decNum = () => {
    let count = parseInt(input.quantity) - 1;
    count = count < 1 ? 1 : count;
    setinput({ ...input, quantity: count });
  };

  console.log(input, "input");

  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < dataResep.length; i++) {
      const qty = dataResep[i].quantity;
      const harga = dataResep[i].hargaJual;
      subTotal = subTotal + qty * harga;
    }
    return subTotal;
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
                      src={`${API_URL}/${pr_image}`}
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
                      <div className="ml-[10px] font-medium text-sm">
                        Detail Pesanan
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm font-medium items-center">
                    <div className="mr-[46px] text-primary">Tolak Pesanan</div>
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
                      <AiOutlineClockCircle className="ml-[6px]" /> 10 Jan 2022,
                      10:45 WIB
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
                      <AiOutlineClockCircle className="ml-[2px]" /> 10 Jan 2022,
                      10:45 WIB
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[19px] px-[32px]">
                <div className="flex">
                  <div className="w-[75px] h-[75px] rounded-lg border-2 mr-[24px]"></div>
                  <div className="w-[216px] border-r-2 text-sm">
                    <div className="truncate pr-[32px] font-bold text-primary">
                      Resep Dokter
                    </div>
                    <button className="text-center mt-[10px] w-[123px] h-[32px] border-secondary  hover:bg-hover-button rounded-md font-medium text-secondary border-2 text-xs">
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

                <div className="mt-[19px] p-[16px] bg-slate-100 rounded-md flex justify-between">
                  <div className="font-bold text-primary">
                    Total Harga
                    <span className="text-xs font-normal text-slate-600">
                      (4 Obat)
                    </span>
                  </div>
                  <div className="font-bold text-primary">Rp 46.000</div>
                </div>

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
                      <div className="ml-[10px] font-medium text-sm">
                        Detail Pesanan
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm font-medium items-center">
                    {status == "menunggu konfirmasi" ? (
                      <>
                        <div className="mr-[46px] text-primary">
                          Tolak Pesanan
                        </div>
                        <button
                          disabled
                          className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                        >
                          Terima Pesanan
                        </button>
                      </>
                    ) : null}

                    {status == "diproses" ? (
                      <button
                        disabled
                        className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                      >
                        Minta Penjemputan
                      </button>
                    ) : null}
                    {status == "dikirim" ? (
                      <button
                        disabled
                        className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                      >
                        Lihat Rincian
                      </button>
                    ) : null}
                    {status == "selesai" ? (
                      <button
                        disabled
                        className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                      >
                        Lihat Rincian
                      </button>
                    ) : null}
                    {status == "dibatalkan" ? (
                      <button
                        disabled
                        className="text-white bg-slate-400 w-[156px] rounded-md h-[32px]"
                      >
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
                      <FormControl mt={"3"} className="">
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
                    <FormControl mt={"3"} className="">
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
                    <FormControl mt={"3"} className="">
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
                    <FormControl mt={"3"} className="">
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
                      <FormControl mt={"3"} className="">
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
                          <div className="">
                            <input
                              className="w-6 pb-[6px] text-xs "
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
                      </FormControl>

                      <FormControl mt={"3"} className="">
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

                      <FormControl mt={"3"} className="">
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
                          !input.quantity ||
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
                                      clickDelete(index);
                                    }}
                                    className="mr-3"
                                  >
                                    Hapus
                                  </Button>
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
                            {data.quantity} x {data.hargaJual}
                          </div>
                          <div>{data.unit}</div>
                          <div>{data.dosis}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="ml-2 mt-6 font-bold text-sm flex justify-between">
                    <div> Total Harga</div>
                    <div>Rp. {subTotal()}</div>
                  </div>
                  <hr className="mt-5 rounded-lg" />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outline"
                  colorScheme="purple"
                  mr={3}
                  onClick={() => setTab(0)}
                >
                  Kembali
                </Button>
                <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
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
    </>
  );
}

export default AdminPrescriptionTransactionCard;
