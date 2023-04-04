import React,{useState} from 'react'
import { Tr,Td,Textarea,Button,VStack,Tooltip,Input,Switch,FormControl,FormLabel,Text,Badge } from '@chakra-ui/react'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { uploadProduct } from '../redux/actions/adminActions'

const AddNewProduct = () => {
    const dispatch = useDispatch()
    const [brand,setBrand] = useState('')
const [name,setName] = useState('')
const [category,setCategory] = useState('')
const [stock,setStock] = useState('')
const [price,setPrice] = useState('')
const [productIsNew,setProductIsNew] = useState(true)
const [description,setDescription] = useState('')
const [image,setImage] = useState('')

const createNewProduct=()=>{
    dispatch(uploadProduct({brand, name ,category,price,image,stock,productIsNew,description}))
}
  return (
    <Tr>
        <Td>
            <Text fontSize='sm'>
Image 
            </Text>
            <Tooltip label={'set image'}>
                <Input size='sm' value={image } onChange={(e)=>setImage(e.target.value)}
                placeholder='image name'/>
            </Tooltip>
        </Td>
        <Td>
        <Text fontSize='sm'>
Description
            </Text>
            <Textarea w='270px' h='120px' value={description} onChange={(e)=>setDescription(e.target.value)}
            placeholder='description' size='sm'/>
        </Td>
        <Td>
        <Text fontSize='sm'>
Brand
            </Text>
            <Input size='sm' value={brand } onChange={(e)=>setBrand(e.target.value)}
                placeholder='brand '/>
                <Text fontSize='sm'>
Name
            </Text>
                <Input size='sm' value={name} onChange={(e)=>setName(e.target.value)}
                placeholder='product name '/>
        </Td>
        <Td>
        <Text fontSize='sm'>
Category
            </Text>
            <Input size='sm' value={category } onChange={(e)=>setCategory(e.target.value)}
                placeholder='category '/>
                <Text fontSize='sm'>
Price
            </Text>
                <Input size='sm' value={price} onChange={(e)=>setPrice(e.target.value)}
                placeholder='price '/>
        </Td>
        <Td>
        <Text fontSize='sm'>
Stock
            </Text>
            <Input size='sm' value={stock } onChange={(e)=>setStock(e.target.value)}
                />
                <Text fontSize='sm'>
New badge to show on the product card
            </Text>
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
        </Td>
        <Td>
            <VStack>
                <Button variant='outline' w='160px' colorScheme='orange' onClick={createNewProduct}>
<MdOutlineDriveFolderUpload/>
<Text ml='2'>Add Product</Text>
                </Button>
            </VStack>
        </Td>
        

    </Tr>
  )
}

export default AddNewProduct