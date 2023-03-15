import React,{useState} from 'react'
import { Box,VStack,Heading,FormControl,Flex,Stack,Text,Radio,RadioGroup, } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField'
import { useDispatch } from 'react-redux';
import {setExpress} from '../redux/actions/cartActions'
import {setShippingAddress,setShippingAddressError} from '../redux/actions/orderActions'

const ShippingInformation = () => {
    const dispatch = useDispatch()
const [formStateChanged,setFormStateChanged] = useState(false)

    let setErrorState = (input,data)=>{
      // console.log(input--"true/false",data)
     //initially input will be true since there will be errors and the fields are not touched
     // Not of input ie (false) which means is the fields are touched and there will be no errors 
    //  then the address details passed to the setShippingAddress
      if(!input){
        dispatch(setShippingAddress(data))
      }
      // console.log(formStateChanged,"changed values")
      if((!formStateChanged && !input) || (formStateChanged && input)){
        return
      }else{
        setFormStateChanged(input)
        dispatch(setShippingAddressError(input))
      }
    }
  return (
    <Formik
    initialValues={{
        address:'',
        postalCode:'',
        city:'',
        country:''
      }}
  validationSchema={
        Yup.object({
            address:Yup.string().required('This field is required.').min(2,'The address-info is too short'),
            postalCode:Yup.string().required('This field is required.').min(2,'The postal-code is too short'),
            city:Yup.string().required('This field is required.').min(2,'The city name is too short'),
            country:Yup.string().required('This field is required.').min(2,'The country name is too short'),
          
        })
      }
     >
     {
        (formik)=> <VStack as='form'>
            <FormControl onChange={
              //  console.log(Object.keys(formik.errors).length) // object.keys will retutn an array
              Object.keys(formik.errors).length===0 && Object.keys(formik.touched).length >=2 ?
              setErrorState(false,formik.values) :
              setErrorState(true)
            }>
                <TextField name='address' placeholder='street address' label='Street Address'/>
                <Flex>
                    <Box flex='1' mr='10'>
                    <TextField name='postalCode' placeholder='Postal Code' label='Postal Code'/>
                    </Box>
                    <Box flex='2'>
                    <TextField name='city' placeholder='City' label='City'/>
                    </Box>
                </Flex>
                <TextField name='country' placeholder='Country' label='Country'/>
                
            </FormControl>
            <Box w='100%' h='180px' pr='5'>
<Heading fontWeight='extrabold' fontSize='2xl' mb='10'>Shipping Method</Heading>
           <RadioGroup defaultValue='false'
           onChange={(e)=>
           {
            dispatch(setExpress(e))
           }}>
            <Stack direction={{base:'column',lg:'row'}} align={{lg:'flex-start'}}>
              <Stack pr='10' spacing={{base:'8',md:'10'}} flex='1.5'>
                <Box>
                  <Radio value='true'>
                    <Text fontWeight='bold'>Express ₹60.00</Text>
                    <Text>Delivery within 24hrs</Text>
                  </Radio>
                  
                </Box>
                
              </Stack>
              <Radio value='false'>
                    <Text fontWeight='bold'>Standard ₹00.00</Text>
                    <Text>May take a week to deliver</Text>
                  </Radio>
            </Stack>
           </RadioGroup>
            </Box>
        </VStack>
     } 
    </Formik>
  )
}

export default ShippingInformation