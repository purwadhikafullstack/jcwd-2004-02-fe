import React from "react";
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

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
          <ModalBody pb={6}>
            <div className="flex mb-4 text-sm">
              <p className="circle bg-slate-400">a</p>
              <div>1. Detail Obat</div>
              <div className="mx-2">-</div>
              <div>2. Detail Kuantitas & Harga</div>
            </div>
            <FormControl className="flex">
              <FormLabel pt={2} fontSize="sm" w="175px" className="bg-gray-400">
                Nama Obat
              </FormLabel>
              <Input
                w="226px"
                h="32px"
                fontSize="xs"
                ref={initialRef}
                placeholder="Masukkan nama obat"
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
            <Button colorScheme="purple" mr={3}>
              Lanjutkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Admin;
