import axios from "axios";
import {setLoading,setError,userLogin, userLogout,userRegister
,updateUserProfile,resetUpdate,setUserOrders} from '../slices/user';

export const login = (email,password) => async(dispatch)=>{
     dispatch(setLoading(true))
     try {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post('https://e-commerce-web-app-server.vercel.app/api/public/users/login',
    {email,password},
     config)
    dispatch(userLogin(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
     } catch (error) {
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        ))
     }
}

export const logout = ()=> (dispatch)=>{
    
    localStorage.removeItem('userInfo');
    dispatch(userLogout());
}

export const register = (name,email,password)=> async(dispatch)=>{
    dispatch(setLoading(true))
    try {
   const config = {
       headers:{
           'Content-Type': 'application/json'
       }
   }
   const {data} = await axios.post('https://e-commerce-web-app-server.vercel.app/api/public/users/register',
   {name,email,password},
    config)
   dispatch(userRegister(data))
   localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
       console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
    }
}

export const updateProfile = (id,name,email)=> async(dispatch,getState)=>{
    
    const {user:{ userInfo },} = getState()
    

    try {
   const config = {
       headers:{
           Authorization: `Bearer ${userInfo.token}`,
           'Content-Type': 'application/json'
       }
   }
   const {data} = await axios.put(`https://e-commerce-web-app-server.vercel.app/api/protected/users/updateProfile/${id}`,
   {_id:id,name,email},
    config)
 
   localStorage.setItem('userInfo', JSON.stringify(data));
   dispatch(updateUserProfile(data))

    } catch (error) {
       console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
    }
}

export const resetUpdateSuccess = ()=> async(dispatch)=>{
    dispatch(resetUpdate());
}

export const getUserOrders = ()=> async(dispatch,getState)=>{
    dispatch(setLoading(true))

    const {user:{ userInfo },} = getState()
    
    try{
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }
    const {data} = await axios.get(`https://e-commerce-web-app-server.vercel.app/api/protected/orders/users/${userInfo._id}`,config)
    console.log(data,"orders placed by the users")
    dispatch(setUserOrders(data))
}catch(error){
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        )) 
    }
}