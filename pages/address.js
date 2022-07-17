import Input from "../components/input";
import Navbar from "../components/Navbar";
import React, { Component, useEffect, useState } from "react";
//  import Select from 'react-select'
import { ButtonPrimary, ButtonSecondary } from "../components/button";
import Footer from "../components/footer";
import axios from "axios";
import { API_URL } from "../helpers";
import { Select } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter, router } from "next/router";

const Address = () => {
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
  const router = useRouter();

  const [addAddress, setAddAddress] = useState({
    address: "",
    province_id: "",
    city_id: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
  });

  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);

  const getProvince = async (e) => {
    let res = await axios.get(`${API_URL}/transaction/getProvinces`);
    setProvince(res.data);
  };

  useEffect(() => {
    getProvince();
  }, []);

  const addAddressHandleChange = (e) => {
    setAddAddress({ ...addAddress, [e.target.name]: e.target.value });
  };

  const provinceHandleChange = async (e) => {
    setAddAddress({ ...addAddress, [e.target.name]: e.target.value });
    let res = await axios.get(
      `${API_URL}/transaction/getCities/${e.target.value}`
    );
    setCity(res.data);
  };

  const onSubmitAddAddress = async (e) => {
    let token = Cookies.get("token");
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/transaction/addAddress`,
        {
          address: addAddress.address,
          province_id: addAddress.province_id,
          city_id: addAddress.city_id,
          firstname: addAddress.firstname,
          lastname: addAddress.lastname,
          phonenumber: addAddress.phonenumber,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      toast.success("berhasil menambah alamat", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
      router.push("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-[380px] pt-[50px] mb-24 h-full">
        <span className="font-bold text-xl text-purple-900">
          Alamat Pengiriman
        </span>
        <form onSubmit={onSubmitAddAddress}>
          {/* <div className="my-8">
                        <Input name="label alamat" onChange={addAddressHandleChange} className="mt-20">Label Alamat</Input>
                    </div>  */}
          <span className="font-bold text-sm text-purple-900">
            Info Penerima
          </span>
          <div className="my-8 flex justify-between">
            <div className="w-[250px]">
              <Input name="firstname" onChange={addAddressHandleChange}>
                Nama Depan
              </Input>
            </div>
            <div className="w-[250px]">
              <Input name="lastname" onChange={addAddressHandleChange}>
                Nama Belakang
              </Input>
            </div>
          </div>
          <div className="w-[300px]">
            <Input name="phonenumber" onChange={addAddressHandleChange}>
              Nomor HP
            </Input>
          </div>
          <div className="flex justify-between my-8">
            <div>
              <span className="text-xs text-purple-800 mb-1">Provinsi</span>
              <Select
                name="province_id"
                onChange={provinceHandleChange}
                w="250px"
                className="w-[150px] mt-2"
              >
                {province.map((val, index) => {
                  return (
                    <option key={index} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <span className="text-xs text-purple-800 mb-1">
                Kota/Kabupaten
              </span>
              <Select
                name="city_id"
                onChange={addAddressHandleChange}
                w="250px"
                className="w-[250px] mt-2"
              >
                {city.map((val, index) => {
                  return (
                    <option key={index} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
            </div>
          </div>
          {/* <div> 
                        <span className="text-xs text-purple-800 mb-1">Kecamatan</span>
                        <Select className="w-[250px] mt-2" options={options} />
                    </div>  */}
          <div className="my-8">
            <Input name="address" onChange={addAddressHandleChange}>
              Alamat
            </Input>
          </div>
          {/* <div> 
                        <span className="text-xs text-purple-800 mb-1">Kodepos</span>
                        <Select className="w-[250px] mt-2" options={options} />
                    </div>   */}
          <div className="flex mt-6 mb-10">
            <input type="checkbox" className="mr-2"></input>
            <span className="text-xs ">Simpan sebagai alamat utama</span>
          </div>
          <div className="flex justify-between">
            <ButtonSecondary className="w-[240px] h-[40px]">
              Batalkan
            </ButtonSecondary>
            <ButtonPrimary className="w-[240px] h-[40px]">
              Simpan Alamat
            </ButtonPrimary>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
