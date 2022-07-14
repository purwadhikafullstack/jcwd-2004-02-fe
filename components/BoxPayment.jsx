import { Divider } from '@chakra-ui/react'
import RingkasanOrderPayment from './RingkasanOrderPayment' 
import { getCartAction } from '../redux/actions'
import useCart from "../hooks/useCart"
import { useEffect } from 'react' 
import { connect } from 'react-redux'


const BoxPayment = ({getCartAction}) => { 

    const {cart} = useCart() 

    useEffect(()=>{
        getCartAction()
    }, [])
    
    return ( 
        <div className=" w-[800px] min-h-[260px] rounded-lg shadow-md p-6 font-bold text-purple-900">Ringkasan Order
            <div className='my-4'>
                <Divider /> 
            </div>
            {cart.map((payment, index) => {
                <RingkasanOrderPayment className="mt-5"
                key={index}
                id={payment.id} 
                name={payment.product_name} 
                imageProduct={payment.image}
                price={payment.hargaJual} 
                kuantitas={payment.quantityCart} 
                unit={payment.unit}
                total={payment.totalHarga}  
                index={index} 
                productId={payment.product_id}/> 

            })}
            <Divider marginLeft="48" w="556px"/>
            <div className='mt-4 w-[556px] ml-48 flex justify-between'>
                <span>Subtotal</span> 
                <span>Rp.13000</span>
            </div>
        </div>
    )
} 

export default connect(null, { getCartAction })(BoxPayment)