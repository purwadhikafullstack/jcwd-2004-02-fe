import React, { Component } from "react";
import { useEffect, useState } from "react";
// import Select from "react-select";
import { DownloadIcon } from "@chakra-ui/icons";
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
  Select,
} from "@chakra-ui/react";
import axios from "axios";

import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";

function CustomOrder({ submitProduct }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(0);
  const [getData, setgetData] = useState({});

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [input, setinput] = useState({
    name: "",
    no_obat: "",
    no_BPOM: "",
    description: {},
    warning: "",
    usage: "",
    quantity: 0,
    unit: "",
    brand_id: 0,
    type_id: 0,
    hargaJual: 0,
    hargaBeli: 0,
    symptom: [],
    category: [],
    stock: 10,
    expired: "",
    is_deleted: 0,
  });

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

  // handle description
  const handleChangeDesc = (e, prop, param) => {
    let description = input.description;
    description[param] = e.target.value;
    setinput({ ...input, [prop]: description });
    console.log(e);
  };

  useEffect(() => {
    fetchComponentObat();
  }, []);

  // get data symptom, category, dll
  const fetchComponentObat = async () => {
    // let token = Cookies.get('token')
    try {
      let res = await axios.get(
        `${API_URL}/products/component`,
        input
        // {
        //   headers: {
        //     authorization: `bearer ${token}`,
        //   },
        // }
      );
      // console.log(res.data);
      setgetData(res.data);
      console.log("resdata", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // submit form
  const onSaveDataClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let insertData = {
      name: input.name,
      no_obat: input.no_obat,
      no_BPOM: input.no_BPOM,
      expired: input.expired,
      description: input.description,
      warning: input.warning,
      usage: input.usage,
      quantity: input.quantity,
      unit: input.unit,
      brand_id: input.brand_id.value,
      type_id: input.type_id.value,
      hargaJual: input.hargaJual,
      hargaBeli: input.hargaBeli,
      symptom: input.symptom.map((val) => val.value),
      category: input.category.map((val) => val.value),
      stock: input.stock,
    };
    console.log(insertData);
    // if (selectedImage[0] === null) {
    //   // agar coding berhenti, dikasih return (perlu diberi warning pakai toastify)
    //   return;
    // }

    formData.append("data", JSON.stringify(insertData));
    console.log("iniformdata", formData);
    try {
      await submitProduct(formData);
    } catch (error) {
      console.log(error);
    } finally {
      flushSync(() => {
        setTab(5);
      });
      setinput({
        name: "",
        no_obat: "",
        no_BPOM: "",
        description: {},
        warning: "",
        usage: "",
        quantity: 0,
        unit: "",
        brand_id: 0,
        type_id: 0,
        hargaJual: 0,
        hargaBeli: 0,
        symptom: [],
        category: [],
        stock: 10,
        expired: "",
        is_deleted: 0,
      });
      setTimeout(() => {
        setTab(0);
        onClose();
      }, 800);
    }
  };

  // untuk isi dari select dari database
  const nameOptions = getData.products?.map((val) => {
    return { value: val.id, label: val.name };
  });

  // increment utk kuantitas
  const incNum = () => {
    let count = parseInt(input.quantity) + 1;
    setinput({ ...input, quantity: count });
  };

  const decNum = () => {
    let count = parseInt(input.quantity) - 1;
    count = count < 1 ? 1 : count;
    setinput({ ...input, quantity: count });
  };

  // function menerima array isinya name dari

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
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Tambah Obat</ModalHeader>
          <ModalCloseButton />

          <div>
            <ModalBody pb={6}>
              <div className="flex">
                {/*yg bungkus */}
                <div className="bg-red-300 mr-10 items-center justify-center flex">
                  <img src={"/addProductSuccess.svg"} />
                </div>
                <div className="w-[450px]">
                  <div className="flex">
                    <FormControl mt={"3"} className="">
                      <FormLabel pt={2} fontSize="sm" w="175px">
                        No. Pemesanan
                      </FormLabel>
                      <Stack spacing={3}>
                        <Input
                          w="210px"
                          h="30px"
                          fontSize="xs"
                          placeholder="AB000569D"
                          onChange={(e) => handleChange(e, "unit")}
                          name="unit"
                          //   value={input.unit}
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
                        type="date"
                        onChange={(e) => handleChange(e, "expired")}
                        value={input.expired}
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
                      onChange={(e) => handleChange(e, "hargaJual")}
                      name="hargaJual"
                      //   value={input.hargaJual}
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
                      onChange={(e) => handleChange(e, "hargaJual")}
                      name="hargaJual"
                      //   value={input.hargaJual}
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
                      h="30px"
                      w="450px"
                      fontSize="xs"
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
                        placeholder="Strip"
                        onChange={(e) => handleChange(e, "hargaJual")}
                        name="hargaJual"
                        // value={input.hargaJual}
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
                        onChange={(e) => handleChange(e, "hargaJual")}
                        name="hargaJual"
                        // value={input.hargaJual}
                      />
                    </FormControl>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="mt-5"
                      variant={"outline"}
                      colorScheme="purple"
                      size="xs"
                    >
                      Tambahkan Obat
                    </Button>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
                Simpan
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>

    //   {/* success tab */}
    //   {tab === 5 ? (
    //     <div>
    //       <ModalBody className="flex items-center justify-center" h="600px">
    //         <div className="flex items-center justify-center">
    //           <img src={"/addProductSuccess.svg"} />
    //         </div>
    //       </ModalBody>
    //     </div>
    //   ) : null}
  );
}

export default CustomOrder;
