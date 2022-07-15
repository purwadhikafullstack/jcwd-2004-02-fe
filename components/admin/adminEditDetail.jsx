import React, { Component } from "react";
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
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";

function AdminEditDetail({
  submitProductEdit,
  isOpen,
  onClose,
  setinputEdit,
  inputEdit,
}) {
  const [tab, setTab] = useState(0);
  const [getData, setgetData] = useState({});

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // handle
  const handleChange = (e, prop) => {
    setinputEdit({ ...inputEdit, [prop]: e.target.value });
  };

  // handle select
  // individu -> e.value, multi -> e
  const handleChangeSelect = (e, prop) => {
    setinputEdit({ ...inputEdit, [prop]: e });
    console.log(e, "ini");
  };

  // handle description
  const handleChangeDesc = (e, prop, param) => {
    let description = inputEdit.description;
    description[param] = e.target.value;
    setinputEdit({ ...inputEdit, [prop]: description });
    console.log(e);
  };

  // memanggil fetch komponen obat dan obat yang ditunjuk
  useEffect(() => {
    fetchComponentObat();
  }, []);

  // get data symptom, category, dll
  const fetchComponentObat = async () => {
    // let token = Cookies.get('token')
    try {
      let res = await axios.get(
        `${API_URL}/products/component`
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
    let insertData = {
      name: inputEdit.name,
      no_obat: inputEdit.no_obat,
      no_BPOM: inputEdit.no_BPOM,
      description: inputEdit.description,
      warning: inputEdit.warning,
      usage: inputEdit.usage,
      brand_id: inputEdit.brand_id.value,
      type_id: inputEdit.type_id.value,
      symptom: inputEdit.symptom.map((val) => val.value),
      category: inputEdit.category.map((val) => val.value),
      unit: inputEdit.unit,
      hargaJual: inputEdit.hargaJual,
      hargaBeli: inputEdit.hargaBeli,
    };
    console.log(insertData, "insertdata");
    try {
      await submitProductEdit(insertData);
    } catch (error) {
      console.log(error);
    } finally {
      flushSync(() => {
        setTab(5);
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
                  <div className="mx-2 font-semibold  ">{">"}</div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
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
                    value={inputEdit.name}
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
                    value={inputEdit.no_obat}
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
                    value={inputEdit.no_BPOM}
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
                      value={inputEdit.category}
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
                      value={inputEdit.brand_id}
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
                      value={inputEdit.type_id}
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
                      value={inputEdit.symptom}
                    />
                  </Stack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => setTab(1)}>
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
                  <div className="mx-2  font-semibold text-purple-600  ">
                    {">"}
                  </div>

                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
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
                    value={inputEdit.description["indikasi / kegunaan"]}
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
                    value={inputEdit.description["Kandungan / Komposisi"]}
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
                    value={inputEdit.description["Kemasan"]}
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
                    value={inputEdit.description["Golongan"]}
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
                    value={inputEdit.description["Butuh Resep"]}
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
                    value={inputEdit.description["Cara Penyimpanan"]}
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
                    value={inputEdit.description["Principal"]}
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
                    value={inputEdit.description["Nomor Ijin Edar (NIE)"]}
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
                    value={inputEdit.warning}
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
                    value={inputEdit.usage}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setTab(0)} mr={3}>
                  Kembali
                </Button>
                <Button colorScheme="purple" onClick={() => setTab(2)} mr={3}>
                  Lanjutkan
                </Button>
              </ModalFooter>
            </div>
          ) : null}
          {tab === 2 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    1
                  </div>
                  <div className="text-gray-400"> Detail Obat</div>
                  <div className="mx-2 font-semibold  ">{">"}</div>

                  <div className="rounded-full w-5 bg-gray-400  text-center text-white mr-2">
                    2
                  </div>
                  <div className="text-gray-400">Keterangan Obat</div>

                  <div className="mx-2  font-semibold  ">{">"}</div>

                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    3
                  </div>
                  <div className="">Detail Kuantitas & Harga</div>
                </div>

                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Satuan
                  </FormLabel>
                  <Stack spacing={3}>
                    <Input
                      w="226px"
                      h="40px"
                      fontSize="sm"
                      placeholder="Masukkan satuan"
                      onChange={(e) => handleChange(e, "unit")}
                      name="unit"
                      value={inputEdit.unit}
                    />
                  </Stack>
                </FormControl>

                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Barang (Rp)
                  </FormLabel>
                  <Input
                    type="number"
                    w="226px"
                    h="40px"
                    fontSize="sm"
                    placeholder="Masukkan nilai barang (Rp)"
                    onChange={(e) => handleChange(e, "hargaBeli")}
                    name="hargaBeli"
                    value={inputEdit.hargaBeli}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Jual (Rp)
                  </FormLabel>
                  <Input
                    type="number"
                    w="226px"
                    h="40px"
                    fontSize="sm"
                    placeholder="Masukkan nilai jual (Rp)"
                    onChange={(e) => handleChange(e, "hargaJual")}
                    name="hargaJual"
                    value={inputEdit.hargaJual}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => setTab(1)} mr={3}>
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
