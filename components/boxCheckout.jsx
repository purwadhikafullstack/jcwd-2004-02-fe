import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { API_URL } from "../helpers"
import RingkasanOrder from "./ringkasanOrder"

const BoxCheckout = () => { 
     
    

    return ( 
        <div className=" w-[700px] h-[260px] rounded-lg mr-12 shadow-xl shadow-purple-100 p-6">Ringkasan Order
            <div>
                <div className="ml-2">
                    {/* <input type={"checkbox"} className="mr-2"/>
                    <span className="text-base text-purple-900">Pilih Semua</span>  */}
                    <img className="my-6" src={"/Line24.svg"}/>
                </div>
                {/* <div className="flex ml-2">
                    <div className="flex items-center">
                        <div>
                            <input type={"checkbox"}/> 
                        </div> 
                        <div className="w-[86px] h-[86px]"> 
                            <img src={'/bisolvon.jpg'}/>
                        </div> 
                    </div> 
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col ml-5">
                            <span className="text-lg text-purple-900 font-semibold">bisolvon</span> 
                            <span className="text-xs text-purple-900">1 pack</span>
                        </div> 
                        <div className="">
                            <span className="font-bold text-purple-900">Rp.13.000</span>
                        </div>
                    </div>
                </div>  */} 
                <RingkasanOrder/>
                <div className="flex flex-col items-end justify-end">
                    <div>
                        <img src={"/Line17.svg"}  />
                    </div>
                    <div className="flex justify-between w-[523px] mt-5">
                        <span className="text-purple-900 text-md font-semibold">Subtotal</span>
                        <span className="text-purple-900 text-md font-bold">Rp.13.000</span>
                    </div>
                </div> 
            </div>

        </div>
    )
} 

export default BoxCheckout