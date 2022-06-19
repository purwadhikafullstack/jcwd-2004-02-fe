import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../helpers";
import { toast } from "react-toastify";

export const editBioActions = ({ ...input }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.put(
        `${API_URL}/profile/editBio`,
        { ...input },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
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
