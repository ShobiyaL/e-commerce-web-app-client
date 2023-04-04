import React,{useEffect,useRef,useState} from 'react'
import { Box,TableContainer,Thead,Th,Tr
,Table,Td,Tbody,useDisclosure,Alert,Text,Flex,Stack,Spinner,Button,AlertIcon,AlertDescription,AlertTitle,Wrap,useToast } from '@chakra-ui/react'
 import {CheckCircleIcon,DeleteIcon,} from '@chakra-ui/icons'
 import {TbTruckDelivery} from 'react-icons/tb'
import { useDispatch,useSelector } from 'react-redux'
import { getAllOrders,deleteOrder,resetErrorAndRemoval, setDelivered } from '../redux/actions/adminActions'
import ConfirmRemovalAlert from './ConfirmRemovalAlert'


const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
 
  const { error, loading, orderRemoval, orders,deliveredFlag } = admin;
  // console.log(orders)
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({ description: 'Order has been removed.', status: 'success', isClosable: true });
    }
    if (deliveredFlag) {
      toast({ description: 'Order has set to delivered ', status: 'success', isClosable: true });
    }
  }, [orderRemoval, dispatch, toast,deliveredFlag]);

const openDeleteConfirmBox = (order)=>{
  // console.log(user)
  setOrderToDelete(order)
  onOpen()
}
const onSetToDelivered =(order)=>{
    dispatch(setDelivered(order._id))
    dispatch(resetErrorAndRemoval())
}
  return (
    <Box>
      {
        error && (
          <Alert status='error'>
            <AlertIcon/>
            <AlertTitle>
              Oops!
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )
      }
      {
        loading ? (
          <Wrap justify='center'>
<Stack direction='row' spacing={4}>
  <Spinner mt='20' thickness='2px' speed='0.65s' size='xl'></Spinner>
</Stack>
          </Wrap>
        ) :(
          <Box>
<TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Date</Th>
      <Th>Name</Th>
      <Th>Email</Th>
      <Th>ShippingInfo</Th>
      <Th>Items Ordered</Th>
      <Th>Shipping Price</Th> 
      <Th>Total</Th>  
      <Th>Delivered</Th>  

      </Tr>
    </Thead>
    <Tbody>
      {
        orders && orders.map((order)=>{
          return <Tr key={order._id}>

<Td>{new Date(order.createdAt).toDateString()}</Td>
<Td>{order.username}</Td>
<Td>{order.email}</Td>
<Td>
<Text><i>Address:</i>{order.shippingAddress.address}</Text>
<Text><i>City:</i>{order.shippingAddress.postalCode} {order.shippingAddress.city}</Text>

<Text><i>Country:</i>{order.shippingAddress.country}</Text>
</Td>
<Td>{order.orderItems.map((item)=>{
    return <Text key={item._id}>
        {item.qty} {item.name}
    </Text>
})
        }
        </Td>
        <Td>₹{order.shippingPrice}</Td>
        <Td>₹{order.totalPrice}</Td>
        <Td>{order.isDelivered ? <CheckCircleIcon /> : 'Pending'}</Td>
        <Td>
            <Flex direction='column'>
<Button variant='outline' onClick={()=>openDeleteConfirmBox(order)}>
    <DeleteIcon mr='5px' />
    Remove Order
</Button>
{
    !order.isDelivered && (<Button mt='4px' variant='outline' onClick={()=>onSetToDelivered(order)}>
        <TbTruckDelivery/>
        <Text ml='5px'>Delivered</Text>
    </Button>)
}
            </Flex>
        </Td>

          </Tr>
        })
      }
    </Tbody>
  </Table>
</TableContainer>
<ConfirmRemovalAlert
isOpen={isOpen}
onOpen={onOpen}
onClose={onClose}
cancelRef={cancelRef}
itemToDelete={orderToDelete}
deleteAction={deleteOrder}
/>
            </Box>
        )
      }
    </Box>
  )
}

export default OrdersTab