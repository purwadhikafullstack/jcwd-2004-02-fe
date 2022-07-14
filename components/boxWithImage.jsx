import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { API_URL } from "../helpers" 
import { getCartAction } from "../redux/actions" 
import { connect } from "react-redux" 
import {BsFillTrashFill} from "react-icons/bs" 
import Rupiah from "../helpers/convertToRupiah"

const BoxWithImage = ({id,name,price,unit, total, kuantitas,imageProduct,productId,getCartAction, total_stock}) => { 

    const [input, setInput] = useState({quantity:kuantitas})   
    const [quantity, setquantity] = useState("")  
    const [totalqty, settotalqty] = useState(1)

    const router = useRouter()
    
    const handleChange = (e,prop) => {
        setInput({...input,[prop]:e})
    }

    const increase = () => {
        let count = parseInt(input.quantity) + 1
        count = count >= total_stock ? total_stock : count;
        setInput({...input, quantity:count}) 
        if ( quantity <= total_stock){
            plusHandle()}
    } 

    const decrease = () => {
        let count = parseInt(input.quantity) - 1
        count = count < 1 ? 1 : count
        setInput({...input,quantity:count}) 
        
        if ( quantity <= total_stock){
           minHandle() }
        
    } 

      const onDeleteClick =async () => {
        let token = Cookies.get('token') 
        try {
            const res = await axios.delete(
                `${API_URL}/transaction/deleteCart/${id}`, {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                }
            ) 
        } catch (error) {
            console.log(error)
        } finally {
            getCartAction()
        }

      }  
    
    const plusHandle = async (e) => {
        let token = Cookies.get('token')
        try {
            const res = await axios.put(`${API_URL}/transaction/plusCart/${id}`,null,{
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
        } catch (error) {
            console.log(error);
        } finally{
            getCartAction()
        }

    } 

    const minHandle = async (e) => {
        let token = Cookies.get('token')
        try {
            const res = await axios.put(`${API_URL}/transaction/minCart/${id}`,null,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }finally{
            getCartAction()
        }
    }  
     

    return ( 
        <div className=" w-[700px] h-[260px] rounded-lg mr-12 shadow-xl shadow-purple-100 p-6"> 
            <div>
                <div className="ml-2">
                    {/* <input type={"checkbox"} className="mr-2"/> */}
                    {/* <span className="text-base text-purple-900">Pilih Semua</span>  */}
                    {/* <img className="my-6" src={"./Line24.svg"}/> */}  
                    <div className="h-6 w-96">
                        <img className="my-6 " src={"/Line24.svg"}/>
                    </div>
                </div>
                <div className="flex ml-2">
                    <div className="flex items-center">
                        <div>
                            {/* <input type={"checkbox"}/>  */}
                        </div> 
                        <div className="w-[86px] h-[86px]"> 
                            <img src={'/bisolvon.jpg'}/>
                        </div> 
                    </div> 
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col ml-10">
                            <span className="text-lg text-purple-900 font-semibold">{name}</span> 
                            <span className="text-xs text-purple-900">1 {unit}</span>
                        </div> 
                        <div className="">
                            <span className="font-bold text-purple-900">{Rupiah(price)}</span>
                        </div>
                    </div>
                </div> 
                <div className="flex items-center justify-end">
                    <span className="text-sm text-purple-900">Pindahkan ke whistlist</span>
                    <span className="mx-3">|</span> 
                    <div >
                        <BsFillTrashFill className="w-[20px] h-[20px] text-purple-900" onClick={onDeleteClick}/> 
                    </div>
                    <div className="w-[150px] h-[38px]  bg-gray-200 rounded-xl ml-5 flex justify-between items-center">
                        {/* <img src={"./min.svg"}  />  */}
                        <button className="font-extrabold text-2xl text-purple-900 ml-7" disabled={quantity == 1} onClick={decrease}>-</button> 
                        {/* <input name="quantity" onChange={(value) => setquantity(value)} value={quantity} className="text-sm font-bold text-purple-900 ml-2 w-5 bg-gray-200"/> */}
                        <div className="mr-5 ml-4">{input.quantity}</div>
                        {/* <img src={"./plus.svg"}  />   */}
                        {/* // quantity lebih atau = maka true */}
                        <button className="font-bold text-2xl text-purple-900 mr-7" onClick={increase}>+</button> 
                    </div>
                </div>
            </div>

        </div>
    )
} 

export default connect(null, { getCartAction })(BoxWithImage)