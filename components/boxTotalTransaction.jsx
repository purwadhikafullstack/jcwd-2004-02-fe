import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../helpers"
import { ButtonPrimary } from "./button"
import PaymentMethod from "./paymentMethod"

const BoxTotalTransaction = ({subTotal, selectedAddress}) => {  
    let {id, firstname, lastname, address, phonenumber} =selectedAddress

    // const userCheckout =async () => {
    //     let token = Cookies.get('token')
    //     try {
    //         let res = await axios.post(`${API_URL}/transaction/userCheckout`, 
    //         {
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         }) 
    //         // toast.success("Konfirmasi Pembayaran Berhasil", {
    //         //   position: "top-right",
    //         //   autoClose: 1000,
    //         //   closeOnClick: true,
    //         //   draggable: true,
    //         // }); 
    //         router.push("/payment");
    //     } catch (error) {
    //         console.log(error);
    //         // toast.error("Konfirmasi Pembayaran Gagal", {
    //         //     position: "top-right",
    //         //     autoClose: 1000,
    //         //     closeOnClick: true,
    //         //     draggable: true,
    //         //   });
    //     }
    //   }
    

    return (
        <div className=" h-[400px] w-[360px] p-5 rounded-lg shadow-xl shadow-purple-100 border-[0.5px]" >
            <span className="font-bold text-purple-900 text-lg">Total</span> 
            <div className="flex justify-between mt-7">
                <span className="text-purple-900 text-sm">Sub Total</span>
                <span className="font-bold text-purple-900">Rp{subTotal}</span>
            </div>
            <div className="flex justify-between mt-2">
                <span className="text-purple-900 text-sm">pengiriman</span>
                <span className="font-bold text-purple-900">Rp9.000</span>
            </div>
            <div className="my-5">
                <img src={"./Line19.svg"}/>
            </div>
            <div className="flex justify-between my-3">
                <span className="font-medium text-purple-900">Total</span>
                <span className="font-bold text-purple-900">Rp{subTotal}</span>
            </div> 
            <div>
                <img src={"./Line20.svg"}/>
            </div>
            <div className="flex flex-col my-4">
                <span className="font-bold text-purple-900">Metode Pembayaran</span> 
                <span className="text-xs text-purple-900">silahkan pilih metode pembayaran anda disini</span>
            </div>
            <PaymentMethod 
            selectedAddress={selectedAddress}/>
        </div>
    )
} 

export default BoxTotalTransaction