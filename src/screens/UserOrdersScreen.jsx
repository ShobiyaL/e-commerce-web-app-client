import React,{useEffect} from 'react'
import { List,ListItem,TableContainer,Stack,Spinner,Alert,AlertTitle,AlertDescription,AlertIcon,Table,Tbody
,Th,Thead,Tr,Td,Button,UnorderedList,Wrap } from '@chakra-ui/react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserOrders } from '../redux/actions/userActions'
import { Navigate,useLocation } from 'react-router-dom'


const UserOrdersScreen = ()=>{
const dispatch = useDispatch()
const user = useSelector((state)=>state.user)
const {loading,error,orders,userInfo}= user
console.log(orders)
const location = useLocation()

useEffect(()=>{
    if(userInfo){
        dispatch(getUserOrders())
    }
},[dispatch,userInfo])

    return userInfo ? (<>
         {
        loading ? (
            <Wrap justify='center' direction='column' align='center' minH='100vh' mt='20px'>
          <Stack direction='row' spacing='4'>
            <Spinner mt='20px'  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'/>
          </Stack>
          </Wrap>
          ) :
           error ? (
            
              <Alert status='error' >
                <AlertIcon/>
                <AlertTitle>OOPS!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
             
            ) :
        (
            orders && (
                <TableContainer minH='100vh'>
<Table variant='striped'>
<Thead>
    <Tr>
        <Th>Order Id</Th>
        <Th>Order Date</Th>
        <Th>Paid Total</Th>
        <Th>Items</Th>
        
    </Tr>
</Thead>
<Tbody>
    {
        orders.map((order)=>(
            <Tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>{new Date(order.createdAt).toDateString()}</Td>
                <Td>₹{order.totalPrice}</Td>
                <Td>
                    {
                        order.orderItems.map((item) =>(
                            <UnorderedList key={item.id}>
                                <ListItem>{item.qty}-{item.name} (₹{item.price}each)</ListItem>
                            </UnorderedList>
                        ))
                    }
                </Td>
            </Tr>
        ))
    }
</Tbody>
</Table>
                </TableContainer>
            )
        )
      }
    </>) :(
        <Navigate to='/login' replace={true} state={{from:location}}/>
    )
}

export default UserOrdersScreen