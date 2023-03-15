import React from 'react'
import { Flex,Select,useColorModeValue as mode,Image,Box,Text,
Spacer,Divider, } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {addItemToCart} from '../redux/actions/cartActions';

const CheckoutItem = ({cartItem}) => {
    const {name,image,qty,id,stock,price} = cartItem
    const dispatch = useDispatch()
  return (
    <>
        <Flex>
            <Image src={image} alt={name} rounded='lg' w='120px' h='120px' fit='cover' draggable='false' loading='lazy'/>
        <Flex direction='column' align='stretch' flex='1' mx='2'spacing='4'>
            <Text noOfLines='2' maxW='150px'>{name}</Text>
            <Spacer/>
            
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
        </Flex>
        <Box>
        
            <Text fontWeight='bold'>₹{price}</Text>
        </Box>
        </Flex>
        <Divider bg={mode('gray.400','gray.800')}/>
    </>
  )
}

export default CheckoutItem