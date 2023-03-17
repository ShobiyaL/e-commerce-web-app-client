import React from 'react'
import { Modal,ModalOverlay,ModalContent,Button,Alert,AlertDescription,AlertIcon,AlertTitle,Wrap,Stack,useToast, ModalBody
, } from '@chakra-ui/react'
import {Link as ReactLink,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/userActions'


const PaymentSuccessModal = ({isOpen,onClose}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const logoutHandler =()=>{
        dispatch(logout())
        toast({description:'You have logged out',status:'success',isClosable:true})
        navigate('/products')
    }
  return (
    <>
        <Modal size='full' isOpen={isOpen} onClose={onClose} >
<ModalOverlay/>
<ModalContent>
    <ModalBody>
        <Wrap justify='center' align='center' mt='20px' direction='column'>
            <Alert status='success' variant='subtle'
            flexDirection='column' justifyContent='center' alignItems='center'
            height='auto' textAlign='center'
            >
                <AlertIcon boxSize='55px'/>
                <AlertTitle pt='8px' fontSize='xl'>Payment Successful!</AlertTitle>
                <AlertDescription>From here you can go to:</AlertDescription>
                <Stack mt='20px' minW='200px'>
                    <Button as={ReactLink}  to='/user-orders' colorScheme='teal' variant='outline'>Your order</Button>
                    <Button as={ReactLink} to='/products' colorScheme='teal' variant='outline'>Products</Button>
                    <Button  colorScheme='teal' variant='outline' onClick={logoutHandler}>Logout</Button>

                </Stack>
            </Alert>
        </Wrap>
    </ModalBody>
</ModalContent>
        </Modal>
    </>
  )
}

export default PaymentSuccessModal