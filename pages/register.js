import { ButtonSecondary, ButtonPrimary } from "../components/button";
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
import { registerActions } from "../redux/actions/userActions.jsx";
import { connect } from "react-redux";
import useUser from "../hooks/useUser";
import Link from "next/link";
import Input from "../components/input";
import MetaDecorator from "../components/MetaDecorator";
import healthymedlogo from "../public/healthymed-logo.svg";
import { Button } from "@chakra-ui/react";
import { useRouter, router } from "next/router";

const Register = ({ registerActions }) => {
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  //const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isLogin } = useUser();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("name is required"),
      email: Yup.string()
        .required("email is required")
        .email("email is invalid"),
      password: Yup.string()
        .required("password is required")
        .min(8, "password must be at least 8 characters")
        .matches(/[A-Z]/g, "Must be at least 1 uppercase letter")
        .matches(/[a-z]/g, "Must be at least 1 lowercase letter")
        .matches(/[0-9]/g, "Must be at least 1 number")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Must be at least 1 special character"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        registerActions(values);
        resetForm();
        router.push("/home");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log("masuk sini");
      }
    },
  });

  // if (isLogin) {
  //   router.push("/home");
  // }

  return (
    <>
      <div>
        <MetaDecorator
          title={"Registrasi / Healthymed"}
          description={`Daftarkan diri kamu untuk dapat berbelanja di Healthymed - Apotek Online Terpercaya. 
        Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali`}
          imageUrl={healthymedlogo}
        />
      </div>
      <div className="flex">
        <div className="xl:w-1/2 hidden xl:inline-block xl:h-screen">
          <img className="xl:h-screen xl:w-screen " src={"/Frame.svg"} />
        </div>
        <div className="px-8 xl:w-1/2 xl:h-screen xl:px-20 xl:pt-10">
          <div className="mt-20 flex flex-col xl:mt-3">
            <div>
              <span className="font-bold inline-block xl:hidden text-2xl xl:text-2xl">
                Register
              </span>
              <span className="font-bold hidden xl:inline-block text-2xl xl:text-2xl">
                Mari Kita Mulai
              </span>
            </div>
            <div>
              <span className="xl:text-xs font-light">Sudah punya akun?</span>
              <Link href={"/login"}>
                <span className="underline text-green-500 xl:text-xs cursor-pointer">
                  {" "}
                  Masuk
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-8 xl:mt-5 flex justify-between">
            <ButtonSecondary className="w-36 xl:w-56 xl:h-10 h-12 flex items-center justify-center border-gray-400 font-bold">
              <FcGoogle className="mr-2 text-2xl xl:text-xl" />
              Google
            </ButtonSecondary>
            <ButtonPrimary className="w-36 xl:w-56 flex items-center justify-center bg-blue-500 font-bold">
              <BsFacebook className="mr-2 text-2xl xl:text-xl" />
              Facebook
            </ButtonPrimary>
          </div>
          <div className="flex my-8 xl:my-5 items-center justify-center">
            <img src={"/Line.svg"} className="text-base font-bold" />
            <span className="xl:text-xs text-gray-400">atau</span>
            <img src={"/Line.svg"} />
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col relative mb-4 xl:mb-2">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">Name</p>
                <input
                  name="name"
                  className="border-2 xl:h-10 xl:pl-10 h-12 pl-8 pb-1 w-full rounded-xl focus:outline-none xl:text-sm"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  required
                ></input>
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-sm ml-2 text-red-600">
                    {formik.errors.name}
                  </p>
                ) : null}
                <div className="absolute xl:bottom-3 top-10 xl:top-8 ml-3 text-purple-800 text-lg">
                  <CgProfile />
                </div>
              </div>
              <div className="flex flex-col relative mb-4 xl:mb-3">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                  Email Address
                </p>
                <input
                  name="email"
                  className="border-2 xl:h-10 h-12 pl-8 pb-1 w-full xl:pl-10 rounded-xl focus:outline-none xl:text-sm"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  required
                ></input>
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-sm ml-2 text-red-600">
                    {formik.errors.email}
                  </p>
                ) : null}
                <div className="absolute xl:bottom-3 top-10 xl:top-8 ml-3 text-purple-800 text-lg">
                  <MdEmail />
                </div>
              </div>
              <div className="flex flex-col relative">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                  Password
                </p>
                <input
                  name="password"
                  type={show1 ? "text" : "password"}
                  className="border-2 xl:h-10 xl:pl-10 h-12 pl-8 pr-8 xl:pr-10 pb-1 w-full rounded-xl focus:outline-none xl:text-sm"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  required
                ></input>
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-sm ml-2 text-red-600">
                    {formik.errors.password}
                  </p>
                ) : null}
                <div className="absolute xl:bottom-3 top-10 xl:top-8 ml-3 text-purple-800 text-lg">
                  <AiFillLock />
                </div>
                <div
                  className="absolute xl:bottom-3 top-10 xl:top-8 ml-[278px] xl:ml-[440px] text-purple-800 text-lg"
                  onClick={handleClick1}
                >
                  {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
              </div>
              <div className="mt-5 mb-16 xl:mb-9 xl:mt-7">
                <input type={"checkbox"} className="mr-1 xl:text-lg" />
                <span className="text-xs xl:text-sm font-light">
                  Saya setuju dengan persyaratan dan ketentuan
                </span>
              </div>
              <div>
                {/* <ButtonPrimary type="submit" className="w-full h-12 xl:h-10">
                  Register
                </ButtonPrimary> */}
                <Button
                  width="full"
                  height="40px"
                  fontSize="14px"
                  textColor="white"
                  colorScheme="purple"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { registerActions })(Register);
