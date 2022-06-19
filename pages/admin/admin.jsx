import React, { Component } from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
// import CreatableSelect from 'react-select/creatable';
// import { ActionMeta, OnChangeValue } from 'react-select';
import Calendar from "react-calendar";
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
  // Select,
  HStack,
  useNumberInput,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../helpers";

function ModalInputAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [getData, setgetData] = useState({});
  // utk gambar
  const [selectedFiles, setSelectedFiles] = useState([]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [input, setinput] = useState({
    name: "",
    no_obat: "",
    no_BPOM: "",
    price: 0,
    description: {},
    warning: "",
    usage: "",
    quantity: 0,
    unit: "",
    expired_at: "", // belom tau cara masukin ke tabel stok
    brand_id: 0,
    type_id: 0,
    hargaJual: 0,
    hargaBeli: 0,
    is_deleted: 0,
    symptom: [],
    category: [],
    stock: 0,
    expired: "",
  });

  // handle
  const handleChange = (e, prop) => {
    setinput({ ...input, [prop]: e.target.value });
  };

  // individu -> e.value, multi -> e
  const handleChangeSelect = (e, prop) => {
    setinput({ ...input, [prop]: e });
    console.log(e);
  };

  const handleChangeDesc = (e, prop, param) => {
    let description = input.description;
    description[param] = e.target.value;
    setinput({ ...input, [prop]: description });
    console.log(e);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

  // const handleImageChange = (e) => {
  //   console.log(e.target.files[0]);
  //   if (e.target && e.target.files[0]) {
  //     setselectedImage({
  //       ...selectedImage,
  //       file: e.target.files[0],
  //       filePreview: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };
  console.log(input);

  // fetch
  const fetchData = async () => {
    let res = await axios.get(
      `${API_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`
    );
    setData(res.data);
    settotalData(parseInt(res.headers["x-total-count"]));
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
    } catch (error) {
      console.log(error);
    }
  };

  // submit
  const onAddDataClick = async () => {
    console.log(input);
    let dataInputFinal = input;
    dataInputFinal.symptom = dataInputFinal.symptom.map((val) => val.value);
    console.log(dataInputFinal);
    // try {
    //   await axios.post(`${API_URL}/products`, input);
    //   fetchData();
    //   setOpen(false);
    //   setinput({
    //     name: "",
    //     no_obat: "",
    //     no_BPOM: "",
    //     price: 0,

    //     description: {
    //       "indikasi/kegunaan":
    //         "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    //     },
    //     warning: {
    //       "indikasi/kegunaan":
    //         "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    //     },
    //     usage: {
    //       "indikasi/kegunaan":
    //         "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    //     },
    //     quantity: 0,
    //     unit: "",
    //     expired_at: "",
    //     brand_id: 0,
    //     type_id: 0,
    //     hargaJual: 0,
    //     hargaBeli: 0,
    //     is_deleted: 0,
    //     symptom: [],
    //     category: [],
    //     stock: 0,
    //     expired: "",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onSaveDataClick2 = async () => {
    // let token = Cookies.get("token");
    const formData = new FormData();

    formData.append("products", selectedImage.file);

    try {
      let res = await axios.post(
        `${API_URL}/products`,
        formData
        // ,{
        //     headers: {
        //         authorization: `bearer ${token}`
        //     }
        // }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveDataClick = async () => {
    try {
      let formData = new FormData();
      let insertData = {
        name: "",
        no_obat: "",
        no_BPOM: "",
        price: 0,
        description: {},
        warning: "",
        usage: "",
        quantity: 0,
        unit: "",
        expired_at: "", // belom tau cara masukin ke tabel stok
        brand_id: 0,
        type_id: 0,
        hargaJual: 0,
        hargaBeli: 0,
        symptom: [],
        category: [],
        stock: 0,
        expired: "",
      };

      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(`products`, selectedImage[i]);
      }
      formData.append(
        "data",
        insertData.name,
        insertData.no_obat,
        insertData.no_BPOM,
        insertData.price,
        insertData.description,
        insertData.warning,
        insertData.usage,
        insertData.quantity,
        insertData.unit,
        insertData.expired_at,
        insertData.brand_id,
        insertData.type_id,
        insertData.hargaJual,
        insertData.hargaBeli,
        insertData.symptom,
        insertData.category,
        insertData.stock,
        insertData.expired
      );
      console.log("iniformdata", formData);
      await submitPostParent(formData);
      setInputCaption("");
    } catch (error) {
      console.log(error);
    } finally {
      onUploadclose();
    }
  };

  // untuk +- input jumlah kuantitas barang
  // const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  //   useNumberInput({
  //     step: 1,
  //     defaultValue: 1,
  //     min: 1,
  //     precision: 0,
  //   });

  // const inc = getIncrementButtonProps();
  // const dec = getDecrementButtonProps();
  // const inputPlusMinus = getInputProps();

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

  const customStyles = {
    // option: (provided, state) => ({
    //   ...provided,
    //   borderBottom: "1px dotted pink",
    //   color: state.isSelected ? "red" : "blue",
    //   padding: 20,
    // }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 300,
    }),
    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = "opacity 300ms";

    //   return { ...provided, opacity, transition };
    // },
  };

  // uploat foto

  // incremen
  // const [num, setNum] = useState(0)
  // const incNum = () => {
  //   setNum(num + 1);
  // };
  // const decNum = () => {
  //   if (num > 0) {
  //     setNum(num - 1);
  //   } else {
  //     setNum(0);
  //   }
  // };

  const incNum = () => {
    let count = parseInt(input.quantity) + 1;
    setinput({ ...input, quantity: count });
  };

  const decNum = () => {
    let count = parseInt(input.quantity) - 1;
    count = count < 1 ? 1 : count;
    setinput({ ...input, quantity: count });
  };

  // handleChangeNum;

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Tambah Produk
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
          {tab === 0 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    1
                  </div>
                  <div className="font-semibold"> Detail Obat</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    2
                  </div>
                  <div className="text-gray-400">Keterangan Obat</div>
                  <div className="mx-2  font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
                  <div className="mx-2  font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    4
                  </div>
                  <div className="text-gray-400">Upload Foto</div>
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
                <FormControl mt={"1.5"} className="flex">
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
                <FormControl mt={"1.5"} className="flex">
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
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Kategori
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="md"
                      variant="outline"
                      fontSize="sm"
                      placeholder="Pilih..."
                      options={categoryOptions}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => handleChangeSelect(e, "category")}
                      name="category"
                      value={input.category}
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Tgl. Kadaluwarsa
                  </FormLabel>
                  <Stack spacing={3}>
                    <div>
                      {/* <Calendar onChange={onChangeCal} value={valueCal} /> */}
                      <input
                        type="date"
                        onChange={(e) => handleChange(e, "expired_at")}
                        value={input.expired_at}
                      />
                    </div>
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Merk Obat
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="md"
                      variant="outline"
                      fontSize="sm"
                      placeholder="Pilih..."
                      options={brandOptions}
                      onChange={(e) => handleChangeSelect(e.value, "brand_id")}
                      // value={input.brand}
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Tipe Obat
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="md"
                      variant="outline"
                      fontSize="sm"
                      placeholder="Pilih..."
                      options={typeOptions}
                      onChange={(e) => handleChangeSelect(e.value, "type_id")}
                      // value={input.type}
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Keluhan
                  </FormLabel>
                  <Stack spacing={3}>
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
                  <div className="mx-2  font-semibold  ">></div>
                  <div className="rounded-full w-5  bg-purple-600 text-center text-white mr-2">
                    2
                  </div>
                  <div className="font-semibold ">Keterangan Obat</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    4
                  </div>
                  <div className="text-gray-400">Upload Foto</div>
                </div>
                <div className="text-lg font-bold">Deskripsi</div>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Indikasi / Kegunaan
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Indikasi / Kegunaan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "indikasi / kegunaan")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kandungan / Komposisi
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Kandungan / Komposisi"
                    onChange={(e) =>
                      handleChangeDesc(
                        e,
                        "description",
                        "Kandungan / Komposisi"
                      )
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kemasan
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Jenis Kemasan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Kemasan")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Golongan
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Golongan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Golongan")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Butuh Resep
                  </FormLabel>
                  <Input
                    className="w-1/2 text-sm pt-2"
                    placeholder="Ya/Tidak"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Butuh Resep")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Cara Penyimpanan
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Cara Penyimpanan"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Cara Penyimpanan")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Principal
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Principal"
                    onChange={(e) =>
                      handleChangeDesc(e, "description", "Principal")
                    }
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nomor Ijin Edar (NIE)
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Nomor Ijin Edar (NIE)"
                    onChange={(e) =>
                      handleChangeDesc(
                        e,
                        "description",
                        "Nomor Ijin Edar (NIE)"
                      )
                    }
                  />
                </FormControl>

                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Warning
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
                    placeholder="Masukkan Warning"
                    onChange={(e) => handleChange(e, "warning")}
                    value={input.warning}
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="md" w="175px">
                    Usage
                  </FormLabel>
                  <textarea
                    className="w-1/2 text-sm pt-2"
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
                <Button colorScheme="purple" mr={3} onClick={() => setTab(2)}>
                  Lanjutkan
                </Button>
              </ModalFooter>
            </div>
          ) : null}
          {/* third tab */}
          {tab === 2 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    1
                  </div>
                  <div className="text-gray-400"> Detail Obat</div>
                  <div className="mx-2 font-semibold  ">></div>

                  <div className="rounded-full w-5 bg-gray-400  text-center text-white mr-2">
                    2
                  </div>
                  <div className="font-semibold text-gray-400">
                    Keterangan Obat
                  </div>

                  <div className="mx-2  font-semibold  ">></div>

                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    3
                  </div>
                  <div className="">Detail Kuantitas & Harga</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    4
                  </div>
                  <div className="text-gray-400">Upload Foto</div>
                </div>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kuantitas
                  </FormLabel>
                  <Stack spacing={3}>
                    {/* <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Box"
                    /> */}
                    <div className="flex mr-2">
                      <button className="text-purple-600 mr-3" onClick={decNum}>
                        -
                      </button>
                      <div>
                        <input
                          className="w-7 text-sm"
                          type="number"
                          onChange={(e) => handleChange(e, "quantity")}
                          value={input.quantity}
                        />
                      </div>

                      <button className="text-purple-600 " onClick={incNum}>
                        +
                      </button>
                    </div>
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Satuan
                  </FormLabel>
                  <Stack spacing={3}>
                    {/* <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Box"
                    /> */}
                    <Input
                      w="226px"
                      h="32px"
                      fontSize="xs"
                      placeholder="Masukkan satuan"
                      onChange={(e) => handleChange(e, "unit")}
                      name="unit"
                      value={input.unit}
                    />
                  </Stack>
                </FormControl>

                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Barang (Rp)
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="xs"
                    placeholder="Masukkan nilai barang (Rp)"
                    onChange={(e) => handleChange(e, "hargaBeli")}
                    name="hargaBeli"
                    value={input.hargaBeli}
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Jual (Rp)
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="xs"
                    placeholder="Masukkan nilai jual (Rp)"
                    onChange={(e) => handleChange(e, "hargaJual")}
                    name="hargaJual"
                    value={input.hargaJual}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => setTab(1)} mr={3}>
                  Kembali
                </Button>
                <Button colorScheme="purple" onClick={() => setTab(3)} mr={3}>
                  Lanjutkan
                </Button>
              </ModalFooter>
            </div>
          ) : null}

          {/* fourth tab */}
          {tab === 3 ? (
            <div>
              <ModalBody pb={6}>
                <div className="flex mb-4 text-sm">
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    1
                  </div>
                  <div className="text-gray-400"> Detail Obat</div>
                  <div className="mx-2 font-semibold  ">></div>

                  <div className="rounded-full w-5 bg-gray-400  text-center text-white mr-2">
                    2
                  </div>
                  <div className="font-semibold text-gray-400">
                    Keterangan Obat
                  </div>

                  <div className="mx-2  font-semibold  ">></div>

                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    4
                  </div>
                  <div className="">Upload Foto</div>
                </div>

                <FormControl mt={"1.5"} className="flex">
                  <Stack spacing={3}>
                    <div className="flex flex-col items-center justify-center mx-20">
                      <input
                        type="file"
                        id="file"
                        multiple
                        onChange={handleImageChange}
                      />
                      <div className="label-holder">
                        <label htmlFor="file" className="label">
                          <i>Tambah Foto</i>
                        </label>
                      </div>
                      <div className="result ">
                        {renderPhotos(selectedFiles)}
                      </div>
                    </div>
                  </Stack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => setTab(2)} mr={3}>
                  Kembali
                </Button>
                <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
                  Simpan
                </Button>
              </ModalFooter>
            </div>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalInputAdmin;
