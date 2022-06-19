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
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../helpers";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const [getData, setgetData] = useState({});
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
    name: "",
  });
  const fetchProfile = async () => {
    // let token = Cookies.get('token')
    try {
      let res = await axios.get(
        `${API_URL}/profile/user`,
        input
        // {
        //   headers: {
        //     authorization: `bearer ${token}`,
        //   },
        // }
      );
      // console.log(res.data);
      setgetData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const { id, name, email, password, gender, birthdate } = useUser();

  //   const profileRender = getData.user?.map((val) => {
  //     return { value: val.id, label: val.name };
  //   });

  return (
    <div className="flex mt-10">
      <img
        className="flex items-center ml-11 mt-10 bg-yellow-400"
        src={"/addProductSuccess.svg"}
        height="500px"
      />

      <div>
        <div className="flex mt-10">
          <div className="profileTag">Username</div>
          <div className="profileDesc ml-16">{input.name}</div>
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
          <div className="profileDesc ml-[93px]">rakan.ganteng@gmail.com</div>
        </div>
        <div className="flex">
          <div className="profileTag">Umur</div>
          <div className="profileDesc ml-[97px]">25</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
