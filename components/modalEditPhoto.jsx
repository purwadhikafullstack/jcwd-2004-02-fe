import React, { Component } from "react";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiListUnordered, RiLockPasswordLine } from "react-icons/ri";
import { MdPayments, MdLocationOn } from "react-icons/md";
// import { BsHeartFill } from "react-icons/bs";
// import { IoMail } from "react-icons/io";

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
  Divider,
  Box,
  Image,
  Icon,
} from "@chakra-ui/react";
import { ButtonPrimary, ButtonSecondary } from "./button";
import Navbar from "./navbar";
const ModalEditPhoto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Button
        onClick={onOpen}
        className=" text-[14px] w-32 h-10 mt-4 ml-[140px]"
        variant="outline"
        colorScheme={"purple"}
      >
        Edit Foto
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Foto</ModalHeader>
          <ModalCloseButton />
          <div>
            <ModalBody pb={6}>
              <FormControl mt={"1.5"} className="flex">
                <Stack spacing={3}>
                  <div className="flex flex-col items-center justify-center">
                    <div>ini gambar</div>
                  </div>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3}>Kembali</Button>
              <Button colorScheme="purple" mr={3}>
                Simpan
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalEditPhoto;
