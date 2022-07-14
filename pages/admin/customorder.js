import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
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
  // Select,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";
import { DateConverter } from "../../helpers";
import { toast } from "react-toastify";

function CustomOrder() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(0);
  // get list nama obat
  const [productList, setproductList] = useState([]);
  // get picture
  const [prescription, setprescription] = useState();

  // input umum
  const [input, setinput] = useState({
    prescription_number: 0,
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
  console.log(prescription, "presc");
  useEffect(() => {
    fetchComponentObat();
    fetchPrescription();
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

  const fetchPrescription = async () => {
    try {
      let res = await axios.get(`${API_URL}/transaction/pic/36`);
      setprescription(res.data);
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
    // {name, quantity, unit, dosis}
    // data obat
    console.log(input.name.value, "name");
    console.log(input.quantity, "quantity");
    console.log(input.dosis, "dosis");
    console.log(input.unit, "unit");
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
        setTab(0);
        onClose();
      }, 1000);
    }
  };

  const submitProduct = async (values) => {
    try {
      await axios.put(`${API_URL}/transaction/submit/36`, values);
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
  // utk ambil gambar
  const presc = prescription
    ? `${API_URL + prescription[0].image}`
    : `../no_pic.png`;

  const no_pemesanan = prescription
    ? prescription[0].prescription_number
    : null;

  const tanggalPesan = prescription ? prescription[0].created_at : null;
  console.log(tanggalPesan);

  // utk ambil created
  // const createdDate = prescription[0].created_at;

  // increment utk kuantitas
  // quantity diganti dgn input yg di mau
  const incNum = () => {
    let count = parseInt(input.quantity) + 1;
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
      <Button colorScheme="purple" onClick={onOpen}>
        Buat Salinan Resep
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
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
                    <img src={presc} />
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
                            value={no_pemesanan}
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
                          value={"02-07-2020"}
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

                          <button className="text-purple-600 " onClick={incNum}>
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
            <ModalHeader className="flex justify-center">
              Ringkasan Resep
            </ModalHeader>
            <ModalCloseButton />

            <div>
              <ModalBody>
                <div>
                  {dataResep?.map((data, index) => {
                    return (
                      <div key={index}>
                        <div className="font-semibold mt-3 text-sm">
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
                  <div className="ml-2 mt-4 font-bold text-sm flex justify-between">
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

    //   {/* success tab */}
  );
}

export default CustomOrder;
