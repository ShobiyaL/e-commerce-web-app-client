import React from 'react'
import {Box,Flex,HStack,Link,IconButton,Icon,Text,useDisclosure,Button,Stack,useColorModeValue,useColorMode} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import {HamburgerIcon,CloseIcon,MoonIcon,SunIcon} from '@chakra-ui/icons';
import {GiBalloons} from 'react-icons/gi';
import {HiShoppingCart} from 'react-icons/hi'

//defining the links
const links =[
    {linkName:'Products',path:'/products'},
    {linkName:<Icon as={HiShoppingCart}  h='6' w='6'  />,path:'/cart'}
];

//Link comp in the navbar(products,cart)
const NavLink = ({path,children})=>{
    // console.log(children);
   return <Link as={ReactLink} to={path} px='2' py='2' rounded='md' 
    _hover={{textDecoration:'none', bg:useColorModeValue('gray.100','gray.900')}}
    >
        {children}
    </Link>
}
const Navbar = () => {
    const {isOpen,onClose,onOpen} = useDisclosure();
    const {colorMode,toggleColorMode} = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.100','gray.900')} px='5'>
    <Flex h='16' alignItems='center' justifyContent='space-between'>
       <IconButton 
       size='md' 
       icon={ isOpen ? <CloseIcon/> : <HamburgerIcon/> }
       display={{ md:'none'}} 
       onClick={isOpen ? onClose : onOpen}
       />
       <HStack>
        <Link as={ReactLink} to='/' rounded='md' px='2' py='2'
        _hover={{textDecoration:'none', bg:useColorModeValue('gray.100','gray.900')}}>
            <Flex alignItems='center' >
              <Icon as={GiBalloons} h='6' w='6' color='orange.300'/>
              <Text fontWeight='medium'>E-App.</Text>
            </Flex>
        </Link>
        <HStack as='nav' spacing='4' display={{base:'none',md:'flex'}}>
            {
                links.map((link)=>(
                  
                    <NavLink
                    key={link.linkName}
                    path={link.path}
                    >
                    {link.linkName}
                    </NavLink>
                ))
            }
        </HStack>
       </HStack>
       <Flex alignItems='center'>
        <NavLink>
        <Icon as={colorMode==='light' ? MoonIcon : SunIcon } 
        alignSelf='center'
        onClick={()=> toggleColorMode()}
        />
        </NavLink>
    
       <Button as={ReactLink} to='/login' p='2' fontSize='sm' fontWeight={400} >Sign In</Button>
       <Button as={ReactLink} to='/registration' p='2' m='2' fontSize='sm' fontWeight={600}
       _hover={{color:'black'}} 
       bg='#E0144C'
       color='white'
       display={{base:'none',md:'inline-flex'}}
       >
       Sign Up</Button>
       </Flex>
    </Flex>
    {
        isOpen ? (
            <Box pb='4' display={{md:'none'}}>
                <Stack as='nav' spacing='4'>
                {
                links.map((link)=>(
                    <NavLink
                    key={link.linkName}
                    path={link.path}
                    >
                    {link.linkName}
                    </NavLink>
                ))
            }
            <NavLink key='sign up' path='/registration'>Sign Up</NavLink>
                </Stack>
            </Box>
        ):
        null
    }
    </Box>
  )
}

export default Navbar