import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

import { MdMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className=" mt-4 pt-4 flex flex-col bottom-0 w-full text-primary">
      <div className="flex justify-center">
        <div className="w-80 flex flex-col items-center mb-12">
          <div>
            <img src={"/logo.svg"} className="h-auto w-[200px] -ml-3 " />
            <div className="flex text-xs items-center w-60 my-3">
              <div>
                <FaWhatsapp className="text-4xl mr-4" />
              </div>
              <div>
                <div>Chat Whatsapp</div>
                <div>+62-1234-5678</div>
              </div>
            </div>
            <div className="flex text-xs items-center w-60">
              <div>
                <MdMail className="text-4xl mr-4" />
              </div>
              <div>
                <div>Email</div>
                <div>contact@healthymed.com</div>
              </div>
            </div>
            <div className="flex text-xs items-center w-60 my-3">
              <div>
                <FiPhoneCall className="text-4xl mr-4" />
              </div>
              <div>
                <div>Call Center</div>
                <div>+62-1234-5678</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col items-center ">
          <div>
            <div className="flex text-xs items-center w-60 my-3">
              <div>
                <div className="mt-2">Tentang Kami</div>
                <div className="mt-5">FAQ</div>
                <div className="mt-5">Kebijakan Privasi</div>
                <div className="mt-5">Syarat & Ketentuan</div>
                <div className="mt-5">Karir</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 flex flex-col items-center ">
          <div>
            <div className="flex text-xs items-center w-60 my-3">
              <div>
                <div className="mt-2">Blog</div>
                <div className="mt-5">Cara Belanja</div>
                <div className="mt-5">Promo</div>
                <div className="mt-5">Diagnosis</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-40 flex flex-col items-center ">
          <div>
            <div className="text-xl font-semibold">Ikuti Kami</div>
            <div className="flex text-xs items-center w-60 my-3">
              <div>
                <div className="flex text-xs items-center w-60 my-3">
                  <div>
                    <FaFacebookF className="text-4xl mr-4" />
                  </div>
                  <div>Facebook</div>
                </div>
                <div className="flex text-xs items-center w-60 my-3">
                  <div>
                    <FaTwitter className="text-4xl mr-4" />
                  </div>
                  <div>Twitter</div>
                </div>
                <div className="flex text-xs items-center w-60 my-3">
                  <div>
                    <FaInstagram className="text-4xl mr-4" />
                  </div>
                  <div>Instagram</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center  bg-[#4F618E]">
        <h1 className=" text-white my-6">Designed by JCUI/UX 1004</h1>
      </div>
    </div>
  );
};

export default Footer;
