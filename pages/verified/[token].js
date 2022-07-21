import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { API_URL } from "../../helpers";
import Link from "next/link";
import MetaDecorator from "../../components/MetaDecorator";
import healthymedlogo from "../../public/healthymed-logo.svg";

const Verified = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, name, id, email } = useUser();
  const dispatch = useDispatch();
  const mounted = useRef(false);

  const accVerified = async () => {
    try {
      let res = await axios.get(`${API_URL}/auth/verified`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "LOGIN", payload: res.data });
      setStatus(1);
    } catch (error) {
      console.log(error);
      setStatus(2);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      accVerified();
    }
    mounted.current = true;
    return () => {};
  }, []);

  const sendEmail = async () => {
    try {
      setloading(true);
      await axios.post(`${API_URL}/auth/sendemail-verified`, {
        id: id,
        name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  // if(loading) {
  //     return (
  //         <div>
  //             <div>loading .....</div>
  //         </div>
  //     )
  // }

  if (status === 1) {
    return (
      <>
        <div>
          <MetaDecorator
            title={"Verfied / Healthymed"}
            description={
              "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
            }
            imageUrl={healthymedlogo}
          />
        </div>
        <div className="bg-purple-800 h-screen py-24 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="text-2xl text-white mb-6">
              yeay your account have been successfully verified
            </div>
            <img src={"/clap.gif"} />
          </div>
          <Link href="/home" className="flex justify-center items-center">
            <button className="w-56 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">
              Go To HomePage
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <MetaDecorator
          title={"Verification Failed / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <div className="bg-purple-800 h-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-white mb-6">
          Sorry, failed to verified your account
        </div>
        <div>
          {/* {kalo belum login jangan sediakan button} */}
          {isLogin ? (
            <button
              className="w-64 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer"
              onClick={sendEmail}
            >
              Send Email Verified Again
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Verified;
