import React, { Component } from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

import { Button } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../helpers";
import Swal from "sweetalert2";

// const [deleteProd, setdeleteProd] = useState([]);

const handleClick = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

function AdminDeleteProduct() {
  return (
    <>
      <Button colorScheme="purple" onClick={handleClick}>
        Delete
      </Button>
    </>
  );
}

export default AdminDeleteProduct;
