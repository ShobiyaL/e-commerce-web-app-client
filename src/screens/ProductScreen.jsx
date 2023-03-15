import React,{useEffect,useState} from 'react';
import {Box,Image,Text,Wrap,Stack,Spinner,Alert,AlertIcon,AlertDescription,
AlertTitle, Flex, Badge, Heading, HStack,Button, SimpleGrid,useToast} from '@chakra-ui/react';
import { MinusIcon,StarIcon,SmallAddIcon } from '@chakra-ui/icons';
import {BiPackage,BiCheckShield,BiSupport } from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProduct } from '../redux/actions/productActions';
import { addItemToCart } from '../redux/actions/cartActions';

const ProductScreen = () => {
    const [count,setCount] =useState(1)
    const { id } = useParams();
    const toast = useToast();

    const products = useSelector((state)=>state.products);
    // console.log(products);
    const {loading,error,product } = products;

      const cartContent = useSelector((state)=>state.cart);
      const {cart} = cartContent;

    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(getProduct(id))
    },[dispatch,id,cart]);

    let changeCount = (input)=>{
       if(input === 'minus'){
        setCount (count -1)
       }else if(input ==='plus'){
        setCount (count +1)
       }
    }

    let addItem = (id,count)=>{
       console.log(id,count)
    dispatch(addItemToCart(id,count))
    toast({description:'Item has been added successfully', status: 'success'})
    };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
{
    loading ? (
        <Stack direction='row' spacing='4'>
            <Spinner mt='20px'  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'/>
          </Stack>
        ) : error ? (
            <Alert status='error' >
                <AlertIcon/>
                <AlertTitle>OOPS! Sorry.</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>) : 
             ( product && (
                <Box maxW={{base:'3xl', lg:'5xl'}}
                mx='auto'
                px={{base:'4', md:'8', lg:'12'}}
                py={{base:'6', md:'8', lg:'12'}}>
                <Stack direction={{base:'column',lg:'row'}} align={{lg:'flex-start'}}>
                    <Stack pr={{base:'0',md:'12'}}
                    spacing={{base:'8',md:'4'}}
                    flex='1.5'
                    mb={{base:'12',md:'none'}}>
                    {
                        product.productIsNew &&(
                            <Badge colorScheme={'green'} rounded='full' w='40px' fontSize='0.8em'>
                               New
                            </Badge>
                        )
                    }
                    {
                        product.stock ===0 &&(
                            <Badge colorScheme={'red'} rounded='full' w='100px' fontSize='0.8em'>
                               out of stock
                            </Badge>
                        )
                    }
                    <Heading fontSize="2xl" fontWeight='extrabold'>
                       {product.name}
                    </Heading>
                    <Stack spacing={5}>
                        <Box>
                            <Text fontSize='xl'>${product.price}</Text>
                            <Flex>
                                <HStack spacing='2px'>
                                    <StarIcon color='orange.500'/>
                                    <StarIcon color={product.rating >=2 ? 'orange.500' :'gray.200' }/>
                                    <StarIcon color={product.rating >=3 ? 'orange.500' :'gray.200' }/>
                                    <StarIcon color={product.rating >=4 ? 'orange.500' :'gray.200' }/>
                                    <StarIcon color={product.rating >=5 ? 'orange.500' :'gray.200' }/>
                                    
                                </HStack>
                                <Text fontSize='md' fontWeight='bold' ml='4px'>
{product.numberOfReviews} Reviews
                                </Text>
                            </Flex>
                        </Box>
                        <Text>{product.description}</Text>
                        <Text fontWeight={'bold'}>Quantity</Text>
                        <Flex w='170px' p='5px' border={'1px'} borderColor={'gray.200'} alignItems='center'>
                            <Button isDisabled={count<=1} onClick={()=>changeCount('minus')}>
                                <MinusIcon/>
                            </Button>
                        <Text mx='30px'>{count}</Text>
                        <Button isDisabled={count>= product.stock} onClick={()=>changeCount('plus')}>
                                <SmallAddIcon w='20px' h='25px'/>
                            </Button>
                        </Flex>
                        <Button colorScheme='orange' isDisabled={product.stock === 0} onClick={()=>addItem(product._id,count)}>
                            Add to cart
                        </Button>
                        <Stack w='270px'>
                            <Flex alignItems='center'>
                                <BiPackage size='20px' />
                                <Text fontWeight='medium' fontSize='sm' ml='2'>
                                    Free shipping only if order is above ₹10000
                                </Text>
                            </Flex>
                            <Flex alignItems='center'>
                                <BiCheckShield size='20px' />
                                <Text fontWeight='medium' fontSize='sm' ml='2'>
                                    2 years extende warranty
                                </Text>
                            </Flex>
                            <Flex alignItems='center'>
                                <BiSupport size='20px' />
                                <Text fontWeight='medium' fontSize='sm' ml='2'>
                                    we're here for 24/7*
                                </Text>
                            </Flex>  
                        </Stack>
                    </Stack>
                    </Stack>
                    <Flex direction='column' align='center' flex='1' _dark={{bg:'gray.900'}}>
<Image src={product.image} alt={product.name} mb='30px'/>
                    </Flex>
                </Stack>

                    <Stack>
                        <Text fontSize='xl' fontWeight='bold'>Reviews</Text>
                        <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                         {
                            product.reviews.map((review) =>(
                                <Box key={review._id}>
                                <Flex spacing='2px' alignItems='center'>
                                      <StarIcon color='orange.500'/>
                                      <StarIcon color={review.rating>=2 ? 'orange.500': 'gray.200'}/>
                                      <StarIcon color={review.rating>=3 ? 'orange.500': 'gray.200'}/>
                                      <StarIcon color={review.rating>=4 ? 'orange.500': 'gray.200'}/>
                                      <StarIcon color={review.rating>=5 ? 'orange.500': 'gray.200'}/>
                                      <Text fontWeight='semibold' ml='4px'>{review.title && review.title}</Text>
                                </Flex>
                               <Box py='12px'>
                                {review.comment}
                               </Box>
                               <Text fontSize='sm' color='gray.400'>
                                by {review.name} ,{ new Date (review.createdAt).toDateString()}
                                </Text>
                                </Box>
                               
                            ))
                         }
                        </SimpleGrid>
                    </Stack>
                
                </Box>
              )
             )
}
    </Wrap>
  )
}

export default ProductScreen