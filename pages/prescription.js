import React from "react";
import { useEffect, useState } from "react";
import { Divider, Box, Image, Button } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { API_URL } from "../helpers";
import { useDropzone } from "react-dropzone";
import { BsImage } from "react-icons/bs";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";
import { MdArrowBackIosNew } from "react-icons/md";

const Prescription = () => {
  const router = useRouter();

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // onDrop,
    accept: "image/png",
    noClick: true,
    noKeyboard: true,
  });

  const onSaveDataClick = async () => {
    let token = Cookies.get("token");
    const formData = new FormData();
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
      console.log(error, "err");
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
          title={"Resep / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <>
        <div>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="flex flex-col ">
            <div className="hidden md:block ml-12 mt-10 ">
              <div className="text-2xl font-semibold md:ml-24 md:mt-10">
                Kirim Resep
              </div>
              <div className="text-sm flex md:ml-24">
                <div>
                  Tak perlu antre & obat langsung dikirimkan ke lokasi anda!
                </div>
                <div className="ml-1 font-semibold">
                  Foto tidak boleh lebih dari 2MB.
                </div>
              </div>
            </div>
            <div className="flex mx-auto flex-col shadow-md w-full rounded-lg mt-10  ">
              <div className="mx-12 mt-3 text-sm font-semibold justify-start hidden md:text-gray-500">
                Unggah Resep Dokter
              </div>
              {/* mobile nya */}
              <div className="md:hidden flex w-full h-12 pl-6 text-xl shadow-lg font-bold justify-start text-primary md:text-gray-500">
                <div className="pt-1 mr-3 cursor-pointer">
                  <MdArrowBackIosNew onClick={() => router.push("/home")} />
                </div>
                <div>Unggah File</div>
              </div>
              <Divider className="hidden md:mt-2" />
              <div className="w-full h-screen md:h-[400px] flex flex-col items-center justify-center">
                {/* page 1 */}
                {!acceptedFiles[0] ? (
                  <div
                    className="containerx_sm md:containerx my-10 flex justify-center w-11/12 h-full"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="hidden md:block md:mb-6 md:text-2xl">
                      Tarik & Letakkan File
                    </div>
                    <div className="hidden md:flex">
                      <div className="hl"></div>
                      <div className="mb-6 text-sm mx-2">atau</div>
                      <div className="hl"></div>
                    </div>
                    <div className="md:hidden">
                      <Image
                        src={"/awan.svg"}
                        layout="fill"
                        objectFit="cover"
                        width={200}
                      />
                    </div>
                    <div className="my-2 md:hidden">
                      Foto tidak boleh lebih dari 2MB.
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
                        <BsImage className="text-2xl text-primary " />
                        <ul className="ml-6 text-sm">
                          <div className="flex ">
                            <div>{acceptedFiles[0].path}</div>
                            <div className="text-primary ml-3">
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
            <div className="hidden md:block">
              <Footer />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Prescription;
