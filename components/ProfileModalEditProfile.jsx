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
import { editProfileActions } from "../redux/actions/userActions";
import { connect, useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import { AiOutlineReload } from "react-icons/ai";
const ProfileModalEditProfile = ({ editProfileActions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, email, gender, birthdate } = useUser();
  const [input, setinput] = useState({
    name: name,
    gender: gender,
    birthdate: birthdate,
  });

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // const dispatch = useDispatch();

  const onFileChange = (e) => {
    console.log(input, "inpuuut");
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const onSaveDataClick = async (e) => {
    e.preventDefault();
    editProfileActions(input);
    console.log(input);
    onClose();

    // window.location.reload();
  };
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
            <form>
              <FormControl mt={"3"} className="flex">
                <FormLabel pt={2} fontSize="sm" w="175px">
                  Nama Lengkap
                </FormLabel>
                <Stack spacing={3}>
                  <Input
                    fontSize="sm"
                    name="name"
                    ref={initialRef}
                    value={input.name}
                    // defaultValue={name}
                    onChange={onFileChange}
                  />
                </Stack>
              </FormControl>
            </form>
            <form>
              <FormControl mt={"3"} className="flex">
                <FormLabel pt={2} fontSize="sm" w="175px">
                  Gender
                </FormLabel>
                <Stack spacing={3} className="w-[145px]">
                  <Select
                    fontSize="sm"
                    name="gender"
                    placeholder="Select option"
                    value={input.gender}
                    onChange={onFileChange}
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </Select>
                </Stack>
              </FormControl>
            </form>
            <form>
              <FormControl mt={"3"} className="flex">
                <FormLabel pt={2} fontSize="sm" w="175px">
                  Tanggal Lahir
                </FormLabel>
                <Stack spacing={3}>
                  <div>
                    <input
                      name="birthdate"
                      onChange={onFileChange}
                      value={input.birthdate}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      className="h-[40px] px-3 text-gray-400 text-sm"
                      type="date"
                    />
                  </div>
                </Stack>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default connect(null, { editProfileActions })(ProfileModalEditProfile);
