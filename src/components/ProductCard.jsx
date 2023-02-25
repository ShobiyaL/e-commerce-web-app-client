import React,{useState} from 'react'
import {Flex,Circle,Box,Image,Badge,useColorModeValue,Icon,Button,Tooltip,Stack,Link,HStack,Text,useToast} from '@chakra-ui/react'
import {FiShoppingCart} from 'react-icons/fi';
import {Link as ReactLink} from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/actions/cartActions';

const Rating = ({rating,numberOfReviews})=>{
  const [iconSize,setIconSize] = useState('14px');
  return (
    <Flex>
        <HStack spacing='2px'>
            <StarIcon size={iconSize} w='14px' color='orange.500'/>
            <StarIcon size={iconSize} w='14px' color={rating>=2 ? 'orange.500' : 'gray'}/>
            <StarIcon size={iconSize} w='14px' color={rating>=3 ? 'orange.500' : 'gray'}/>
            <StarIcon size={iconSize} w='14px' color={rating>=4 ? 'orange.500' : 'gray'}/>
            <StarIcon size={iconSize} w='14px' color={rating>=5 ? 'orange.500' : 'gray'}/>
        </HStack>
        <Text fontSize='md' fontWeight='bold' ml='4'>
            {
                `${numberOfReviews} ${numberOfReviews===1 ? 'review' : 'reviews'}`
            }
        </Text>
    </Flex>
  )
}

const ProductCard = ({product}) => {
 
  const toast = useToast();

 const dispatch = useDispatch();
 const cartInfo = useSelector((state)=>state.cart);
 const {cart} = cartInfo

  let addToCart = (selectedProductId)=>{
    // console.log(id);
    if(cart.some((cartItem)=>cartItem.id === selectedProductId )){
       toast({
        description:'This product is already in the cart',
        status:'error',
        isClosable: true
       })
    }else{
      dispatch(addItemToCart(selectedProductId,1))
      toast({
        status:'success',
        description:'Item has been added.'
      })
    }
  }

  return (
    <Stack p='2' spacing='3px' bg={useColorModeValue('white','gray.800')}
    minW='240px' h='450px'
    borderWidth='1px'
    rounded='lg'
    shadow='lg'
    position='relative'
    >
    {product.productIsNew && <Circle size='10px' position='absolute' top='2' right='2'
    bg='green.300' />}
    {product.stock <=0 && <Circle size='10px' position='absolute' top='2' right='2'
    bg='red.300' />}
    <Image src={product.image} alt={product.name} roundedTop='lg' />
    <Box flex='1' maxH='5' alignItems='baseline'>
    {product.stock <=0 && (
      <Badge  rounded='full' px='2' fontSize='0.8em' colorScheme='red'>Sold-out</Badge>
    )
    }
    {product.productIsNew  && (
      <Badge  rounded='full' px='2' fontSize='0.8em' colorScheme='green'>Exclusive</Badge>
    )
    }
    </Box>
    <Flex mt='1' justifyContent='space-between' alignContent='center'>
     <Link as={ReactLink} to={`/product/${product._id}`} pt='2' cursor='pointer'>
        <Box fontSize='xl' fontWeight='semibold' lineHeight='tight'>
          {product.name}
        </Box>
     </Link>
    </Flex>
    <Flex py='2' justifyContent='space-between' alignContent='center'>
        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews}/>
    </Flex>
    <Flex justify='space-between'>
        <Box fontSize='xl'
        color={useColorModeValue('gray.800','white')}
        >
          <Box as='span' color='gray.600' fontSize='lg'>₹</Box>
          {product.price.toFixed(2)}
        </Box>
<Tooltip label='Add to cart'  fontSize='1.2em'>
        <Button 
        variant='ghost'
        isDisabled = {product.stock <=0}
        display={'flex'}
        onClick={()=>addToCart(product._id)}> 
            <Icon as={FiShoppingCart} h='7' w='7' alignSelf='center'/>
        </Button>

        </Tooltip>
    </Flex>
    </Stack>
  )
}

export default ProductCard