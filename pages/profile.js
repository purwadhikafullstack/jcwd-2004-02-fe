import React, { Component } from "react";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiListUnordered, RiLockPasswordLine } from "react-icons/ri";
import { MdPayments, MdLocationOn } from "react-icons/md";
import {
  Divider,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import ProfileModalEditPhoto from "../components/ProfileModalEditPhoto";
import ProfileModalEditProfile from "../components/ProfileModalEditProfile";
import Navbar from "../components/Navbar";
import { API_URL } from "../helpers";
import moment from "moment";
import "moment/locale/id";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Link from "next/link";

const Profile = () => {
  const { name, email, gender, birthdate, profilepic, id } = useUser();
  const profpic = profilepic ? `${API_URL + profilepic}` : `../no_pic.png`;
  const [alamat, setalamat] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getAlamat();
  }, []);

  const getAlamat = async () => {
    try {
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/profile/address/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setalamat(res.data);
      console.log("alamat list ", res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className=" shadow-md rounded-lg mt-10 mx-auto w-[300px] ml-[52px] h-[380px]">
          <div className="flex ml-5">
            <div className="cursor-pointer">
              <Link href="/profile">
                <Image
                  borderRadius="full"
                  boxSize="75px"
                  src={profpic}
                  alt="profilepic"
                />
              </Link>
            </div>

            <Link href="/profile">
              <div className="mt-6 ml-2 items-center cursor-pointer font-bold pr-10 truncate ...">
                {name}
              </div>
            </Link>
          </div>
          <div className="bg-slate-200">
            <Divider className="mt-2" />
          </div>
          <div className="flex">
            <div>
              <div className="flex mt-5 cursor-pointer">
                <Link href="/profile">
                  <CgProfile className="flex ml-10 mt-9 text-2xl items-center" />
                </Link>
                <Link href="/profile">
                  <div className="profileTag">Profil</div>
                </Link>
              </div>

              <div className="flex cursor-pointer">
                <Link href="/forgotPassword">
                  <RiLockPasswordLine className="flex ml-10 mt-9 text-2xl items-center" />
                </Link>
                <Link href="/forgotPassword">
                  <div className="profileTag">Ganti Password</div>
                </Link>
              </div>

              <div className="flex cursor-pointer">
                <MdLocationOn className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag" onClick={onOpen}>
                  Alamat
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mx-auto shadow-md w-7/12 rounded-lg mt-10 pb-14 ml-10">
          <div>
            <div className="pt-5 ml-11 text-2xl font-bold">Profil</div>
            <div className="bg-slate-200">
              <Divider className="mt-7" />
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <img
                  className="flex items-center ml-11 mt-10 rounded-2xl h-[300px] w-[300px]"
                  src={profpic}
                />
                <ProfileModalEditPhoto />
              </div>
              <div>
                <div>
                  <div className="flex mt-12 ">
                    <div className="profileTag">Nama Lengkap</div>
                    <div className="profileDesc ml-7">{name}</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Gender</div>
                    <div className="profileDesc ml-[85px]">
                      {gender ? gender : "-"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">E-mail</div>
                    <div className="profileDesc ml-[93px]">{email}</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Tanggal Lahir</div>
                    <div className="profileDesc ml-[40px]">
                      {birthdate ? moment(birthdate).format("LL") : "-"}
                    </div>
                  </div>
                </div>

                <ProfileModalEditProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="700px" minH="500px">
            <ModalHeader>Alamat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                {alamat.map((alamat, index) => (
                  <div key={index} className="text-primary">
                    <div className=" h-[150px] flex flex-col rounded-lg shadow-md p-3 mt-2">
                      <div className="mb-5">
                        <div className="flex justify-between">
                          <span className="font-bold">
                            {alamat.firstname} {alamat.lastname}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span>{alamat.phonenumber}</span>
                        <span>{alamat.address}</span>
                        <span>
                          {alamat.city}, {alamat.province}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
