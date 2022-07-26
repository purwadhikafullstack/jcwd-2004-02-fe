import Input from "../components/input";
import Navbar from "../components/navbar";
import React, { Component, useEffect, useState } from "react";
//  import Select from 'react-select'
import { ButtonPrimary, ButtonSecondary } from "../components/button";
import Footer from "../components/Footer";
import axios from "axios";
import { API_URL } from "../helpers";
import { Select, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter, router } from "next/router";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";

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
      <div>
        <MetaDecorator
          title={"Address / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <Navbar />
      <div className="md:px-[380px] md:pt-[50px] px-12 md:w-full w-[900px] md:mx-0 mx-20 md:mb-24 mt-20 h-full">
        <span className="hidden md:inline-block font-bold text-xl text-purple-900">
          Alamat Pengiriman
        </span>
        <span className="md:hidden inline-block w-[900px] font-bold text-xl text-purple-900 mt-10">
          Alamat Pengiriman
        </span>
        <form onSubmit={onSubmitAddAddress}>
          {/* <div className="my-8">
                        <Input name="label alamat" onChange={addAddressHandleChange} className="mt-20">Label Alamat</Input>
                    </div>  */}
          <span className="font-bold text-sm text-purple-900">
            Info Penerima
          </span>
          {/* Dekstop */}
          <div className="md:my-8 md:flex md:justify-between">
            <div className="md:inline-block hidden w-[250px]">
              <Input name="firstname" onChange={addAddressHandleChange}>
                Nama Depan
              </Input>
            </div>
            <div className="md:inline-block hidden w-[250px]">
              <Input name="lastname" onChange={addAddressHandleChange}>
                Nama Belakang
              </Input>
            </div>
          </div>
          {/* Mobile */}
          <div className="md:hidden inline-block ">
            <div className="my-8 flex flex-col">
              <div className="w-[800px] mb-5">
                <Input name="firstname" onChange={addAddressHandleChange}>
                  Nama Depan
                </Input>
              </div>
              <div className="md:hidden inline-block w-[800px]">
                <Input name="lastname" onChange={addAddressHandleChange}>
                  Nama Belakang
                </Input>
              </div>
            </div>
          </div>
          <div className="md:w-[300px] w-[800px] md:mb-0 mb-5">
            <Input
              name="phonenumber"
              onChange={addAddressHandleChange}
              placeholder="contoh: 0812xxxx"
            >
              Nomor HP
            </Input>
          </div>
          {/* Dekstop */}
          <div className="md:flex md:justify-between md:my-8">
            <div className="md:inline-block hidden">
              <span className="text-xs text-purple-800 mb-1">Provinsi</span>
              <Select
                name="province_id"
                onChange={provinceHandleChange}
                w="250px"
                className="w-[150px] mt-2"
                placeholder="Pilih Provinsi..."
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
            <div className="md:inline-block hidden">
              <span className="text-xs text-purple-800 mb-1">
                Kota/Kabupaten
              </span>
              <Select
                name="city_id"
                onChange={addAddressHandleChange}
                w="250px"
                className="w-[250px] mt-2"
                placeholder="Pilih Kota/Kabupaten..."
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
          {/* Mobile */}
          <div className="md:hidden inline-block">
            <div className="flex flex-col ">
              <div className="mb-5">
                <span className="text-xs text-purple-800 mb-1">Provinsi</span>
                <Select
                  name="province_id"
                  onChange={provinceHandleChange}
                  w="800px"
                  className="w-[150px] mt-2"
                  placeholder="Pilih Provinsi..."
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
                  w="800px"
                  className="w-[250px] mt-2"
                  placeholder="Pilih Kota/Kabupaten..."
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
          {/* <div className="flex mt-6 mb-10">
            <input type="checkbox" className="mr-2"></input>
            <span className="text-xs ">Simpan sebagai alamat utama</span>
          </div> */}
          <div className="flex justify-between">
            {/* <ButtonSecondary className="md:w-[240px] md:h-[40px] w-[380px] h-[50px]">
              Batalkan
            </ButtonSecondary> */}
            <button
              className="py-2 border-[1.5px] text-xs font-medium border-purple-800 rounded-lg bg-white text-purple-800 hover:bg-purple-100 md:w-[240px] md:h-[40px] w-[380px] h-[50px]"
              onClick={() => {
                router.push("/cart");
              }}
            >
              Batalkan
            </button>
            {/* <ButtonPrimary className="md:w-[240px] md:h-[40px] w-[380px] h-[50px]">
            </ButtonSecondary>
            <ButtonPrimary
              type={"submit"}
              className="md:w-[240px] md:h-[40px] w-[380px] h-[50px]"
            >
              Simpan Alamat
            </ButtonPrimary> */}
            {/* <button
              className="py-2 rounded-lg text-xs font-medium bg-purple-800 text-white hover:bg-purple-900 md:w-[240px] md:h-[40px] w-[380px] h-[50px]"
              disabled={addAddress.length == 0}
            >
              Simpan Alamat
            </button> */}
            <Button
              colorScheme="purple"
              width="240px"
              fontSize="12px"
              type="submit"
              disabled={
                !addAddress.address ||
                !addAddress.phonenumber ||
                !addAddress.firstname ||
                !addAddress.city_id
              }
            >
              Simpan Alamat
            </Button>
          </div>
        </form>
      </div>
      <div className="md:block hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Address;
