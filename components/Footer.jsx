import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

import { MdMail } from "react-icons/md";

function Footer() {
  return (
    <>
      <div className=" bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">Healthymed</p>
          </ul>

          <ul>
            <div className="flex">
              <FaWhatsapp className=" mt-2 text-4xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 text-md pb-8 font-semibold hover:text-blue-600 cursor-pointer">
                Chat Whatsapp <br />
                +62-0123-4567
              </li>
            </div>
            <div className="flex">
              <FiPhoneCall className="mt-2 text-4xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 text-md pb-8 font-semibold hover:text-blue-600 cursor-pointer">
                Email <br />
                contact@healthymed.com
              </li>
            </div>
            <div className="flex">
              <MdMail className="mt-2 text-4xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Call Center <br />
                +62-0123-4567
              </li>
            </div>
          </ul>
        </div>

        <div className="p-5 ">
          <ul>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Tentang Kami
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              FAQ
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Kebijakan Privasi
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Syarat & Ketentuan
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Karir
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Blog
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Cara Belanja
            </li>
            <li className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer">
              Promo
            </li>
            <a
              href="https://www.google.com/"
              className="text-gray-500 text-sm pb-8 font-semibold hover:text-blue-600 cursor-pointer"
            >
              Diagnosis
            </a>
          </ul>
        </div>
        <div className="p-5 -mt-2">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-8">Ikuti Kami</p>
            <div className="flex">
              <FaFacebookF className="text-2xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 pb-8 font-semibold hover:text-blue-600 cursor-pointer">
                Facebook
              </li>
            </div>
            <div className="flex">
              <FaTwitter className="text-2xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 text-md pb-8 font-semibold hover:text-blue-600 cursor-pointer">
                Twitter
              </li>
            </div>
            <div className="flex">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <li className="ml-4 text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Instagram
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-10 bg-violet-600">
        <h1 className=" text-white">Designed by JCUI/UX 1004</h1>
      </div>
    </>
  );
}

export default Footer;
