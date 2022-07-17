import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBars, AiFillHeart } from "react-icons/ai";
import { HiCash, HiLocationMarker } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

const routes = [
  {
    path: "/profile",
    name: "Profile",
    icon: <FaUserCircle className="text-2xl" />,
  },
  {
    path: "/userprofile/transactions",
    name: "Proses Pemesanan",
    icon: <AiOutlineBars className="text-2xl" />,
  },
  {
    path: "#",
    name: "Metode Pembayaran",
    icon: <HiCash className="text-[28px]" />,
  },
  {
    path: "#",
    name: "Alamat Pengiriman",
    icon: <HiLocationMarker className="text-2xl" />,
  },
  {
    path: "#",
    name: "Wishlist",
    icon: <AiFillHeart className="text-2xl" />,
  },
  {
    path: "#",
    name: "Pesan Bantuan",
    icon: <IoMail className="text-2xl" />,
  },
];

function UserProfileSidebar({ children }) {
  const { name } = useUser();
  const router = useRouter();

  return (
    <>
      <div className="w-[300px] h-fit rounded-lg border-[1px] border-slate-100 shadow-lg text-primary">
        {/* User's name */}
        <div className="flex py-[28px] pl-[40px] items-center">
          <div className="w-[24px] h-[24px] rounded-full bg-slate-300"></div>
          <div className="pl-[28px] text-sm font-bold">{name}</div>
        </div>
        <div className="w border-t-2" />

        <section>
          {routes.map((route, index) => {
            return (
              <div key={index}>
                {router.pathname == route.path ? (
                  <div
                    className={`flex pt-[34px] pl-[40px] items-center text-secondary ${
                      index == routes.length - 1 ? "mb-[34px]" : null
                    }`}
                  >
                    {route.icon}
                    <div className="pl-[50px] font-medium">{route.name}</div>
                  </div>
                ) : (
                  <Link href={route.path}>
                    <div
                      className={`flex pt-[34px] pl-[40px] items-center  ${
                        index == routes.length - 1 ? "mb-[34px]" : null
                      }`}
                    >
                      {route.icon}
                      <div className="pl-[50px] font-medium">{route.name}</div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default UserProfileSidebar;
