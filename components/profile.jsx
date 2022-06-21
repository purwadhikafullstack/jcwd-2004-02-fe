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
  HStack,
  useNumberInput,
  Divider,
  Box,
} from "@chakra-ui/react";
// import useUser from "../../hooks/useUser";

const Profile = () => {
  // const { name, email, gender, birthdate } = useUser();
  return (
    // <Box boxShadow="2xl" p="6" rounded="md" bg="white">
    <div className="flex">
      <div className="shadow-purple-200 shadow-2xl rounded-lg mt-10 ml-14 w-2/12">
        <div className=" pt-10 ml-11 text-2xl font-bold">Jane Doe</div>
        <Divider className="mt-5" />
        <div className="flex">
          <div>
            <div className="flex mt-10">
              <div className="profileTag">Profil</div>
            </div>
            <div className="flex">
              <div className="profileTag">Proses Pemesanan</div>
            </div>
            <div className="flex">
              <div className="profileTag">Metode Pembayaran</div>
            </div>
            <div className="flex">
              <div className="profileTag">Alamat Pengiriman</div>
            </div>
            <div className="flex">
              <div className="profileTag">Wishlist</div>
            </div>
            <div className="flex">
              <div className="profileTag">Pesan Bantuan</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex ml-10 shadow-purple-200 shadow-2xl w-6/12 rounded-lg mt-10 pb-14">
        <div>
          <div className="pt-10 ml-11 text-2xl font-bold">Profil</div>
          <Divider className="mt-5" />
          <div className="flex">
            <div className="flex flex-col">
              <img
                className="flex items-center ml-11 mt-10  h-[300px]"
                src={"/addProductSuccess.svg"}
              />
              <div className="profileTag justify-center">Ganti Foto</div>
            </div>
            <div>
              <div>
                <div className="flex mt-10">
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
              <div className="profileTag justify-center">Edit Profil</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Box>
  );
};

export default Profile;
