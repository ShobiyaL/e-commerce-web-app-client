import React,{useState,useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box,Button,Container,FormControl,Heading,HStack,Stack,Text,useBreakpointValue,
useColorModeValue as mode,AlertIcon,Alert,AlertTitle,AlertDescription,useToast } from '@chakra-ui/react';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate,Link as ReactLink,useLocation } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { register } from '../redux/actions/userActions';

const RegistrationScreen = () => {

  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const {userInfo,loading,error} = user;

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state)
  const redirect = '/products';
  const toast = useToast();

  const headingBR = useBreakpointValue({base:'xs',md:'sm'});
  const boxBR = useBreakpointValue({base:'transparent',md:'bg-surface'});

  useEffect(()=>{
    if(userInfo){

        navigate(redirect)
        toast({description:'Registered successfully',status:'success',isClosable:true})

      }
    },[userInfo, redirect,location.state,navigate,error,toast])

  return (
    <Formik
      initialValues={{
        name:'',
        email:'',
        password:'',
        
      }}
      validationSchema={
        Yup.object({
            name:Yup.string().required('Name is required.'),
            email:Yup.string().email('Invalid email.').required('An email address is required.'),
            password:Yup.string()
              .min(1,'Too short, Password must contain at least one character')
              .required('Password is required'),
              confirmPassword:Yup.string()
              .min(1,'Too short, Password must contain at least one character')
              .required('Password is required')
              .oneOf([Yup.ref('password'),null],'Password should match')
        })
      }
      onSubmit = {(values)=>{
         dispatch(register(values.name,values.email, values.password))
      }}
    >
     {
        (formik)=>(
             <Container maxW='lg' py={{base:'12',md:'24'}} px={{base:'0',md:'8'}} maxH='4xl'>
                <Stack spacing='8'>
                  <Stack spacing='6'>
                    <Stack spacing={{base:'2',md:'3'}} textAlign='center'>
                        <Heading size={headingBR}>Create account</Heading>
                        <HStack spacing='1' justify='center'>
                            <Text color='muted'> registered user?</Text>
                            <Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>sign in</Button>
                        </HStack>
                    </Stack>
                  </Stack>
                  <Box py={{base:'0',md:'8'}} px={{base:'4',md:'10'}} bg={{boxBR}}
                  boxShadow={{base:'none',md:'xl'}}>
<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
    {
       error && (
        <Alert status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                <AlertIcon/>
                <AlertTitle>OOPS!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
       )
    }
    <Stack spacing='5'>
        <FormControl>
        <TextField type='text' name='name' placeholder='your name' label='Name'/>
          <TextField type='text' name='email' placeholder='you@example.com' label='Email'/>
          <PasswordTextField type='password' name='password' placeholder='your password' label='Password'/>
          <PasswordTextField type='password' name='confirmPassword' placeholder='Confirm your password' label=' Confirm Password'/>
        </FormControl>
    </Stack>
    <Stack spacing='6'>
      <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading}  type='submit'>
        sign up
      </Button>
    </Stack>
</Stack>
                  </Box>
                </Stack>
            </Container>
        )
     }    
    </Formik>
  )
}

export default RegistrationScreen