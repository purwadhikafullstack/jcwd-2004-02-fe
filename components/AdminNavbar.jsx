import { FaUserCircle, FaBell } from "react-icons/fa";

function AdminNavbar() {
  return (
    <div className="sticky top-0 min-w-screen h-[64px] shadow-md ">
      <div className="flex text-2xl justify-end py-[20px] text-purple-900">
        <FaBell className="mr-[36px]" />
        <FaUserCircle className="mr-[50px]" />
      </div>
    </div>
  );
}

export default AdminNavbar;
