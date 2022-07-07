import Link from "next/link"
import { ButtonPrimary } from "./button"
import { useRouter } from "next/router"


const BoxTotalCart = ({subTotal}) => {  
    
    const router = useRouter()


    const handleCart = () => {
        router.push('/checkout')
    }
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
                <button onClick={handleCart} className="w-full h-[45px] mt-10 bg-purple-900 text-white rounded-lg text-xs">Bayar</button>
            </Link>
        </div>
    )
} 

export default BoxTotalCart