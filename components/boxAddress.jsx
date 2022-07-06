import { useState } from "react" 
import Link from "next/link" 


const BoxAddress = ({id, firstname, lastname, address, phonenumber}) => { 

    return ( 
        <div className=" w-[700px] h-[260px] rounded-lg mr-12 shadow-xl shadow-purple-100 p-5 "> 
            <div>
                <div>
                    <span className="ml-2 font-bold text-purple-900">Alamat Pengiriman</span>
                    <img className="my-3" src={"/Line24.svg"}/>
                </div>
                <div className="flex justify-between mx-2 mb-5 text-xs font-bold text-purple-900"> 
                    <span>{firstname} {lastname}, {phonenumber}</span>
                    <span className="">Pilih Alamat Lain</span>
                </div> 
                <div className="flex flex-col justify-between w-72 ml-2">
                    <span className="text-xs">rumah Jane</span> 
                    <span className="text-xs">{address}</span>
                </div>
                <img className="mt-5" src={"/Line24.svg"}/>
                <div className="flex"> 
                    <Link href={"/address"}>
                        <button className="w-[24px] h-[24px] bg-white shadow-md shadow-gray-200 text-center rounded-full mt-2 pb-2 font-extrabold text-base text-purple-900">+</button>
                    </Link>
                    <span className="font-bold text-purple-900 mt-2 ml-2">Tambahkan Alamat Baru</span>
                </div>
            </div>

        </div>
    )
} 

export default BoxAddress