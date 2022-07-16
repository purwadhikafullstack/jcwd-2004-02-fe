import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Submenu from "./AdminSubmenu";
import Link from "next/link";

const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: "/home.png",
    coloredicon: "/home2.png",
  },
  {
    path: "/admin/produk",
    name: "Produk",
    icon: "/med.png",
    coloredicon: "/med2.png",
    subroutes: [
      {
        path: "/admin/produk",
        name: "Daftar Produk",
      },
      {
        path: "#",
        name: "Tambah Produk",
      },
    ],
  },
  {
    path: "/admin/transaksi",
    name: "Transaksi",
    icon: "/transaction.png",
    coloredicon: "/transaction2.png",
    subroutes: [
      {
        path: "/admin/transaksi",
        name: "Semua Pesanan",
      },
      {
        path: "#",
        name: "Pesanan Baru",
      },
      {
        path: "#",
        name: "Siap Dikirim",
      },
      {
        path: "#",
        name: "Dalam Pengiriman",
      },
      {
        path: "#",
        name: "Selesai",
      },
      {
        path: "#",
        name: "Dibatalkan",
      },
    ],
  },
  {
    path: "#",
    name: "Sales & Revenue",
    icon: "/vector.png",
    coloredicon: "/vector2.png",
    subroutes: [
      {
        path: "#",
        name: "Ringkasan Statistik",
      },
      {
        path: "#",
        name: "Buku Kas",
      },
      {
        path: "#",
        name: "Laba dan Rugi",
      },
    ],
  },
];

function AdminSidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(0);
  const router = useRouter();

  return (
    <>
      <div className="h-full absolute top-0 bg-white w-[256px] shadow-xl cursor-pointer">
        <div className="h-[28px] w-[135px] mt-[15px] mb-[21px] mx-auto overflow-hidden relative">
          <Image src={"/logo1.png"} layout="fill" objectFit="cover" />
        </div>
        <section>
          {routes.map((route, index) => {
            if (route.subroutes) {
              return (
                <div key={index}>
                  <Submenu
                    route={route}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </div>
              );
            }

            return (
              <>
                {router.pathname == "/admin" ? (
                  <div className="flex menu-container">
                    <div className="menu-icon">
                      <Image
                        src={route.coloredicon}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="text-purple-400 pl-[12px] h-[20px] w-[150px] mb-1">
                      {route.name}
                    </div>
                  </div>
                ) : (
                  <Link href={route.path}>
                    <div className="flex menu-container">
                      <div className="menu-icon">
                        <Image
                          src={route.icon}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-slate-400 pl-[12px] h-[20px] w-[150px] mb-1">
                        {route.name}
                      </div>
                    </div>
                  </Link>
                )}
              </>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default AdminSidebar;
