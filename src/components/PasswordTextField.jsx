import React,{useState} from 'react'
import {FormErrorMessage,FormLabel, FormControl} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useField,Field } from 'formik';
import { InputRightElement,InputGroup,Button } from '@chakra-ui/react';
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons';

const PasswordTextField = ({label,type,placeholder,name}) => {
  const [showPassword,setShowPassword] = useState(false);
    const [field,meta] = useField({type,placeholder,name})
  return (
   <FormControl isInvalid={meta.error && meta.touched} mb='6'>
    <FormLabel noOfLines='1'>{label}</FormLabel>
<InputGroup>
<Field as={Input} {...field} type={showPassword ? 'text' : type} placeholder={placeholder} name={name}/>
<InputRightElement h='full'>
    <Button variant='ghost' onClick={()=>setShowPassword((showPassword)=>!showPassword)}>
    {
       showPassword ? <ViewIcon/> : <ViewOffIcon/>
    }

    </Button>
</InputRightElement>
</InputGroup>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
   </FormControl>
  )
  
}

export default PasswordTextField