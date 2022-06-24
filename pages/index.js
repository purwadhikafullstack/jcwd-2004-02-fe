import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserProductSidebar from "../components/UserProductSidebar";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="user-container flex">Ini homepage</div>
    </>
  );
}
