import React from "react";
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
  useNumberInput,
} from "@chakra-ui/react";

function AddProductSuccess() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="480px" h="400px">
          <ModalHeader pb={16}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex items-center justify-center">
              <img src={"/addProductSuccess.svg"} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddProductSuccess;
