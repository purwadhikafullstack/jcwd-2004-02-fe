import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBars, AiFillHeart } from "react-icons/ai";
import { HiCash, HiLocationMarker } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import { API_URL } from "../helpers";
import Link from "next/link";
import {
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

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const routes = [
  {
    path: "/profile",
    name: "Profile",
    icon: <FaUserCircle className="text-xl" />,
  },
  {
    path: "/userprofile/transactions",
    name: "Proses Pemesanan",
    icon: <AiOutlineBars className="text-xl" />,
  },
  {
    path: "#",
    name: "Metode Pembayaran",
    icon: <HiCash className="text-[20px]" />,
  },

  {
    path: "#",
    name: "Wishlist",
    icon: <AiFillHeart className="text-xl" />,
  },
  {
    path: "#",
    name: "Pesan Bantuan",
    icon: <IoMail className="text-xl" />,
  },

  {
    path: "/changePass",
    name: "Ganti Password",
    icon: <RiLockPasswordLine className="text-xl" />,
  },
];

function UserProfileSidebar({ children }) {
  const { name, profilepic } = useUser();
  const router = useRouter();
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
    <>
      <div className="w-[280px] h-fit rounded-lg border-[1px] border-slate-100 shadow-lg text-primary">
        {/* User's name */}
        <div className="flex py-[4px] pl-[20px] items-center">
          <Image
            borderRadius="full"
            boxSize="75px"
            src={profpic}
            alt="profilepic"
          />
          <div className="pl-[16px] font-bold truncate ...">{name}</div>
        </div>
        <div className="w border-t-2" />

        <section>
          {routes.map((route, index) => {
            return (
              <div key={index}>
                {router.pathname == route.path ? (
                  <div
                    className={`cursor-pointer flex pt-[34px] pl-[40px] items-center text-secondary ${
                      index == routes.length - 1 ? "mb-[34px]" : null
                    }`}
                  >
                    {route.icon}

                    <div className="cursor-pointer pl-[50px] text-sm font-medium">
                      {route.name}
                    </div>
                  </div>
                ) : (
                  <Link href={route.path}>
                    <div
                      className={`cursor-pointer flex pt-[34px] pl-[40px] items-center  ${
                        index == routes.length - 1 ? "mb-[34px]" : null
                      }`}
                    >
                      {route.icon}

                      <div className="cursor-pointer pl-[50px] text-sm font-medium">
                        {route.name}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
          <div className="flex cursor-pointer">
            <MdLocationOn className="flex ml-10 text-xl items-center mb-6" />
            <div
              className="text-primary text-sm font-semibold pl-[48px] items-center"
              onClick={onOpen}
            >
              Alamat
            </div>
          </div>
        </section>
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
    </>
  );
}

export default UserProfileSidebar;
