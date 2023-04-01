import React,{useEffect,useRef,useState} from 'react'
import { Box,TableContainer,Thead,Th,Tr
,Table,Td,Tbody,useDisclosure,Alert,Stack,Spinner,Button,AlertIcon,AlertDescription,AlertTitle,Wrap,useToast } from '@chakra-ui/react'
 import {CheckCircleIcon,DeleteIcon} from '@chakra-ui/icons'
import { useDispatch,useSelector } from 'react-redux'
import { getAllUsers,deleteUser,resetErrorAndRemoval } from '../redux/actions/adminActions'
import ConfirmRemovalAlert from './ConfirmRemovalAlert'


const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, usersList } = admin;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({ description: 'User has been removed.', status: 'success', isClosable: true });
    }
  }, [userRemoval, dispatch, toast]);

const openDeleteConfirmBox = (user)=>{
  // console.log(user)
  setUserToDelete(user)
  onOpen()
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
      <Th>Name</Th>
      <Th>Email</Th>
      <Th>Registered</Th>
      <Th>Admin</Th>
      <Th>Action</Th>  
      </Tr>
    </Thead>
    <Tbody>
      {
        usersList && usersList.map((user)=>{
          return <Tr key={user._id}>
<Td fontWeight='semibold'>{user.name} {user._id === userInfo._id ? (" (You)") : '' }</Td>
<Td>{user.email}</Td>
<Td>{new Date(user.createdAt).toDateString()}</Td>
<Td>{user.isAdmin ==='true' ? <CheckCircleIcon color='orange.500' />: ''}</Td>
<Td>
  <Button
  isDisabled={user._id ===userInfo._id}
  variant='outline'
  onClick={()=>openDeleteConfirmBox(user)}
  ><DeleteIcon mr='5px'/>RemoveUser
  </Button>
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
itemToDelete={userToDelete}
deleteAction={deleteUser}
/>
            </Box>
        )
      }
    </Box>
  )
}

export default UsersTab