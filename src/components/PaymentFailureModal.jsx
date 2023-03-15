

import React from 'react'
import { Modal,ModalOverlay,ModalContent,Button,Alert,AlertDescription,AlertIcon,AlertTitle,Wrap,Stack,useToast, ModalBody
, } from '@chakra-ui/react'



const PaymentFailureModal = ({isOpen,onClose}) => {
    
  return (
    <>
        <Modal  isOpen={isOpen} onClose={onClose}>
<ModalOverlay/>
<ModalContent>
    <ModalBody>
        <Wrap justify='center' align='center' mt='20px' direction='column'>
            <Alert status='error' variant='subtle'
            flexDirection='column' justifyContent='center' alignItems='center'
            height='auto' textAlign='center'
            >
                <AlertIcon boxSize='55px'/>
                <AlertTitle pt='8px' fontSize='xl'>Payment Failed!</AlertTitle>
                <AlertDescription>Couldn't process your payment</AlertDescription>
                
            </Alert>
        </Wrap>
    </ModalBody>
</ModalContent>
        </Modal>
    </>
  )
}

export default PaymentFailureModal