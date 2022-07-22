import { useEffect, useState } from "react";
import Link from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { ButtonPrimary } from "./button";
import BoxChooseAddress from "./BoxChooseAddress";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../helpers";
import { data } from "autoprefixer";

const BoxAddress = ({ setSelectedAddress, selectedAddress, getAddress }) => {
  let { id, firstname, lastname, address, phonenumber, city, province } =
    selectedAddress;
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [getAddress, setGetAddress] = useState([])

  // const getAllAddress = async () => {
  //     let token = Cookies.get('token')
  //     let res = await axios.get(`${API_URL}/transaction/getAllAddress`,{
  //         headers: {
  //             authorization: `bearer ${token}`
  //         }
  //     })
  //     setGetAddress(res.data)
  //     console.log('ini res.data ya',res.data);
  // }

  // useEffect(() => {
  //     getAllAddress()
  // }, [])
  // const defaultAddress = async (req, res) => {
  //     let token = Cookies.get('token')
  //     try {
  //         const res = await axios.put(`${API_URL}/transaction/defaultAddress/${id}`,null,{
  //             headers: {
  //                 authorization: `bearer ${token}`
  //             }
  //         })
  //     } catch (error) {

  //     }

  // }

  return (
    <div className=" w-[700px] h-[260px] rounded-lg mr-12 shadow-lg shadow-purple-100 p-5 ">
      <div>
        <div>
          <span className="ml-2 font-bold text-purple-900">
            Alamat Pengiriman
          </span>
          <img className="my-3" src={"/Line24.svg"} />
        </div>
        <div className="flex justify-between mx-2 mb-5 text-xs font-bold text-purple-900">
          <span>
            {firstname} {lastname}, {phonenumber}
          </span>
          <span onClick={onOpen} className="cursor-pointer">
            Pilih Alamat Lain
          </span>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="700px" minH="500px">
              <ModalHeader>Pilih Alamat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <div className=" h-[150px] flex flex-col rounded-lg shadow-md p-3"> 
                                <div className="mb-7">
                                    <div className="flex justify-between">
                                        <span>{firstname} {lastname}</span>  
                                        <ButtonPrimary className="w-[100px] h-[30px]">Pilih</ButtonPrimary>
                                    </div>
                                </div> 
                                <div className="flex flex-col">
                                    <span>{phonenumber}</span> 
                                    <span>{address}</span>
                                </div>
                            </div>  */}
                <div>
                  {getAddress.map((address, index) => (
                    <BoxChooseAddress
                      addressa={address}
                      terpilih={address.id === id}
                      key={index}
                      setSelectedAddress={setSelectedAddress}
                    />
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
        <div className="flex flex-col justify-between w-72 ml-2">
          <span className="text-xs">
            {firstname} {lastname}
          </span>
          <span className="text-xs">
            {address}, {city}, {province}
          </span>
        </div>
        <img className="mt-5" src={"/Line24.svg"} />
        <div className="flex">
          <Link href={"/address"}>
            <button className="w-[24px] h-[24px] bg-white shadow-md shadow-gray-200 text-center rounded-full  pb-2 font-extrabold text-base text-purple-900">
              +
            </button>
          </Link>
          <span className="font-bold text-purple-900  ml-2">
            Tambahkan Alamat Baru
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxAddress;
