import axios from 'axios';
import {getUsers,userDelete,resetError,setError} from '../slices/admin';


export const getAllUsers = () => async(dispatch,getState)=>{
   
   const {
  
    user:{userInfo},
   } = getState();

//   console.log(userInfo.token)

   try {
    const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.get('http://localhost:8001/api/admin/users',
    config)
// console.log(data)
   dispatch(getUsers(data))

   } catch (error) {
    console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
   }
}

export const deleteUser = (id) => async(dispatch,getState)=>{
     
   const {
  
    user:{userInfo},
   } = getState();
   try {
    const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.delete(`http://localhost:8001/api/admin/users/${id}`,
    config)
console.log(data)
   dispatch(userDelete(data))

   } catch (error) {
    console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
   }
}

export const resetErrorAndRemoval = () =>async(dispatch)=>{
    dispatch(resetError())
}