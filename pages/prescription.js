import React, { Component, useCallback } from "react";
import { useEffect, useState } from "react";
import { Divider, Box, Image, Icon } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import Navbar from "../components/Navbar";
import { API_URL } from "../helpers";
import moment from "moment";
import "moment/locale/id";
import { useDropzone } from "react-dropzone";

const Prescription = () => {
  const { name, email, gender, birthdate, profilepic } = useUser();
  const profpic = profilepic ? `${API_URL + profilepic}` : `../no_pic.png`;

  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("accepted", acceptedFiles);
    console.log("rejected", rejectedFiles);
  }, []);

  useEffect(() => {
    console.log(images);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png",
  });

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
            <div className="ml-14 pr-20 mt-3 bg-slate-200">
              <Divider className=" pr-20" />
            </div>
            {/* <div className="flex items-center justify-center"> */}
            {/* </div> */}
            <div
              className="flex justify-center bg-orange-300 mt-10 border-2 border-dashed border-gray-500 h-[300px] w-full "
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? "Drag Active " : "you can drop here"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
