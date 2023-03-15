import React,{useEffect} from 'react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import { createOrder } from '../redux/actions/orderActions';
import { useDispatch,useSelector } from 'react-redux';

let loadScript =(src)=>{
    return new Promise((resolve)=>{
        const script = document.createElement('script')
    script.src = src
    // document.body.appendChild(script)
script.onload = ()=>{
    resolve(true)
}
script.onerror =()=>{
    resolve(false)
}
document.body.appendChild(script)
    })

  }

  

const RazorPayButton = ({total,onPaymentSuccess,disabled}) => {
     
    const dispatch = useDispatch()
    const order = useSelector((state)=>state.order)
    const {orderInfo} = order
    //   console.log(orderInfo,"after payment -- details to display")
   
    let displayRazorpay = async (amount)=>{
     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

     if(!res){
        alert('Razorpay sdk failed to load')
        return
     }

 console.log(amount)

     const {data:{paymentOrder}} = await axios.post('http://localhost:8001/api/public/payment/order',{amount:amount})
    // console.log(paymentOrder)

        const options = {
            
            "key": process.env.RZP_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": paymentOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency":paymentOrder.currency,
            "name": "gadgets",
            "description": "Test Transaction",
            
            "order_id":paymentOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                console.log(response)
                alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                onPaymentSuccess(response)
            },
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "9000090000"
            // },
            
        };

        const paymentObject = new window.Razorpay(options)
       
            paymentObject.open();
            
        
    }
 

  return (
   <Button
   colorScheme='orange'
       size='lg'
      fontSize='medium'
   onClick={()=>displayRazorpay(total())}
   isDisabled={disabled}//once the address fields are filled this pay button will be enabled
   id='pay-btn'>
    Pay
   </Button>
  )
}

export default RazorPayButton