import { ButtonSecondary, ButtonPrimary } from "./button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { connect, useSelector } from "react-redux";
import { API_URL } from "../helpers";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ChangePass = () => {
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const [show2, setShow2] = useState(false);
  const handleClick2 = () => setShow2(!show2);

  const [show3, setShow3] = useState(false);
  const handleClick3 = () => setShow3(!show3);

  const { isLogin } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required("Old password is required")
        .min(8, "password must be at least 8 characters")
        // .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-20}$/, 'password must be at least 1 number, 1 letter, and 1 special characters'),
        .matches(/[A-Z]/g, "Must be at least 1 uppercase letter")
        .matches(/[a-z]/g, "Must be at least 1 lowercase letter")
        .matches(/[0-9]/g, "Must be at least 1 number")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Must be at least 1 special character"
        ),
      newPassword: Yup.string()
        .required("New password is required")
        .min(8, "password must be at least 8 characters")
        // .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-20}$/, 'password must be at least 1 number, 1 letter, and 1 special characters'),
        .matches(/[A-Z]/g, "Must be at least 1 uppercase letter")
        .matches(/[a-z]/g, "Must be at least 1 lowercase letter")
        .matches(/[0-9]/g, "Must be at least 1 number")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Must be at least 1 special character"
        ),
      confirmNewPassword: Yup.string()
        .required("Confirm new password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      let token = Cookies.get("token");
      try {
        await axios.put(`${API_URL}/auth/changePassword`, values, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        toast.success("Reset Password Success", {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 xl:w-1/2 xl:h-screen xl:px-20 xl:pt-10">
        <div className="mt-20 flex flex-col xl:mt-3 mb-5 text-2xl">
          <div>
            Change Password
            <span className="font-bold inline-block xl:hidden text-2xl xl:text-2xl"></span>
          </div>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col relative mb-4 xl:mb-2">
              <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                Old Password
              </p>
              <input
                name="oldPassword"
                type={show3 ? "text" : "password"}
                className="border-2 xl:h-10 xl:pl-10 h-12 pl-8 pb-1 w-full rounded-xl focus:outline-none xl:text-sm"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
                onBlur={formik.handleBlur}
                required
              ></input>
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <p className="text-sm ml-2 text-red-600">
                  {formik.errors.oldPassword}
                </p>
              ) : null}
              <div className="absolute xl:bottom-3  top-8 ml-3 text-purple-800 text-lg"></div>
              <div
                className="absolute xl:bottom-3 top-8 ml-[278px] xl:ml-[400px] text-purple-800 text-lg"
                onClick={handleClick3}
              >
                {show3 ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>
            <div className="flex flex-col relative mb-4 xl:mb-3">
              <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                New Password
              </p>
              <input
                name="newPassword"
                type={show2 ? "text" : "password"}
                className="border-2 xl:h-10 h-12 pl-8 pb-1 w-full xl:pl-10 rounded-xl focus:outline-none xl:text-sm"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                required
              ></input>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <p className="text-sm ml-2 text-red-600">
                  {formik.errors.newPassword}
                </p>
              ) : null}
              <div className="absolute xl:bottom-3 top-8 ml-3 text-purple-800 text-lg"></div>
              <div
                className="absolute xl:bottom-3 top-8 ml-[278px] xl:ml-[440px] text-purple-800 text-lg"
                onClick={handleClick2}
              >
                {show2 ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>
            <div className="flex flex-col relative mb-5">
              <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                Confirm New Password
              </p>
              <input
                name="confirmNewPassword"
                type={show1 ? "text" : "password"}
                className="border-2 xl:h-10 h-12 pl-8 pr-8 xl:pr-10 pb-1 w-full rounded-xl focus:outline-none xl:text-sm"
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                onBlur={formik.handleBlur}
                required
              ></input>
              {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword ? (
                <p className="text-sm ml-2 text-red-600">
                  {formik.errors.confirmNewPassword}
                </p>
              ) : null}
              {/* <div className="absolute xl:bottom-3 bottom-4 ml-3 text-purple-800 text-lg"><AiFillLock/></div> */}
              <div
                className="absolute xl:bottom-3 top-8 ml-[278px] xl:ml-[440px] text-purple-800 text-lg"
                onClick={handleClick1}
              >
                {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ButtonPrimary type="submit" className="w-1/2 h-12 xl:h-10">
                Update Password
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
