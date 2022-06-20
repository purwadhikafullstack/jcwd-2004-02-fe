import Head from "next/head";
import Footer from "../components/Footer";
import AddProductSuccess from "./addProductSuccess";
import Admin from "./admin";
import Admin2 from "./admin2";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Footer</title>
        <link rel="icon" href="/pro.ico" />
      </Head>
      <Admin />
      <Admin2 />
      <AddProductSuccess />
      {/* <Footer /> */}
    </div>
  );
}
