import React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

import { API_URL } from "../../helpers";
import { flushSync } from "react-dom";

function ModalInputAdmin({
  submitProduct,
  isOpen,
  onClose,
  fetchFoto,
  inputImage,
  setinputImage,
}) {
  const [tab, setTab] = useState(0);
  // const [inputImage, setinputImage] = useState([]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // handle image
  const handleImageChange = async (e) => {
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      // axios disini
      const formData = new FormData();
      formData.append("products", e.target.files[0]);
      // 17 (product id) ganti params
      formData.append("data", JSON.stringify(inputImage[0].product_id));
      try {
        await axios.post(`${API_URL}/products/pic`, formData);
        setTimeout(() => {
          fetchFoto(inputImage[0].product_id);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePhoto = async (index) => {
    let photo_id = inputImage[index].id;
    try {
      await axios.delete(`${API_URL}/products/pic/${photo_id}`);
      setTimeout(() => {
        fetchFoto(inputImage[0].product_id);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);

    return source.map((photo, index) => {
      if (photo.image) {
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
                src={`${API_URL}` + photo.image}
                alt="image"
                key={index}
              />
            </div>
          </>
        );
      }
    });
  };

  // submit form
  const onSaveDataClick = (e) => {
    setTimeout(() => {
      setTab(0);
      onClose();
    }, 800);
  };

  return (
    <>
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
                      <div className="result ">{renderPhotos(inputImage)}</div>
                    </div>
                  </Stack>
                </FormControl>
                <div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id={"productImage"}
                    onChange={(e) => handleImageChange(e)}
                  />
                  <div className="flex items-center justify-center ">
                    <label
                      className="mx-5 h-12 w-48 cursor-pointer flex items-center justify-center bg-purple-700 text-white rounded-lg"
                      htmlFor={"productImage"}
                    >
                      <i>Tambah Foto</i>
                    </label>
                  </div>
                </div>
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
