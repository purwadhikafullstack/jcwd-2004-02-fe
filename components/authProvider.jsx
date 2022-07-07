import { useEffect, useState } from "react";
import { AxiosInstance } from "../helpers";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Spinner } from "@chakra-ui/react";
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(true);

  const keepLogin = async () => {
    try {
      let token = Cookies.get("token");
      if (token) {
        let result = await AxiosInstance.get(`/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);
        dispatch({ type: "LOGIN", payload: result.data });
      }
    } catch (error) {
      console.log("error");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-fit mt-64 mx-auto">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.primary"
          size="xl"
        />
      </div>
    );
  }
  return children;
};

export default AuthProvider;
