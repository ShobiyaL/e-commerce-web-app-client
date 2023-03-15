import React,{useState} from 'react';
import {Box,Flex,Heading,Text,Stack,Button,useColorModeValue as mode, Badge} from '@chakra-ui/react';
import {FaArrowRight} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {Link as ReactLink,useNavigate} from 'react-router-dom'

const CartOrderSummary = ()=>{
 const [buttonLoading,setButtonLoading] = useState();
 const standardShipping = Number(40.00).toFixed(2);
 const cartInfo = useSelector((state)=>state.cart);
 const {subtotal} = cartInfo;
 const navigate = useNavigate();

 let checkoutHandler =()=>{
    setButtonLoading(true);
    navigate('/checkout')
 }
   return(
    <Stack spacing='8' borderWidth='1px' rounded='lg' width='full' p='8'>
      <Heading size='md'>Order Summary</Heading>
      <Stack spacing='6'>
        <Flex justify='space-between' >
        <Text color={mode('gray.600','gray.400')} fontWeight='medium'>Subtotal</Text>
           <Text  fontWeight='medium'>₹{subtotal}</Text>

        </Flex>
        <Flex justify='space-between'>
            <Text color={mode('gray.600','gray.400')} fontWeight='thin'>
                Shipping charge
            </Text>
            <Text fontWeight='medium'>
                {
                    subtotal <=10000 ? (standardShipping) : (
                        <Badge rounded='full' px='2' fontSize='0.8em' colorScheme={'green'}>Free</Badge>
                    )
                }
            </Text>
        </Flex>
        <Flex justify='space-between'>
        <Text fontSize='lg' fontWeight='bold'>Total</Text>
<Text fontSize='lg' fontWeight='bold'>₹{subtotal <=10000 ? (Number(subtotal) + Number(standardShipping)) : subtotal}</Text>
        </Flex>
      </Stack>
      <Button as={ReactLink}
       to='/checkout'
       colorScheme='orange'
       size='lg'
      fontSize='medium'
     rightIcon={<FaArrowRight/>}
     isLoading={buttonLoading}
     onClick={()=>checkoutHandler()}
      >
      Checkout

      </Button>
    </Stack>
   )
}

export default CartOrderSummary;