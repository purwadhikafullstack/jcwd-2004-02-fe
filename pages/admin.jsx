import React, { Component } from "react";
import { useEffect, useState } from "react";

// import Select from "react-select";

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
  HStack,
  useNumberInput,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../helpers";

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState(0);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [input, setinput] = useState({
    name: "",
    no_obat: "",
    no_BPOM: "",
    price: 50000,

    description: {
      "indikasi/kegunaan":
        "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    },
    warning: {
      "indikasi/kegunaan":
        "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    },
    usage: {
      "indikasi/kegunaan":
        "Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma, bronkitis akut atau kronis",
    },
    quantity: 100,
    unit: "cair",
    expired_at: "2022-06-14 14:55:57",
    brand_id: 1,
    type_id: 1,
    hargaJual: 50000,
    hargaBeli: 45000,
    is_deleted: 0,
    symptom: [1, 2],
    category: [1, 2],
    stock: 10,
    expired: "2022-06-14 14:55:57",
  });

  const fetchData = async () => {
    let res = await axios.get(
      `${API_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`
    );
    setData(res.data);
    settotalData(parseInt(res.headers["x-total-count"]));
  };

  const handleChange = (e, prop) => {
    setinput({ ...input, [prop]: e.target.value });
  };

  const onAddDataClick = async () => {
    console.log(input);
    try {
      await axios.post(`${API_URL}/products`, input);
      fetchData();
      setOpen(false);
      setinput({
        name: "",
        no_obat: "",
        no_BPOM: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="792px" maxH="470px">
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
                  <div className="text-gray-400">Detail Kuantitas & Harga</div>
                  <div className="mx-2  font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Upload Foto</div>
                </div>

                <FormControl className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Nama Obat
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="xs"
                    ref={initialRef}
                    placeholder="Masukkan nama obat"
                    onChange={(e) => handleChange(e, "name")}
                    name="name"
                    value={input.name}
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    No. Obat
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="xs"
                    placeholder="Masukkan no. obat"
                    onChange={(e) => handleChange(e, "no_obat")}
                    name="no_obat"
                    value={input.no_obat}
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    No. BPOM
                  </FormLabel>
                  <Input
                    w="226px"
                    h="32px"
                    fontSize="xs"
                    placeholder="Masukkan no. BPOM"
                    onChange={(e) => handleChange(e, "no_BPOM")}
                    name="no_BPOM"
                    value={input.no_BPOM}
                  />
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Kategori
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Obat Bebas"
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Tgl. Kadaluwarsa
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="DD/MM/YYYY"
                    />
                  </Stack>
                </FormControl>
                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Lokasi Penyimpanan
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Gudang"
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
                  <div className="font-semibold ">Detail Kuantitas & Harga</div>
                  <div className="mx-2 text-purple-600 font-semibold  ">></div>
                  <div className="rounded-full w-5 bg-gray-400 text-center text-white mr-2">
                    3
                  </div>
                  <div className="text-gray-400">Upload Foto</div>
                </div>
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
                    <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Box"
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
                    Detail Kuantitas & Harga
                  </div>

                  <div className="mx-2  font-semibold  ">></div>

                  <div className="rounded-full w-5 bg-purple-600 text-center text-white mr-2">
                    3
                  </div>
                  <div className="">Upload Foto</div>
                </div>

                <FormControl mt={"1.5"} className="flex">
                  <FormLabel pt={2} fontSize="sm" w="175px">
                    Upload Foto
                  </FormLabel>
                  <Stack spacing={3}>
                    <Select
                      w="141px"
                      size="sm"
                      variant="outline"
                      fontSize="xs"
                      placeholder="Box"
                    />
                  </Stack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => setTab(0)} mr={3}>
                  Kembali
                </Button>
                <Button colorScheme="purple" mr={3}>
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

export default Admin;
