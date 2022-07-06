import Link from "next/link"
import { ButtonPrimary } from "./button"

const BoxTotalCart = ({subTotal}) => { 
    return (
        <div className="h-[300px] w-[360px] p-5 rounded-lg shadow-xl shadow-purple-100 " >
            <span className="font-bold text-purple-900 text-lg">Total</span> 
            <div className="flex justify-between mt-7">
                <span className="text-gray-400">Sub Total</span>
                <span className="font-bold text-gray-400">Rp{subTotal}</span>
            </div>
            <div className="my-5">
                <img src={"./Line19.svg"}/>
            </div>
            <div className="flex justify-between mt-7">
                <span className="font-medium text-purple-900">Total</span>
                <span className="font-bold text-purple-900">Rp{subTotal}</span>
            </div> 
            <Link href={"/checkout"}>
                <ButtonPrimary className="w-full h-[45px] mt-10">Bayar(1)</ButtonPrimary>
            </Link>
        </div>
    )
} 

export default BoxTotalCart