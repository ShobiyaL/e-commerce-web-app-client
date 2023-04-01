import React from 'react'
import { Box,Stack,Tabs,TabList,Tab,Heading,TabPanels,TabPanel } from '@chakra-ui/react'
import { Navigate, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import UsersTab from '../components/UsersTab'

const AdminConsoleScreen = () => {
    const user = useSelector((state)=>state.user)
    const {userInfo} = user;
const location = useLocation()
  return (
    userInfo && userInfo.isAdmin === 'true' ?
     (
     <Box minH='100vh' p='20px'>
<Stack directio={{base:'column',lg:'row'}} align={{lg:'flex-start'}}>
    <Stack pr={{base:0,md:14}} spacing={{base:8,md:10}} mb={{base:12,md:'none'}} flex='1.5'>
<Heading fontSize='2xl' fontWeight='semi-bold'>Admin Console</Heading>
<Tabs size='md' variant='enclosed'>
<TabList>
    <Tab>Users</Tab>
    <Tab>Products</Tab>
    <Tab>Reviews</Tab>
    <Tab>Orders</Tab>
</TabList>
<TabPanels>
    <TabPanel>
        <UsersTab/>
    </TabPanel>
</TabPanels>
</Tabs>
    </Stack>
</Stack>
     </Box>
     ) : 
    <Navigate to='/login' replace={true} state={{from:location}}/>
    
  )
}

export default AdminConsoleScreen