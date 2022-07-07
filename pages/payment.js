import BoxCheckout from "../components/boxCheckout"
import BoxPayment from "../components/BoxPayment"
import BoxPaymentProof from "../components/BoxPaymentProof"
import BoxTimePayment from "../components/BoxTimePayment"
import Footer from "../components/footer"
import Navbar from "../components/Navbar"
import RingkasanOrder from "../components/ringkasanOrder"

const Payment = () => {
    return (
        <div>
            <Navbar/> 
                <div className="my-10">
                    <span className="text-xl text-purple-900 text-left ml-[250px] font-bold ">Menunggu Pembayaran</span>
                </div>
                <div className="flex flex-col items-center gap-y-10 mb-36"> 
                    <BoxTimePayment/> 
                    <BoxPayment/> 
                    <BoxPaymentProof/>
                </div> 
            <Footer/>
        </div>
    )
} 

export default Payment