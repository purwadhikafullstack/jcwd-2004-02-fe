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

API_URL;

function ModalAdminEditStok() {
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

  // untuk +- input jumlah kuantitas barang
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const inputPlusMinus = getInputProps();

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

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
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
          <ModalHeader>Edit Stok Obat</ModalHeader>
          <ModalCloseButton />

          <div>
            <ModalBody pb={6}>
              <FormControl mt={"1.5"} className="flex">
                <FormLabel pt={2} fontSize="sm" w="175px">
                  Kuantitas
                </FormLabel>
                <HStack>
                  <Button
                    size="xs"
                    colorScheme="purple"
                    variant="unstyled"
                    {...dec}
                  >
                    -
                  </Button>
                  <Input
                    marginLeft=""
                    size="xs"
                    width="20px"
                    variant="unstyled"
                    {...inputPlusMinus}
                  />
                  <Button
                    size="xs"
                    colorScheme="purple"
                    variant="ghost"
                    {...inc}
                  >
                    +
                  </Button>
                </HStack>
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
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAdminEditStok;
