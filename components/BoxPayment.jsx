import { Divider } from '@chakra-ui/react'
import RingkasanOrderPayment from './RingkasanOrderPayment'

const BoxPayment = () => {
    return ( 
        <div className=" w-[800px] min-h-[260px] rounded-lg shadow-md p-6 font-bold text-purple-900">Ringkasan Order
            <div className='my-4'>
                <Divider /> 
            </div>
            <RingkasanOrderPayment className="mt-5"/> 
            <Divider marginLeft="48" w="556px"/>
            <div className='mt-4 w-[556px] ml-48 flex justify-between'>
                <span>Subtotal</span> 
                <span>Rp.13000</span>
            </div>
        </div>
    )
} 

export default BoxPayment