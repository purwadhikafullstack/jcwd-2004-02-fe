import React, { Component } from "react";
import { useEffect, useState } from "react";
import { DownloadIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import axios from "axios";

import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";

function ModalInputAdmin({ submitProduct }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState(0);
  const [selectedImage, setselectedImage] = useState([null, null, null]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    fetchFoto();
  }, []);

  // get data symptom, category, dll

  const fetchFoto = async () => {
    // let token = Cookies.get('token')
    try {
      let res = await axios.get(
        `${API_URL}/products/getselectedproductpicture/17`,
        selectedImage

        // {
        //   headers: {
        //     authorization: `bearer ${token}`,
        //   },
        // }
      );
      // console.log(res.data);
      console.log("resdata", res.data);

      setinput(res.data);
      // setinput([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // handle image
  const handleImageChange = (e, index) => {
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      let selectedImageMut = selectedImage;
      selectedImageMut[index] = e.target.files[0];

      setselectedImage([...selectedImageMut]);
    }
  };

  const deletePhoto = (index) => {
    let selectedImageMut = selectedImage;
    selectedImageMut[index] = null;

    setselectedImage([...selectedImageMut]);
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);

    return source.map((photo, index) => {
      if (photo) {
        return (
          <>
            <div>
              <span
                onClick={() => deletePhoto(index)}
                className="cursor-pointer relative flex items-center justify-center bg-black bg-opacity-40 w-6 h-6 rounded-full text-white z-100 left-[185px] top-6 "
              >
                X
              </span>
              <img
                className="h-[210px] w-[210px] object-cover mb-6 "
                src={URL.createObjectURL(photo)}
                alt=""
                key={index}
              />
            </div>
          </>
        );
      } else {
        return (
          <>
            <input
              style={{ display: "none" }}
              type="file"
              id={"file" + index}
              onChange={(e) => handleImageChange(e, index)}
            />
            <label
              className="mx-5 h-[185px] w-[185px] border-dashed border-2 cursor-pointer flex items-center justify-center"
              htmlFor={"file" + index}
            >
              <i className="">
                {index === 0 ? "Insert Main Image" : "Insert Image"}
              </i>
            </label>
          </>
        );
      }
    });
  };
  // console.log(input);

  // submit form
  const onSaveDataClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // if (selectedImage[0] === null) {
    //   // agar coding berhenti, dikasih return (perlu diberi warning pakai toastify)
    //   return;
    // }

    for (let i = 0; i < selectedImage.length; i++) {
      if (selectedImage[i]) {
        formData.append(`products`, selectedImage[i]);
      }
    }

    try {
      await submitProduct(formData);
    } catch (error) {
      console.log(error);
    } finally {
      flushSync(() => {
        setTab(5);
      });
      setselectedImage([null, null, null]);
      setTimeout(() => {
        setTab(0);
        onClose();
      }, 800);
    }
  };

  return (
    <>
      <Button leftIcon={<DownloadIcon />} colorScheme="purple" onClick={onOpen}>
        Edit Foto
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="1000px" maxH="900px" pl={8} pt={4}>
          <ModalHeader>Edit Foto Obat</ModalHeader>
          <ModalCloseButton />

          {/* fourth tab */}
          {tab === 0 ? (
            <div>
              <ModalBody pb={6}>
                <FormControl
                  mt={"1.5"}
                  className="flex items-center justify-center"
                >
                  <Stack spacing={3}>
                    <div>
                      <div className="result ">
                        {renderPhotos(selectedImage)}
                      </div>
                    </div>
                  </Stack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={onSaveDataClick}>
                  Simpan
                </Button>
              </ModalFooter>
            </div>
          ) : null}
          {/* success tab */}
          {tab === 5 ? (
            <div>
              <ModalBody className="flex items-center justify-center" h="600px">
                <div className="flex items-center justify-center">
                  <img src={"/addProductSuccess.svg"} />
                </div>
              </ModalBody>
            </div>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalInputAdmin;
