import React from 'react'
import {FormErrorMessage,FormLabel, FormControl} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {Field, useField} from 'formik';

const TextField = ({label,type,placeholder,name}) => {
  
    const [field,meta] = useField({type,name,placeholder})
    
  return (
   <FormControl isInvalid={meta.error && meta.touched} mb='6'>
    <FormLabel noOfLines='1'>{label}</FormLabel>
    <Field as={Input} {...field} type={type} placeholder={placeholder} name={name}/>
    <FormErrorMessage >{meta.error && meta.touched}{meta.error}</FormErrorMessage>
   </FormControl>
  )
}

export default TextField