import React,{useEffect,useState,useCallback} from 'react';
import { Flex,Heading,Stack,Text,useColorModeValue as mode,Badge,Box,Link,Divider,useDisclosure } from '@chakra-ui/react';
import { useDispatch,useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import {createOrder} from '../redux/actions/orderActions'
import CheckoutItem from './CheckoutItem';
import RazorPayButton from './RazorPayButton';
import { resetCart } from '../redux/actions/cartActions';
import { resetOrder } from '../redux/actions/orderActions';
import PaymentFailureModal from './PaymentFailureModal';
import PaymentSuccessModal from './PaymentSuccessModal';

const CheckoutOrderSummary = () => {
  const {onClose:onErrorClose,onOpen:onErrorOpen,isOpen:isErrorOpen} = useDisclosure()
  const {onClose:onSuccessClose,onOpen:onSuccessOpen,isOpen:isSuccessOpen} = useDisclosure()

     const colorMode = mode('gray.600','gray.400');
     const cartItems = useSelector((state)=>state.cart)
     const {cart,subtotal,expressShipping} = cartItems

     const user = useSelector((state)=>state.user)
     const {userInfo} = user

     const shippingInfo = useSelector((state)=>state.order)
     const {error,shippingAddress} = shippingInfo

     const [buttonDisabled,setButtonDisabled] = useState(false)
     const dispatch = useDispatch()

const shipping = useCallback(
    ()=> (expressShipping ==='true' ? 40.00 : subtotal <=10000 ? 10.00 : 0),
    [expressShipping,subtotal])

    
const total = useCallback(
    ()=> (Number(shipping)===0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),

    [shipping,subtotal])

    useEffect(()=>{
      if(!error){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    },[error,shippingAddress,total,expressShipping,shipping,dispatch]);

    const onPaymentSuccess = async(payment_data)=>{
      onSuccessOpen()
       console.log(payment_data,"from the razorpay button")
      dispatch(createOrder({
        orderItems:cart,
        shippingAddress,
        paymentMethod:payment_data.paymentSource,
        paymentDetails:payment_data,
        shippingPrice:shipping(),
        totalPrice:total(),
        userInfo,
      }))
      dispatch(resetOrder())
      dispatch(resetCart())
      //open success modal
    }
    
    const onPaymentError = ()=>{
       //on error
       onErrorOpen()
    }
  return (
    <Stack spacing='8' rounded='xl' p='8' width='full'>
<Heading size='md'>Order Summary</Heading>
{
    cart.map((item)=>(
        <CheckoutItem key={item.id} cartItem={item}/>
    ))
}
<Stack spacing='6'>
  <Flex justify='space-between'>
<Text fontWeight='medium' color={colorMode}>Subtotal</Text>
<Text fontWeight='medium' color={colorMode}>{subtotal}</Text>
  </Flex>
  <Flex justify='space-between'>
<Text fontWeight='medium' color={colorMode}>Shipping</Text>
<Text fontWeight='medium' color={colorMode}>
{
  shipping() === 0 ? (
    <Badge rounded='full' px='2' colorScheme='green' fontSize='0.8em'>Free</Badge>
  ):(
    `₹${shipping()}`
  )
}
</Text>
  </Flex>
  <Flex justify='space-between'>
<Text fontWeight='semibold' fontSize='lg'>Total</Text>
<Text fontWeight='extrabold' fontSize='xl'>
  ₹{Number(total())}
</Text>
  </Flex>
</Stack>
<RazorPayButton total={total} onPaymentSuccess={onPaymentSuccess} onPaymentError={onPaymentError} disabled={buttonDisabled}/>
   <PaymentFailureModal onClose={onErrorClose} onOpen={onErrorOpen} isOpen={isErrorOpen}/> 
   <PaymentSuccessModal onClose={onSuccessClose} onOpen={onSuccessOpen} isOpen={isSuccessOpen}/> 
    </Stack>
  )
}

export default CheckoutOrderSummary