import React,{useState,useRef} from 'react'
import {   Tr,
    Td,
    Button,
    Image,
    VStack,
    Textarea,
    Tooltip,
    Input,
    Flex,
    FormControl,
    FormLabel,
    Switch,
    Badge,
    useDisclosure,} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateProduct, deleteProduct } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const ProductTableItem = ({product}) => {
    // console.log(product._id)
    const dispatch = useDispatch()
const cancelRef = useRef()
const {isOpen,onOpen,onClose} = useDisclosure()
const [brand,setBrand] = useState(product.brand)
const [name,setName] = useState(product.name)
const [category,setCategory] = useState(product.category)
const [stock,setStock] = useState(product.stock)
const [price,setPrice] = useState(product.price)
const [productIsNew,setProductIsNew] = useState(product.productIsNew)
const [description,setDescription] = useState(product.description)
const [image,setImage] = useState(product.image)

const onSaveProduct = ()=>{
    dispatch(updateProduct(brand, name ,category,product._id,price,image,stock,productIsNew,description))
}
const openDeleteConfirmBox =()=>{
onOpen()
}
  return (
    <>
    <Tr>
        <Td>
            <Input size='sm' value={image} onChange={(e)=>setImage(e.target.value)}/>
            <Tooltip label={product.image} fontSize='small' >
                <Image src={product.image} boxSize='100px' fit='contain'/>
            </Tooltip>
        </Td>
        <Td>
            <Textarea w='270px' h='120px' value={description} onChange={(e)=>setDescription(e.target.value)}
            size='sm'/>

            
        </Td>
        <Td>
            <Flex direction='column' gap='2'>
            <Input size='sm' value={brand} onChange={(e)=>setBrand(e.target.value)}/>
            <Input size='sm' value={name} onChange={(e)=>setName(e.target.value)}/>
            </Flex>
        </Td>
        <Td>
            <Flex direction='column' gap='2'>
            <Input size='sm' value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <Input size='sm' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </Flex>
        </Td>
        <Td>
            <Flex direction='column' gap='2'>
            <Input size='sm' value={stock} onChange={(e)=>setStock(e.target.value)}/>
            <FormControl display='flex' alignItems='center'>
<FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='small' >
Enable
<Badge rounded='full' px='1px' mx='1px' colorScheme='green' fontSize='0.8em'>
    New
</Badge>
badge ? 
</FormLabel>
<Switch id='productIsNewFlag ' isChecked={productIsNew} onChange={()=>setProductIsNew(!productIsNew)} />


            </FormControl>
            </Flex>
        </Td>
        <Td>
           <VStack>
            <Button colorScheme='red' w='160px' varaint='outline' onClick={()=>openDeleteConfirmBox()}>
<DeleteIcon m='5px'/>
Remove product
            </Button>
            <Button colorScheme='orange' w='160px' varaint='outline' onClick={onSaveProduct}>
<MdOutlineDataSaverOn style={{marginRight:'5px'}}/>
Save changes
            </Button>
           </VStack>
        </Td>
    </Tr>
    <ConfirmRemovalAlert
isOpen={isOpen}
onOpen={onOpen}
onClose={onClose}
cancelRef={cancelRef}
itemToDelete={product}
deleteAction={deleteProduct}
/>
    </>
  )
}

export default ProductTableItem