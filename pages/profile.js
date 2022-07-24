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
  Image,
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

      <div className="md:user-container flex items-center justify-between md:mx-[96px] bg-pink-100 md:w-full">
        <div className="hidden md:block">
          <UserProfileSidebar />
        </div>

        {/* <div className="flex md:mx-auto md:w-7/12 md:ml-10 md:h-5/6 w-screen justify-center shadow-md rounded-lg mt-10 pb-14 h-screen "> */}
        <div className="md:w-[900px] md:px-[40px] md:py-[28px] md:rounded-lg md:border-[1px] md:border-slate-100 md:shadow-lg md:text-primary">
          <div>
            {/* mobile */}
            <div className="w-screen md:w-full">
              <HeaderMobile title={"Profile"} />
            </div>
            {/* desktop */}
            <div className="hidden md:block">
              <div className="text-xl font-bold">Profil</div>
              <div className="bg-slate-200">
                <Divider className="mt-7 " />
              </div>
            </div>
            <div className="flex flex-col w-screen md:w-[900px]  md:flex-row">
              <div className="flex flex-col items-center justify-center w-screen md:w-[500px]  ">
                <div className="md:mt-3 md:w-[300px]">
                  <Image alt={"profpic"} src={profpic} />
                </div>

                <ProfileModalEditPhoto />
              </div>
              {/* biodata */}
              <div className="w-screen flex flex-col">
                <div className="  flex flex-col items-center justify-center">
                  <div className="flex md:mt-12">
                    <div className="w-full">
                      <div className="profileTag">Nama Lengkap</div>
                      <div className="profileTag">Gender</div>
                      <div className="profileTag">E-Mail</div>
                      <div className="profileTag">Tanggal Lahir</div>
                    </div>
                    <div className="ml-24">
                      <div className="profileDesc">{name}</div>
                      <div className="profileDesc">{gender ? gender : "-"}</div>
                      <div className="profileDesc">{email}</div>
                      <div className="profileDesc">
                        {birthdate ? moment(birthdate).format("LL") : "-"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <ProfileModalEditProfile />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:hidden justify-center items-center mt-3 text-[indigo] font-semibold">
                <hr className="border-purple-800 rounded-xl border-1 mt-4 w-[300px]" />
                <div className=" flex items-center justify-center w-full">
                  <div className="mt-2 mr-3 cursor-pointer" onClick={onOpen}>
                    Daftar Alamat
                  </div>
                  <Link href="/forgotPassword">
                    <div className="mt-2 ml-3 cursor-pointer">
                      Ganti Password
                    </div>
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
