import { FaUserCircle, FaBell } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function AdminNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutAction = async () => {
    Cookies.remove("token");
    await router.push("/");
    dispatch({ type: "LOGOUT" });
  };

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  return (
    <div className="sticky top-0 min-w-screen h-[64px] shadow-md ">
      <div className="flex justify-end py-[20px] text-purple-900">
        <FaBell className="mr-[36px] text-2xl" />

        <Menu isLazy>
          <MenuButton>
            <FaUserCircle className="mr-[50px] text-2xl" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>

      {/* LOGOUT MODAL */}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Kamu yakin ingin log out?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"purple"}
              mr={3}
              onClick={() => {
                logoutAction();
                router.push("/");
                onCloseLogout();
              }}
            >
              Log out
            </Button>
            <Button onClick={onCloseLogout}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminNavbar;
