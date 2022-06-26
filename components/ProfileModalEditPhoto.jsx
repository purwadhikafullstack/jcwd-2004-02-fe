import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import Cookies from "js-cookie";
import { API_URL } from "../helpers";
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
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ProfileModalEditPhoto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profilepic } = useUser();
  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

  const closeClear = () => {
    setselectedImage([]);
    onClose();
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setselectedImage({
        ...selectedImage,
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  // const dispatch = useDispatch();

  const onSaveDataClick = async () => {
    let token = Cookies.get("token");
    const formData = new FormData();

    formData.append("profilepic", selectedImage.file);

    try {
      let res = await axios.put(`${API_URL}/profile/profilepic`, formData, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      onClose();
      toast.success("Foto Berhasil di Update!", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Foto Gagal di Update", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        className=" text-[14px] w-32 h-10 mt-4 ml-[140px]"
        variant="outline"
        colorScheme={"purple"}
      >
        Edit Foto
      </Button>

      <Modal isOpen={isOpen} onClose={closeClear}>
        <ModalOverlay />
        <ModalContent className="-z-10">
          <ModalHeader>Edit atau Tambah Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col items-center justify-center">
            <i className="mb-2 text-xs text-gray-500">
              Tekan gambar untuk ganti foto profil
            </i>
            <input
              type="file"
              className="hidden"
              onChange={onFileChange}
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
            />
            <label
              for="image"
              type="button"
              className="mx-5 h-h-[300px] w-[300px] border-dashed border-2 cursor-pointer flex items-center justify-center"
            >
              {selectedImage.filePreview ? (
                <img
                  src={selectedImage.filePreview}
                  alt=""
                  className="h-[300px] w-[300px]"
                />
              ) : (
                <img
                  src={`${API_URL}${profilepic}`}
                  alt=""
                  className="h-[300px] w-[300px]"
                />
              )}
            </label>

            <i className="mt-2 text-xs text-gray-500">
              Ukuran Gambar: maks. 2 MB
            </i>
            <i className="mt-2 text-xs text-gray-500">
              Format Gambar: .jpg, .png, .jpeg
            </i>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              isDisabled={true}
              onClick={onSaveDataClick}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfileModalEditPhoto;
