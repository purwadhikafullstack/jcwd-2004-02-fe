import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import healthymedlogo from "../../public/healthymed-logo.svg";
import MetaDecorator from "../../components/MetaDecorator";

function AdminHome() {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div>
        <MetaDecorator
          title={"Admin / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      <div className="bg-admin">Ini homepage admin</div>
    </>
  );
}

export default AdminHome;
