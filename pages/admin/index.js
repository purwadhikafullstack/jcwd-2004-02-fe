import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

function AdminHome() {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      <div className="bg-admin">INi homepage ya bwang</div>
    </>
  );
}

export default AdminHome;
