import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/navbar";
import UserDetailTransactionCard from "../../../components/UserDetailTransactionCard";
import axios from "axios";
import { API_URL } from "../../../helpers";

function UserDetailTransaction() {
  const route = useRouter();
  let { transaction_id } = route.query;
  transaction_id = parseInt(transaction_id);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  let token = Cookies.get("token");
  const getUserDetailTransaction = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/transaction/getdetailtransaction/${transaction_id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setData({ ...res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetailTransaction();
    console.log(data);
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-container">
        <UserDetailTransactionCard data={data} show={show} setShow={setShow} />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default UserDetailTransaction;
