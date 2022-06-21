import Head from "next/head";
import AddProductSuccess from "../components/admin/addProductSuccess";
import Footer from "../components/Footer";
import ModalInputAdmin from "../components/admin/admin";
import ModalAdminEditDetail from "../components/admin/adminEditDetail";
import ModalAdminEditFoto from "../components/admin/adminEditFoto";
import ModalAdminEditStok from "../components/admin/adminEditStok";
import ModalDeleteAdmin from "../components/admin/adminDeleteProduct";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Footer</title>
        <link rel="icon" href="/pro.ico" />
      </Head>
      <ModalInputAdmin />
      <ModalAdminEditDetail />
      <ModalAdminEditStok />
      <ModalAdminEditFoto />
      <AddProductSuccess />
      <ModalDeleteAdmin />

      {/* <Footer /> */}
    </div>
  );
}
