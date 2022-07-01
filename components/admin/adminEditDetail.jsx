import React, { Component } from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
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
} from "@chakra-ui/react";
import axios from "axios";

import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";

function AdminEditDetail({ submitProduct2 }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(0);
  const [getData, setgetData] = useState({});
  const [detailObat, setDetailObat] = useState({});

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [input, setinput] = useState({
    name: detailObat.name,
    no_obat: detailObat.no_obat,
    no_BPOM: detailObat.no_bpom,
    category: [],
    brand_id: detailObat.brand_id,
    type_id: detailObat.type_id,
    symptom: [],

    description: {},
    warning: detailObat.warning,
    usage: detailObat.usage,
  });
  console.log(detailObat, "hahahah");
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
    fetchObat();
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

  const fetchObat = async () => {
    // let token = Cookies.get('token')
    try {
      let res = await axios.get(
        `${API_URL}/products/getselectedproduct/17`,
        input

        // {
        //   headers: {
        //     authorization: `bearer ${token}`,
        //   },
        // }
      );
      // console.log(res.data);
      // console.log("resdata", res.data);
      setDetailObat(res.data);

      // setDetailObat([...res.data]);
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
      description: input.description,
      warning: input.warning,
      usage: input.usage,
      brand_id: input.brand_id.value,
      type_id: input.type_id.value,
      symptom: input.symptom.map((val) => val.value),
      category: input.category.map((val) => val.value),
    };
    console.log(insertData);

    formData.append("data", JSON.stringify(insertData));
    console.log("iniformdata", formData);
    try {
      await submitProduct2(formData);
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
        category: [],
        brand_id: 0,
        type_id: 0,
        symptom: [],

        description: {},
        warning: "",
        usage: "",
      });
      setTimeout(() => {
        setTab(0);
        onClose();
      }, 800);
    }
  };

  // untuk isi dari select dari database
  const categoryOptions = getData.category?.map((val) => {
    return { value: val.id, label: val.name };
  });

  const symptomOptions = getData.symptom?.map((val) => {
    return { value: val.id, label: val.name };
  });

  const brandOptions = getData.brand?.map((val) => {
    return { value: val.id, label: val.name };
  });

  const typeOptions = getData.type?.map((val) => {
    return { value: val.id, label: val.name };
  });

  return (
    <>
      <Button leftIcon={<DownloadIcon />} colorScheme="purple" onClick={onOpen}>
        Edit Produk
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Edit Detail Obat</ModalHeader>
          <ModalCloseButton />
          {tab === 0 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    1
                  </div>
                  <div className="font-semibold"> Detail Obat</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">
                    {">"}
                  </div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    2
                  </div>
                  <div className="text-gray-400">Keterangan Obat</div>
                </div>

                <FormControl className="flex" pt={2}>
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Nama Obat
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="sm"
                    ref={initialRef}
                    placeholder="Masukkan nama obat"
                    onChange={(e) => handleChange(e, "name")}
                    name="name"
                    value={input.name}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    No. Obat
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="sm"
                    placeholder="Masukkan no. obat"
                    onChange={(e) => handleChange(e, "no_obat")}
                    name="no_obat"
                    value={input.no_obat}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    No. BPOM
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="sm"
                    placeholder="Masukkan no. BPOM"
                    onChange={(e) => handleChange(e, "no_BPOM")}
                    name="no_BPOM"
                    value={input.no_BPOM}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Kategori
                  </FormLabel>
                  <Stack spacing={3} className="min-w-[160px]">
                    <Select
                      placeholder="Pilih..."
                      options={categoryOptions}
                      isMulti
                      className="basic-multi-select "
                      classNamePrefix="select"
                      onChange={(e) => handleChangeSelect(e, "category")}
                      name="category"
                      value={input.category}
                    />
                  </Stack>
                </FormControl>

                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Merk Obat
                  </FormLabel>
                  <Stack spacing={3} className="min-w-[160px]">
                    <Select
                      w="141px"
                      size="md"
                      variant="outline"
                      fontSize="sm"
                      placeholder="Pilih..."
                      options={brandOptions}
                      onChange={(e) => handleChangeSelect(e, "brand_id")}
                      value={input.brand_id}
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Tipe Obat
                  </FormLabel>
                  <Stack spacing={3} className="min-w-[160px]">
                    <Select
                      w="141px"
                      size="md"
                      variant="outline"
                      fontSize="sm"
                      placeholder="Pilih..."
                      options={typeOptions}
                      onChange={(e) => handleChangeSelect(e, "type_id")}
                      value={input.type_id}
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Keluhan
                  </FormLabel>
                  <Stack spacing={3} className="min-w-[160px]">
                    <Select
                      isMulti
                      name="colors"
                      placeholder="Pilih..."
                      options={symptomOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleChangeSelect(e, "symptom")}
                      value={input.symptom}
                    />
                  </Stack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="purple"
                  mr={3}
                  disabled={false}
                  onClick={() => setTab(1)}
                >
                  Lanjutkan
                </Button>
              </ModalFooter>
            </div>
          ) : null}

          {/* second tab */}
          {tab === 1 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    1
                  </div>
                  <div className="text-gray-400"> Detail Obat</div>
                  <div className="mx-2  font-semibold  ">{">"}</div>
                  <div className="rounded-full w-5  bg-purple-600 text-center text-white mr-2">
                    2
                  </div>
                  <div className="font-semibold ">Keterangan Obat</div>
                </div>
                <FormControl mt={10} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Indikasi / Kegunaan
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Indikasi / Kegunaan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "indikasi / kegunaan")
                    }
                    value={input.description["indikasi / kegunaan"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kandungan / Komposisi
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Kandungan / Komposisi"
                    onChange={(e) =>
                      handleChangeDesc(
                        e,
                        "description",
                        "Kandungan / Komposisi"
                      )
                    }
                    value={input.description["Kandungan / Komposisi"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kemasan
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Jenis Kemasan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Kemasan")
                    }
                    value={input.description["Kemasan"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Golongan
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Golongan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Golongan")
                    }
                    value={input.description["Golongan"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Butuh Resep
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Ya/Tidak"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Butuh Resep")
                    }
                    value={input.description["Butuh Resep"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Cara Penyimpanan
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Cara Penyimpanan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Cara Penyimpanan")
                    }
                    value={input.description["Cara Penyimpanan"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Principal
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Principal"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Principal")
                    }
                    value={input.description["Principal"]}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nomor Ijin Edar (NIE)
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Nomor Ijin Edar (NIE)"
                    onChange={(e) =>
                      handleChangeDesc(
                        e,
                        "description",
                        "Nomor Ijin Edar (NIE)"
                      )
                    }
                    value={input.description["Nomor Ijin Edar (NIE)"]}
                  />
                </FormControl>

                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Warning
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Warning"
                    onChange={(e) => handleChange(e, "warning")}
                    value={input.warning}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Usage
                  </FormLabel>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="w-1/2 text-sm pt-2 ml-4 pl-3"
                    placeholder="Masukkan Usage"
                    onChange={(e) => handleChange(e, "usage")}
                    value={input.usage}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => setTab(0)} mr={3}>
                  Kembali
                </Button>
                <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
                  Simpan
                </Button>
              </ModalFooter>
            </div>
          ) : null}

          {/* success tab */}
          {tab === 5 ? (
            <div>
              <ModalBody className="flex items-center justify-center" h="600px">
                <div className="flex items-center justify-center">
                  <img src={"/addProductSuccess.svg"} />
                </div>
              </ModalBody>
            </div>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminEditDetail;
