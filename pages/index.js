import Head from "next/head";
import Footer from "../components/Footer";
// import ModalInputAdmin from "./admin/admin";
// import ModalAdminEditDetail from "./admin/adminEditDetail";
// import ModalAdminEditFoto from "./admin/adminEditFoto";
// import ModalAdminEditStok from "./admin/adminEditStok";
// import AddProductSuccess from "./admin/addProductSuccess";
import Profile from "../components/profile";
import Image from "next/image";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Footer</title>
        <link rel="icon" href="/pro.ico" />
      </Head>
      {/* <ModalInputAdmin />
      <ModalAdminEditDetail />
      <ModalAdminEditStok />
      <ModalAdminEditFoto />
      // <AddProductSuccess /> */}
      <Profile />
      {/* <Footer /> */}
    </div>
  );
}
