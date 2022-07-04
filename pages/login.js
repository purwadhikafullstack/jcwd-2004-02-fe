import { ButtonSecondary, ButtonPrimary } from "../components/button";
import { FcGoogle } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import React from "react";
import { useState } from "react";
import { loginActions } from "../redux/actions/userActions.jsx";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import useUser from "../hooks/useUser";
import Link from "next/link";
import { useRouter, router } from "next/router";

const Login = ({ loginActions }) => {
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const { isLogin, role_id } = useUser();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        loginActions(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLogin && role_id == 0) {
    router.push("/");
  } else if (isLogin && role_id == 1) {
    router.push("/admin/produk");
  }

  return (
    <div className="flex">
      <div className="xl:w-[720px] hidden xl:inline-block xl:h-full">
        <img
          className="xl:h-screen xl:w-screen object-cover"
          src={"/Frame.svg"}
        />
      </div>
      <div className="px-8 xl:w-[720px] xl:h-screen xl:px-20 xl:pt-10">
        <div className="mt-20 flex flex-col xl:mt-3">
          <div>
            <span className="font-bold text-2xl xl:text-2xl">Masuk</span>
          </div>
        </div>
        <div className="mt-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col relative mb-4 xl:mb-2">
              <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                Email Address
              </p>
              <input
                name="email"
                type
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
              <div className="absolute xl:bottom-3 top-8 ml-3 text-purple-800 text-lg">
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
              <div className="absolute xl:bottom-3 top-8 ml-3 text-purple-800 text-lg">
                <AiFillLock />
              </div>
              <div
                className="absolute xl:bottom-3 top-8 ml-[278px] xl:ml-[490px] text-purple-800 text-lg"
                onClick={handleClick1}
              >
                {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>
            <div className="mt-5 mb-16 xl:mb-9 xl:mt-1 flex xl:items-center xl:justify-center">
              <input type={"checkbox"} className="mr-1 xl:text-lg" />
              <div className="w-full flex items-center justify-between">
                <span className="text-xs xl:text-sm font-light">
                  Ingat Saya
                </span>
                <Link href={"/forgotPassword"}>
                  <span className="text-xs xl:text-sm font-extralight text-gray-400 cursor-pointer">
                    Lupa Kata Sandi?
                  </span>
                </Link>
              </div>
            </div>
            <div>
              <ButtonPrimary type="submit" className="w-full h-12 xl:h-10">
                Masuk
              </ButtonPrimary>
            </div>
          </form>
        </div>
        <div className="flex w-[528px] my-8 xl:my-8 items-center justify-center">
          <img src={"/Line.svg"} />
          <span className="xl:text-xs">Atau Masuk Dengan</span>
          <img src={"/Line.svg"} />
        </div>
        <div className="mt-8 xl:mt-5 flex justify-between">
          <ButtonSecondary className="w-full xl:w-full xl:h-10 h-12 flex items-center justify-center border-gray-400 font-bold">
            <FcGoogle className="mr-2 text-2xl xl:text-xl" />
            Google
          </ButtonSecondary>
        </div>
        <div className="mt-8 xl:flex xl:items-center xl:justify-center ">
          <span className="xl:text-sm">Belum Punya Akun?</span>
          <Link href={"/register"}>
            <span className="text-purple-800 xl:text-sm font-semibold xl:ml-1 cursor-pointer">
              Daftar
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// export default Login
export default connect(null, { loginActions })(Login);
