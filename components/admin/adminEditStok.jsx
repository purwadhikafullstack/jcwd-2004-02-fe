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

function AdminEditStok({ submitProduct }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [getData, setgetData] = useState({});
  const [selectedImage, setselectedImage] = useState([null, null, null]);

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

  // handle image
  const handleImageChange = (e, index) => {
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      let selectedImageMut = selectedImage;
      selectedImageMut[index] = e.target.files[0];

      setselectedImage([...selectedImageMut]);
    }
  };

  const deletePhoto = (index) => {
    let selectedImageMut = selectedImage;
    selectedImageMut[index] = null;

    setselectedImage([...selectedImageMut]);
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);

    return source.map((photo, index) => {
      if (photo) {
        return (
          <>
            <div>
              <span
                onClick={() => deletePhoto(index)}
                className="cursor-pointer relative flex items-center justify-center bg-black bg-opacity-40 w-6 h-6 rounded-full text-white z-100 left-[185px] top-6 "
              >
                X
              </span>
              <img
                className="h-[210px] w-[210px] object-cover mb-6 "
                src={URL.createObjectURL(photo)}
                alt=""
                key={index}
              />
            </div>
          </>
        );
      } else {
        return (
          <>
            <input
              style={{ display: "none" }}
              type="file"
              id={"file" + index}
              onChange={(e) => handleImageChange(e, index)}
            />
            <label
              className="mx-5 h-[185px] w-[185px] border-dashed border-2 cursor-pointer flex items-center justify-center"
              htmlFor={"file" + index}
            >
              <i className="">
                {index === 0 ? "Insert Main Image" : "Insert Image"}
              </i>
            </label>
          </>
        );
      }
    });
  };
  // console.log(input);

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
      expired: input.expired,

      quantity: input.quantity,
      unit: input.unit,

      hargaJual: input.hargaJual,
      hargaBeli: input.hargaBeli,

      stock: input.stock,
    };
    console.log(insertData);
    // if (selectedImage[0] === null) {
    //   // agar coding berhenti, dikasih return (perlu diberi warning pakai toastify)
    //   return;
    // }

    for (let i = 0; i < selectedImage.length; i++) {
      if (selectedImage[i]) {
        formData.append(`products`, selectedImage[i]);
      }
    }
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
      setselectedImage([null, null, null]);
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
      <Button leftIcon={<DownloadIcon />} colorScheme="purple" onClick={onOpen}>
        Edit Stok
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Edit Stok</ModalHeader>
          <ModalCloseButton />

          {/* third tab */}
          {tab === 0 ? (
            <div>
              <ModalBody pb={6}>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kuantitas
                  </FormLabel>
                  <Stack spacing={3}>
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
                      value={input.unit}
                    />
                  </Stack>
                </FormControl>

                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Barang (Rp)
                  </FormLabel>
                  <Input
                    w="226px"
                    h="40px"
                    fontSize="sm"
                    placeholder="Masukkan nilai barang (Rp)"
                    onChange={(e) => handleChange(e, "hargaBeli")}
                    name="hargaBeli"
                    value={input.hargaBeli}
                  />
                </FormControl>
                <FormControl mt={"3"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nilai Jual (Rp)
                  </FormLabel>
                  <Input
                    w="226px"
                    h="40px"
                    fontSize="sm"
                    placeholder="Masukkan nilai jual (Rp)"
                    onChange={(e) => handleChange(e, "hargaJual")}
                    name="hargaJual"
                    value={input.hargaJual}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
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

export default AdminEditStok;
