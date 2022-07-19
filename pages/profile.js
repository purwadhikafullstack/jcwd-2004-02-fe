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
import Navbar from "../components/Navbar";
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
      <div className="flex ">
        <div className="hidden md:block mt-10 mx-auto">
          <UserProfileSidebar />
        </div>

        <div className="flex md:mx-auto md:w-7/12 md:ml-10 md:h-5/6 w-screen justify-center shadow-md rounded-lg mt-10 pb-14 h-screen ">
          <div>
            {/* mobile */}
            <HeaderMobile title={"Profile"} />
            {/* desktop */}
            <div className="hidden md:block">
              <div className="pt-5 ml-11 text-2xl font-bold">Profil</div>
              <div className="bg-slate-200">
                <Divider className="mt-7 " />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col items-center justify-center">
                <img
                  className="flex items-center md:ml-11 mt-10 rounded-2xl h-[200px] w-[200px] md:h-[300px] md:w-[300px]"
                  src={profpic}
                />
                <ProfileModalEditPhoto />
              </div>

              {/* biodata */}
              <div>
                <div className="mx-32">
                  <div className="flex md:mt-12 ">
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

                <div className="flex cursor-pointer">
                  <MdLocationOn className="flex ml-10 mt-9 text-2xl items-center" />
                  <div className="profileTag">Alamat Pengiriman</div>
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
