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
const ProfileModalEditPhoto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const { profilepic } = useUser();
  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

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
    } catch (error) {
      console.log(error);
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
      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Foto</ModalHeader>
          <ModalCloseButton />
          <div>
            <ModalBody pb={6}>
              <FormControl mt={"1.5"} className="flex">
                <Stack spacing={3}>
                  <div className="flex flex-col items-center justify-center">
                    <div>ini gambar</div>
                  </div>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3}>Kembali</Button>
              <Button colorScheme="purple" mr={3}>
                Simpan
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              name="image"
              accept=".gif,.jpg,.jpeg,.png"
              onChange={onFileChange}
            />
            {profilepic && selectedImage.filePreview ? (
              <img
                src={selectedImage.filePreview}
                alt=""
                className="object-cover w-36 h-36 mt-8 ml-36 rounded-full flex justify-center items-center"
              />
            ) : null}
            {!profilepic && selectedImage.filePreview ? (
              <img
                src={selectedImage.filePreview}
                alt=""
                className="object-cover w-28 h-28 mt-8 rounded-full "
              />
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfileModalEditPhoto;
