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
import axios from "axios";
import { API_URL } from "../../helpers";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const { name, email, gender, birthdate } = useUser();
  return (
    // <Box boxShadow="2xl" p="6" rounded="md" bg="white">
    <div classname="flex flex-row w-screen">
      <div className="shadow-purple-200 bg-orange-200 shadow-2xl rounded-lg mt-10 w-48">
        <div className=" bg-red-400 pt-10 ml-11 text-4xl font-bold">
          Jane Doe
        </div>
        {/* <Divider className="ml-11" /> */}
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

      <div className="flex bg-green-300 shadow-purple-200 shadow-2xl h-5/6 rounded-lg mt-10   ">
        <div>
          <div className=" bg-red-400 pt-10 ml-11 text-4xl font-bold">
            Profil
          </div>
          {/* <Divider className="ml-11" /> */}
          <div className="flex">
            <img
              className="flex items-center ml-11 mt-10 bg-yellow-400 h-[300px]"
              src={"/addProductSuccess.svg"}
            />

            <div>
              <div className="flex mt-10">
                <div className="profileTag">Username</div>
                <div className="profileDesc ml-16">{name}</div>
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
          </div>
        </div>
      </div>
    </div>
    // </Box>
  );
};

export default Profile;
