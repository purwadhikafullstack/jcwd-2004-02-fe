import React, { Component } from "react";
import { useEffect, useState } from "react";
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
const ModalEditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setselectedImage] = useState([]);
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  return (
    <>
      <Button
        onClick={onOpen}
        className=" text-[14px] w-32 h-10 mt-6 ml-[140px]"
        variant="outline"
        colorScheme={"purple"}
      >
        Edit Profil
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={"3"} className="flex">
              <FormLabel pt={2} fontSize="md" w="175px">
                Nama Lengkap
              </FormLabel>
              <Stack spacing={3}>
                <Input ref={initialRef} placeholder="Nama Lengkap" />
              </Stack>
            </FormControl>

            <FormControl mt={"3"} className="flex">
              <FormLabel pt={2} fontSize="md" w="175px">
                Gender
              </FormLabel>
              <Stack spacing={3} className="w-[160px]">
                <Select placeholder="Select option">
                  <option value="option1">Pria</option>
                  <option value="option2">Wanita</option>
                </Select>
              </Stack>
            </FormControl>

            <FormControl mt={"3"} className="flex">
              <FormLabel pt={2} fontSize="md" w="175px">
                Tanggal Lahir
              </FormLabel>
              <Stack spacing={3}>
                <div>
                  <input
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    className="h-[40px] px-3 text-gray-400"
                    type="date"
                    // onChange={(e) => handleChange(e, "expired")}
                    // value={input.expired}
                  />
                </div>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalEditProfile;
