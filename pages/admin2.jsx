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
  HStack,
  useNumberInput,
} from "@chakra-ui/react";

function Admin2() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
                  width="15px"
                  variant="unstyled"
                  {...input}
                />
                <Button size="xs" colorScheme="purple" variant="ghost" {...inc}>
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
            <Button onClick={onClose} mr={3}>
              Kembali
            </Button>
            <Button colorScheme="purple" mr={3}>
              Lanjutkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Admin2;
