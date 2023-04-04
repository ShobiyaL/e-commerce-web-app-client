import React,{useEffect} from 'react'
import { Accordion,AccordionButton,AccordionItem,AccordionPanel,Spacer,Textarea,Box,TableContainer,Thead,Th,Tr
,Table,Td,Tbody,Alert,Text,Flex,Stack,Spinner,Button,AlertIcon,AlertDescription,AlertTitle,Wrap,useToast } from '@chakra-ui/react'

import { useDispatch,useSelector } from 'react-redux'
import { removeReview } from '../redux/actions/adminActions'
import { getProducts,resetProductError } from '../redux/actions/productActions'


const ReviewsTab = () => {
 
 
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
 
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
 
  const {products,reviewRemoval } = productInfo;

  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (reviewRemoval) {
      toast({ description: 'Review has been removed.', status: 'success', isClosable: true });
    }
    
  }, [reviewRemoval, dispatch, toast]);

 const  onRemoveReview =(productId,reviewId)=>{
dispatch(removeReview(productId,reviewId))
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
{
    products.length >0 && products.map((product)=>(
        <Box key={product._id}>
            <Accordion allowToggle>
<AccordionItem>
    <h2>
        <AccordionButton>
            <Box flex='1'>
                <Flex>
                <Text fontWeight='bold' mr='8px'>
{product.name}
</Text> 
<Spacer/>         
<Text fontWeight='bold' mr='8px'>
({
    product.reviews.length 
} Reviews)
</Text>
                </Flex>
            </Box>
        </AccordionButton>
    </h2>
    <AccordionPanel pb='4'>
<TableContainer>
    <Table size='sm'>
        <Thead>
            <Tr>
                <Th>Username</Th>
                <Th>Rating</Th>
                <Th>Title</Th>
                <Th>Comment</Th>
                <Th>Created</Th>
              
            </Tr>
        </Thead>
        <Tbody>
            {
                product.reviews.map((review)=>(
                    <Tr key={review._id}>
<Td>{review.name}</Td>
<Td>{review.rating}</Td>
<Td>{review.title}</Td>
<Td><Textarea isDisabled value={review.comment} size='sm'/></Td>
<Td>{new Date (review.createdAt).toDateString()}</Td>
<Td><Button variant='outline' colorScheme='red' onClick={()=>onRemoveReview(product._id,review._id)}>
    Remove Review</Button></Td>
                    </Tr>
                ))
            }
        </Tbody>
    </Table>
</TableContainer>
    </AccordionPanel>
</AccordionItem>
            </Accordion>
            </Box>
    ))
}
            </Box>
        )
      }
    </Box>
  )
}

export default ReviewsTab