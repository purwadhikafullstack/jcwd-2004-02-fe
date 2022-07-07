import { ButtonPrimary } from "./button"
import { toast } from "react-toastify"; 
import Cookies from "js-cookie"; 
import axios from "axios"; 
import { API_URL } from "../helpers";


const BoxChooseAddress = ({id, firstname, lastname, address, phonenumber}) => {  
    console.log('ini id', id); 

    const defaultAddress = async () => {
        let token = Cookies.get('token') 
        try {
            const res = await axios.put(`${API_URL}/transaction/defaultAddress?address_id=${id}`,null,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            toast.success("berhasil mengganti default address", {
                position: "top-right",
                autoClose: 1000,
                closeOnClick: true,
                draggable: true,
              });
        } catch (error) {
            console.log(error);  
        } 
        
    }

    return(
    <div>
        <div className=" h-[150px] flex flex-col rounded-lg shadow-md p-3"> 
            <div className="mb-7">
                <div className="flex justify-between">
                    <span>{firstname} {lastname}</span>  
                    <button onClick={defaultAddress} className="w-[100px] h-[30px] bg-purple-900 text-white rounded-lg text-xs">Pilih</button>
                </div>
            </div> 
            <div className="flex flex-col">
                <span>{phonenumber}</span> 
                <span>{address}</span>
            </div>
        </div> 
    </div>

    )
} 

export default BoxChooseAddress