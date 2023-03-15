import React,{useEffect,useState} from 'react'
import {Box,Button,FormControl,HStack,Stack,Text,Alert,AlertTitle,Heading,AlertIcon,AlertDescription,Flex,
StackDivider,useToast} from '@chakra-ui/react'
import { Navigate} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useDispatch,useSelector } from 'react-redux';
import { updateProfile,resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation } from 'react-router-dom';


const ProfileScreen = () => {
 const dispatch = useDispatch();

    const user = useSelector((state)=>state.user);
    const {userInfo,loading,error,updateSuccess} = user;

    const location = useLocation();
    const toast = useToast();

    useEffect(()=>{
       if(updateSuccess){
        toast({description:'Changes updated successfully',status:'success', isClosable:true})
        dispatch(resetUpdateSuccess())
       }
    },[updateSuccess,toast,dispatch]);

  return userInfo ? 
    
      <Formik
      initialValues={{
        name:userInfo.name,
        email:userInfo.email,
          
      }}
      validationSchema={
        Yup.object({
            name:Yup.string().required('Name is required.'),
            email:Yup.string().email('Invalid email.').required('An email address is required.'),
           
        })
      }
      onSubmit = {(values)=>{
        // console.log(values)
        
         dispatch(updateProfile(userInfo._id,values.name,values.email))
      }}
    >
     {
        (formik)=>(
            <Box minH='100vh' maxW={{base:'3xl',lg:'3xl'}} mx='auto' px={{base:'4',md:'8',lg:'12'}}
            py={{base:'6',md:'8',lg:'12'}}>
            <Stack direction={{base:'column',lg:'row'}} align={{lg:'flex-start'}}>
              <Stack pr={{base:'0',md:'10'}} flex='1.5' 
              mb={{base:'2xl',md:'none'}} >
                 <HStack alignItems={'center'} justify='space-between'>
                 <Heading fontSize='2xl' fontWeight='extrabold' >
                       Profile
                       
                 </Heading>
                       <Text>You can update your profile</Text>

                 </HStack>
                 <Stack spacing='6'>
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
   </FormControl>
</Stack>
<Stack spacing='6'>
<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading}  type='submit'>
        save
      </Button>
      </Stack>
                    </Stack>

      
                 </Stack>
                 
              </Stack>
              
            </Stack>

            </Box>
        )
     }    
    </Formik>
  :
  <Navigate to='/login'  replace={true} state={{ from:location}}/>
}

export default ProfileScreen