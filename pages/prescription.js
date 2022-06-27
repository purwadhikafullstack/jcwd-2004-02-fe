import React, { Component, useCallback, createRef } from "react";
import { useEffect, useState } from "react";
import { Divider, Box, Image, Button } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import Navbar from "../components/Navbar";
import { API_URL } from "../helpers";
import { useDropzone } from "react-dropzone";
import { BsImage } from "react-icons/bs";

const Prescription = () => {
  const { name, email, gender, birthdate, profilepic } = useUser();
  const [tab, setTab] = useState(0);
  console.log(tab);
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("accepted", acceptedFiles);
    console.log("rejected", rejectedFiles);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: "image/png",
      noClick: true,
      noKeyboard: true,
    });

  const files = acceptedFiles.map((file) => (
    <div className="flex">
      <div key={file.path}>{file.path}</div>
      <div className="text-purple-600 ml-3" key={file.path}>
        {file.size / 1000} KB
      </div>
    </div>
  ));

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <div className="ml-48 mt-10">
          <div className="text-2xl font-semibold">Kirim Resep</div>
          <div className="text-sm">
            Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto
            tidak boleh lebih dari 10MB.
          </div>
        </div>
        <div className="flex mx-auto shadow-md w-9/12 rounded-lg mt-10 ">
          <div className="w-11/12">
            <div className="mx-14 text-sm font-semibold text-gray-500">
              Unggah Resep Dokter
            </div>
            <Divider className="mt-2 ml-14" />

            {/* page 1 */}
            {tab === 0 ? (
              <div
                className="containerx mx-[80px] my-2 flex items-center justify-center w-[900px] h-[400px]"
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
            ) : null}

            {/* page 2 */}
            {tab === 1 ? (
              <div>
                <div className="container2 mx-[80px] my-2 flex w-[900px] h-[350px]">
                  <div className="flex border-solid border-gray-200 rounded-lg border-2 px-5 py-2">
                    <BsImage className="text-2xl text-purple-600 " />
                    <ul className="ml-6 text-sm">{files}</ul>
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
                <div className="flex justify-end mr-6 mb-4  ">
                  <Button
                    variant={"outline"}
                    colorScheme={"purple"}
                    className="w-[100px] mt-3 mr-5 "
                    type="button"
                    onClick={open}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme={"purple"}
                    className="w-[100px] mt-3 "
                    type="button"
                    onClick={() => setTab(0)}
                  >
                    Unggah
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
