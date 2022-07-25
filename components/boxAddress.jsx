import { useEffect, useState } from "react";
import Link from "next/link";
import { Divider, useDisclosure } from "@chakra-ui/react";
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
    <div className=" md:w-[700px] md:h-[260px] w-[900px] md:rounded-lg md:mr-12 md:shadow-lg md:shadow-purple-100 md:p-5 ">
      <div>
        <div>
          <span className="md:ml-2 md:text-base text-3xl  font-bold text-purple-900">
            Alamat Pengiriman
          </span>
          <span className="ml-96 md:text-base text-2xl font-bold md:hidden inline-block text-purple-900">
            Pilih Alamat Lain
          </span>
          {/* <img className="my-2" src={"/Line24.svg"} />  */}
          <Divider className="my-4" />
        </div>
        <div className="flex justify-between md:mx-2 md:mb-5 md:text-xs text-2xl my-10 font-bold text-purple-900">
          <span>
            {firstname} {lastname}, {phonenumber}
          </span>
          <span
            onClick={onOpen}
            className="cursor-pointer hidden md:inline-block"
          >
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
        <div className="flex flex-col justify-between text-2xl md:w-72 md:ml-2">
          <span className="md:text-xs">
            {firstname} {lastname}
          </span>
          <span className="md:text-xs">
            {address}, {city}, {province}
          </span>
          <Divider className="md:hidden inline-block my-5" />
        </div>
        <Divider className="my-4 md:inline-block hidden" />
        {/* <img className="mt-5" src={"/Line24.svg"} /> */}
        <div className="flex items-center justify-center md:justify-start">
          <Link href={"/address"}>
            <button className="md:w-[24px] md:h-[24px] w-16 h-16 bg-white shadow-md shadow-gray-200 text-center rounded-full pb-2 font-extrabold md:text-base text-3xl text-purple-900">
              +
            </button>
          </Link>
          <span className="font-bold text-purple-900 md:ml-2 ml-4 md:text-sm text-2xl">
            Tambahkan Alamat Baru
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxAddress;
