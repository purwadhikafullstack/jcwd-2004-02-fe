import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { API_URL } from "../../helpers";
import Link from "next/link";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { ButtonPrimary } from "../../components/button";
import { toast } from "react-toastify";
import { AiFillLock } from "react-icons/ai";
import MetaDecorator from "../../components/MetaDecorator";
import healthymedlogo from "../../public/healthymed-logo.svg";

const ForgotPass = () => {
  const router = useRouter();

  const { forgot } = router.query;

  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const [show2, setShow2] = useState(false);
  const handleClick2 = () => setShow2(!show2);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required("New password is required")
        .min(8, "password must be at least 8 characters")
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
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.put(`${API_URL}/auth/resetPassword`, values, {
          headers: {
            authorization: `Bearer ${forgot}`,
          },
        });
        toast.success("Reset Password Success", {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
        });
        resetForm();
        router.push("/login");
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
    <>
      <div>
        <MetaDecorator
          title={`Forgot Password / Healthymed`}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div className="flex">
        <div className="xl:w-1/2 hidden xl:inline-block xl:h-full">
          <img className="xl:h-screen xl:w-screen" src={"/Frame.svg"} />
        </div>
        <div className="px-8 xl:w-1/2 xl:h-screen xl:px-20 xl:pt-10">
          <div className="mt-20 flex flex-col xl:mt-3">
            <div>
              <span className="font-bold text-2xl xl:text-2xl">
                Lupa Kata Sandi
              </span>
            </div>
          </div>
          <div className="mt-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col relative mb-4 xl:mb-4">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                  New Password
                </p>
                <input
                  name="newPassword"
                  type={show2 ? "text" : "password"}
                  placeholder="Masukkan password baru anda"
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
                <div className="absolute xl:bottom-3  bottom-4 ml-3 text-purple-800 text-lg">
                  <AiFillLock />
                </div>
                <div
                  className="absolute xl:bottom-3 bottom-4 ml-[278px] xl:ml-[440px] text-purple-800 text-lg"
                  onClick={handleClick2}
                >
                  {show2 ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
              </div>
              <div className="flex flex-col relative mb-4 xl:mb-8">
                <p className="text-sm text-purple-800 mb-1 xl:text-xs">
                  Confirm New Password
                </p>
                <input
                  name="confirmNewPassword"
                  type={show1 ? "text" : "password"}
                  placeholder="Masukkan kembali password anda"
                  className="border-2 xl:h-10 h-12 pl-8 pb-1 w-full xl:pl-10 rounded-xl focus:outline-none xl:text-sm"
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
                <div className="absolute xl:bottom-3 bottom-4 ml-3 text-purple-800 text-lg">
                  <AiFillLock />
                </div>
                <div
                  className="absolute xl:bottom-3 bottom-4 ml-[278px] xl:ml-[440px] text-purple-800 text-lg"
                  onClick={handleClick1}
                >
                  {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
              </div>
              <div>
                <ButtonPrimary type="submit" className="w-full h-12 xl:h-10">
                  Reset Password
                </ButtonPrimary>
              </div>
            </form>
          </div>
          <div className="mt-8 xl:flex xl:items-center xl:justify-center ">
            <span className="xl:text-sm">Belum Punya Akun?</span>
            <span className="text-purple-800 xl:text-sm font-semibold xl:ml-1 cursor-pointer">
              Daftar
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default ForgotPass;
