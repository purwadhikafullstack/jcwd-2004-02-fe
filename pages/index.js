import Head from "next/head";
import Footer from "../components/Footer";
import AddProductSuccess from "./addProductSuccess";
import Admin from "./admin";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Footer</title>
        <link rel="icon" href="/pro.ico" />
      </Head>
      <Admin />
      <AddProductSuccess />
      {/* <Footer /> */}
    </div>
  );
}
