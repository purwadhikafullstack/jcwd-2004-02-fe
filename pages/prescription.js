import React, { Component, useCallback, createRef } from "react";
import { useEffect, useState } from "react";
import { Divider, Box, Image, Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { API_URL } from "../helpers";
import { useDropzone } from "react-dropzone";
import { BsImage } from "react-icons/bs";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const Prescription = () => {
  const router = useRouter();
  // const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  //   console.log("accepted", acceptedFiles);
  //   console.log("rejected", rejectedFiles);
  // }, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // onDrop,
    accept: "image/png",
    noClick: true,
    noKeyboard: true,
  });

  const onSaveDataClick = async () => {
    let token = Cookies.get("token");
    const formData = new FormData();

    console.log(acceptedFiles, "acc");
    formData.append("prescription", acceptedFiles[0]);

    try {
      let res = await axios.post(
        `${API_URL}/prescription/prescriptionpic`,
        formData,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      router.push("/prescriptionBerhasil");
    } catch (error) {
      console.log(error.response.data, "err");
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
      <div className="flex flex-col ">
        <div className="ml-48 mt-10">
          <div className="text-2xl font-semibold">Kirim Resep</div>
          <div className="text-sm flex">
            <div>
              Tak perlu antre & obat langsung dikirimkan ke lokasi anda!
            </div>
            <div className="ml-1 font-semibold">
              Foto tidak boleh lebih dari 10MB.
            </div>
          </div>
        </div>
        <div className="flex mx-auto flex-col shadow-md w-9/12 rounded-lg mt-10 ">
          <div className="mx-12 mt-3 text-sm font-semibold justify-start text-gray-500">
            Unggah Resep Dokter
          </div>
          <Divider className="mt-2" />
          <div className="w-full h-[400px] flex flex-col items-center justify-center">
            {/* page 1 */}
            {!acceptedFiles[0] ? (
              <div
                className="containerx my-10 flex justify-center w-11/12 h-full"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="mb-6 text-2xl"> Tarik & Letakkan File</div>
                <div className="flex">
                  <div className="hl"></div>
                  <div className="mb-6 text-sm mx-2">atau</div>
                  <div className="hl"></div>
                </div>
                <Button
                  colorScheme={"purple"}
                  className="w-[260px]"
                  type="button"
                  onClick={open}
                >
                  Unggah Resep
                </Button>
              </div>
            ) : (
              <div className="container2 my-10 flex w-11/12 h-full ">
                <div>
                  <div className="flex border-solid border-gray-200 rounded-lg border-2 px-5 py-2">
                    <BsImage className="text-2xl text-purple-600 " />
                    <ul className="ml-6 text-sm">
                      <div className="flex ">
                        <div key={acceptedFiles[0].path}>
                          {acceptedFiles[0].path}
                        </div>
                        <div
                          className="text-purple-600 ml-3"
                          key={acceptedFiles[0].path}
                        >
                          {acceptedFiles[0].size / 1000} KB
                        </div>
                      </div>
                    </ul>
                  </div>
                  <Button
                    colorScheme={"purple"}
                    className="w-[150px] mt-5 "
                    type="button"
                    onClick={open}
                  >
                    Unggah Resep
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mr-6 mb-4">
            <Button
              colorScheme={"purple"}
              className="w-[100px] "
              type="button"
              onClick={onSaveDataClick}
              disabled={!acceptedFiles[0]}
            >
              Unggah
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Prescription;
