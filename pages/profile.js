import React from "react";
import { useEffect, useState } from "react";
import {
  Divider,
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
import Navbar from "../components/navbar";
import { API_URL } from "../helpers";
import moment from "moment";
import "moment/locale/id";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import HeaderMobile from "../components/HeaderMobile";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { MdLocationOn } from "react-icons/md";

const Profile = () => {
  const { name, email, gender, birthdate, profilepic, id } = useUser();
  const profpic = profilepic ? `${API_URL + profilepic}` : `../no_pic.png`;
  const [alamat, setalamat] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getAlamat();
  }, []);

  const router = useRouter();
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
      <div>
        <MetaDecorator
          title={`${name} / Healthymed`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="user-container flex justify-between bg-pink-100">
        <div className="hidden md:block">
          <UserProfileSidebar />
        </div>

        {/* <div className="flex md:mx-auto md:w-7/12 md:ml-10 md:h-5/6 w-screen justify-center shadow-md rounded-lg mt-10 pb-14 h-screen "> */}
        <div className="md:w-[900px] md:px-[40px] md:py-[28px] md:rounded-lg md:border-[1px] md:border-slate-100 md:shadow-lg md:text-primary md:bg-orange-100">
          <div>
            {/* mobile */}
            <HeaderMobile title={"Profile"} />
            {/* desktop */}
            <div className="hidden md:block">
              <div className="text-xl font-bold">Profil</div>
              <div className="bg-slate-200">
                <Divider className="mt-7 " />
              </div>
            </div>
            <div className="flex flex-col bg-purple-50 md:flex-row">
              <div className="flex flex-col items-center justify-center bg-blue-100 maxW-[500px] ">
                <img
                  className="flex items-center md:ml-11 mt-10 rounded-2xl h-[200px] w-[200px] md:h-[300px] md:w-[300px]"
                  src={profpic}
                />

                <ProfileModalEditPhoto />
              </div>
              {/* biodata */}
              <div className="bg-red-100">
                <div className="mx-32 bg-green-50">
                  <div className="flex md:mt-12">
                    <div className="w-[150px]">
                      <div className="profileTag">Nama Lengkap</div>
                      <div className="profileTag">Gender</div>
                      <div className="profileTag">E-Mail</div>
                      <div className="profileTag">Tanggal Lahir</div>
                    </div>
                    <div className="ml-20">
                      <div className="profileDesc">{name}</div>
                      <div className="profileDesc">{gender ? gender : "-"}</div>
                      <div className="profileDesc">{email}</div>
                      <div className="profileDesc">
                        {birthdate ? moment(birthdate).format("LL") : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <ProfileModalEditProfile />
              </div>
              <div className="flex flex-col md:hidden mx-[168px] mt-3 text-[indigo] font-semibold">
                <hr className="bg-purple-800 border-purple-800 rounded-xl border-1 mt-4" />
                <div className="flex justify-between">
                  <div className="mt-6 cursor-pointer" onClick={onOpen}>
                    Daftar Alamat
                  </div>
                  <Link href="/forgotPassword">
                    <div className="mt-6 cursor-pointer">Ganti Password</div>
                  </Link>
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
    </div>
  );
};

export default Profile;
