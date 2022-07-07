import Swal from "sweetalert2";
import React, { Component } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../helpers";

function AdminDeleteProduct() {
  const clickDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = Cookies.get("token");
          await axios.patch(`${API_URL}/products/deleteproducts/16`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        colorScheme="purple"
        mr={3}
        onClick={() => {
          clickDelete();
        }}
      >
        Hapus
      </Button>
    </>
  );
}

export default AdminDeleteProduct;
