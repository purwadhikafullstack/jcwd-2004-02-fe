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
// import useUser from "../../hooks/useUser";

const Profile = () => {
  // const { name, email, gender, birthdate } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  return (
    // <Box boxShadow="2xl" p="6" rounded="md" bg="white">
    <div>
      <Navbar />
      <div className="flex">
        <div className="shadow-purple-200 shadow-lg rounded-lg mt-10 mx-auto w-[300px] ml-[52px] h-[380px]">
          <div className="flex ml-11">
            <Image
              borderRadius="full"
              boxSize="75px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <div className=" ml-3 mt-6 text-2xl font-bold">Jane Doe</div>
          </div>
          <div className="bg-slate-200">
            <Divider className="mt-2" />
          </div>
          <div className="flex">
            <div>
              <div className="flex mt-5">
                <CgProfile className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Profil</div>
              </div>
              <div className="flex">
                <RiLockPasswordLine className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Ganti Password</div>
              </div>

              <div className="flex">
                <MdLocationOn className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Alamat Pengiriman</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mx-auto shadow-purple-200 shadow-lg w-7/12 rounded-lg mt-10 pb-14 ml-10">
          <div>
            <div className="pt-5 ml-11 text-2xl font-bold">Profil</div>
            <div className="bg-slate-200">
              <Divider className="mt-7" />
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <img
                  className="flex items-center ml-11 mt-10  h-[300px] w-[300px]"
                  src={"/addProductSuccess.svg"}
                />
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
                      <ModalHeader>Create your account</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <FormLabel>First name</FormLabel>
                          <Input ref={initialRef} placeholder="First name" />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Last name</FormLabel>
                          <Input placeholder="Last name" />
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
              </div>
              <div>
                <div>
                  <div className="flex mt-5">
                    <div className="profileTag">Username</div>
                    <div className="profileDesc ml-16">ss</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Nama Lengkap</div>
                    <div className="profileDesc ml-7">Ampuh Rakan</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Gender</div>
                    <div className="profileDesc ml-[85px]">Pria</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">E-mail</div>
                    <div className="profileDesc ml-[93px]">
                      rakan.ganteng@gmail.com
                    </div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Umur</div>
                    <div className="profileDesc ml-[97px]">25</div>
                  </div>
                </div>
                {/* <div className="profileTag justify-center">Edit Profil</div> */}
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
                            <Input
                              ref={initialRef}
                              placeholder="Nama Lengkap"
                            />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Box>
  );
};

export default Profile;
