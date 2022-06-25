import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../helpers";
import { toast } from "react-toastify";

export const loginActions = ({ email, password }, router) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
      dispatch({ type: "LOGIN", payload: res.data });
      Cookies.set("token", res.headers["x-token-access"]);
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const registerActions = ({ name, password, email }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/register`, {
        name,
        password,
        email,
      });
      dispatch({ type: "LOGIN", payload: res.data });
      Cookies.set("token", res.headers["x-token-access"]);
    } catch (error) {
      dispatch({ type: "LOGIN", payload: error.message || "network error" });
    } finally {
      dispatch({ type: "LOGIN" });
    }
  };
};

export const editProfileActions = ({ ...input }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.put(
        `${API_URL}/profile/editprofile`,
        { ...input },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("Profil berhasil di update", {
        position: "top-right",
      });
    } catch (error) {
      dispatch({
        type: "LOGIN",
        payload: error.response.data.message || "network error",
      });
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
