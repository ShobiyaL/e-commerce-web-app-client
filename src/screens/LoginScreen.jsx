import React,{useState,useEffect} from 'react'
import {Box,Button,Checkbox,useBreakpointValue,useColorModeValue,Container,
Heading,HStack,Text,FormControl,Stack,Alert,AlertDescription,AlertTitle,
AlertIcon,useToast} from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,Link as ReactLink,useLocation } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { login } from '../redux/actions/userActions';

const LoginScreen = () => {

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
        if(location.state?.from){
          navigate(location.state.from)
        }else{
          navigate(redirect)
        }
        toast({description:'Login successful',status:'success',isClosable:true})
      }
      
    },[userInfo, redirect,location.state,navigate,error,toast])

    const validate = Yup.object().shape({
      email:Yup.string().email('Invalid email.').required('An email address is required.'),
      password:Yup.string()
        .min(1,'Too short, Password must contain at least one character')
        .required('Password is required'),
    });

  return (
    <Formik
      initialValues={{
        email:'',
        password:'',
      }}
      validationSchema={validate }
      onSubmit = {(values)=>{
        console.log(values)
         dispatch(login(values.email, values.password))
      }}
    >
     {
        (formik)=>(
             <Container maxW='lg' py={{base:'12',md:'24'}} px={{base:'0',md:'8'}} maxH='4xl'>
                <Stack spacing='8'>
                  <Stack spacing='6'>
                    <Stack spacing={{base:'2',md:'3'}} textAlign='center'>
                        <Heading size={headingBR}>Login to your account</Heading>
                        <HStack spacing='1' justify='center'>
                            <Text color='muted'> Don't have an acount</Text>
                            <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>sign up</Button>
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
          <TextField type='text' name='email' placeholder='you@example.com' label='Email'/>
          <PasswordTextField type='password' name='password' placeholder='your password' label='Password'/>
        </FormControl>
    </Stack>
    <Stack spacing='6'>
      <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading}  type='submit'>
        login
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

export default LoginScreen