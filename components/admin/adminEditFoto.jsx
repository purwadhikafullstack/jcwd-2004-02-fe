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

function ModalAdminEditFoto() {
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

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Edit Foto
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Edit Foto</ModalHeader>
          <ModalCloseButton />

          <div>
            <ModalBody pb={6}>
              <FormControl mt={"1.5"} className="flex">
                <FormLabel pt={2} fontSize="sm" w="175px">
                  Upload Foto
                </FormLabel>
                <Stack spacing={3}>
                  <div>
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="label-holder">
                      <label htmlFor="file" className="label"></label>
                    </div>
                    <div className="result">{renderPhotos(selectedFiles)}</div>
                  </div>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={() => setTab(2)} mr={3}>
                Kembali
              </Button>
              <Button colorScheme="purple" mr={3} onClick={onAddDataClick}>
                Simpan
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAdminEditFoto;
