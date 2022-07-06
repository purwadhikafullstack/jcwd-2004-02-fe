import axios from "axios"; 
import { API_URL } from "../../helpers";
import Cookies from "js-cookie";

export const getCartAction = () => {
    let token = Cookies.get('token')
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/transaction/getDataCart`, {
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
            dispatch({type: 'UPDATE_CART', payload: res.data}) 
            console.log('ini respon getcart',res.data.resultCart);
        } catch (error) {
            console.log(error);
        }

    }
}