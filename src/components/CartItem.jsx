import React from 'react'
import { Flex,CloseButton,Select,useColorMode as mode,Image,Box,Text, Stack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/actions/cartActions';

const CartItem = ({cartItem}) => {
    // console.log(cartItem)
    const {image,name,qty,price,stock,id} = cartItem;
    const dispatch = useDispatch();

  return (
    <Flex direction={{base:'column',md:'row'}} justify='space-between' align='center'>
    
    <Stack direction='row' spacing='5' width='full'>
        <Image src={image} alt={name} w='100px' h='120px' rounded='lg' fit='cover' draggable='false' loading='lazy'/>
       <Box pt='4'>
         <Stack spacing='0.5' >
            <Text fontWeight='medium'>{name}</Text>
         </Stack>
       </Box>
    </Stack>
    <Flex width='full' mt={{base:'4',md:'0'}} align={{base:'center',md:'baseline'}} justify='space-between' >
        <Select maxW='64px' focusBorderColor={mode('orange.500','orange.200')}
        value={qty}
        onChange={(e)=>{
            dispatch(addItemToCart(id,e.target.value))
        }}>
        {
            [...Array(stock).keys()].map((count)=>{
                return <option key={count+1} value={count+1}>{count+1}</option>
            })
        }
        </Select>
        <Text fontWight='bold'> ₹{price}</Text>
        <CloseButton
         onClick={()=>{
          // console.log(id)
          dispatch(removeItemFromCart(id))}
        }
        />
    </Flex>
    </Flex>
  )
}

export default CartItem