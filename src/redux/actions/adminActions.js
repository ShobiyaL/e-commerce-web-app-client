import axios from 'axios';
import {getUsers,userDelete,resetError,setError, setLoading,orderDelete,getOrders,setDeliveredFlag
} from '../slices/admin';
import {setProducts,setProductUpdateFlag,setReviewRemovalFlag} from '../slices/products'

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
    const {data} = await axios.get('https://e-commerce-web-app-server.vercel.app/api/admin/users',
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
    const {data} = await axios.delete(`https://e-commerce-web-app-server.vercel.app/api/admin/users/${id}`,
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

export const getAllOrders = () => async(dispatch,getState)=>{
   dispatch(setLoading(true))
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
     const {data} = await axios.get('https://e-commerce-web-app-server.vercel.app/api/admin/orders',
     config)
//  console.log(data)
    dispatch(getOrders(data))
 
    } catch (error) {
    //  console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error,Orders could not be fetched"
        ))
    }
 }

 export const deleteOrder = (id) => async(dispatch,getState)=>{
     
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
     const {data} = await axios.delete(`https://e-commerce-web-app-server.vercel.app/api/admin/orders/${id}`,
     config)
//  console.log(data)
    dispatch(orderDelete(data))
 
    } catch (error) {
     console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        ))
    }
 }

 export const setDelivered = (id) => async(dispatch,getState)=>{ 
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
     const {data} = await axios.put(`https://e-commerce-web-app-server.vercel.app/api/admin/orders/update/${id}`,{},
     config)
 console.log(data)
    dispatch(setDeliveredFlag())
 
    } catch (error) {
     console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error,Couldn't update"
        ))
    }
 }
//Create produc
export const uploadProduct = (newProduct) => async(dispatch,getState)=>{
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
        const {data} = await axios.post(`https://e-commerce-web-app-server.vercel.app/api/admin/products/create`,newProduct,
        config)
   //  console.log(data)
       dispatch(setProducts(data))
       dispatch(setProductUpdateFlag())
    
       } catch (error) {
        console.log(error)
           dispatch(setError(
               error.response && error.response.data.message ? error.response.data.message :
                error.message?error.message : "Error,Could not create product"
           ))
       }
}
//Delete Product
export const deleteProduct = (id) => async(dispatch,getState)=>{
     
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
     const {data} = await axios.delete(`https://e-commerce-web-app-server.vercel.app/api/admin/products/${id}`,
     config)
//  console.log(data)
    dispatch(setProducts(data))
 dispatch(setProductUpdateFlag())
 dispatch(resetError())
    } catch (error) {
     console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error,Product could not be removed"
        ))
    }
 }
//Update Product
export const updateProduct = (brand, name ,category,id,price,image,stock,productIsNew,description) => async(dispatch,getState)=>{
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
        const {data} = await axios.put(`https://e-commerce-web-app-server.vercel.app/api/admin/products/update`,{brand,name,category,id,price,image,stock,productIsNew,description},
        config)
   //  console.log(data)
       dispatch(setProducts(data))
       dispatch(setProductUpdateFlag())
    
       } catch (error) {
        console.log(error)
           dispatch(setError(
               error.response && error.response.data.message ? error.response.data.message :
                error.message?error.message : "Error"
           ))
       }
}

export const removeReview = (productId,reviewId)=>async(dispatch,getState)=>{
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
        const {data} = await axios.put(`https://e-commerce-web-app-server.vercel.app/api/admin/reviews/${productId}/${reviewId}`,{},
        config)
   //  console.log(data)
       dispatch(setProducts(data))
       dispatch(setReviewRemovalFlag())
    
       } catch (error) {
        console.log(error)
           dispatch(setError(
               error.response && error.response.data.message ? error.response.data.message :
                error.message?error.message : "Error,Review could not be removed"
           ))
       }
}

export const resetErrorAndRemoval = () =>async(dispatch)=>{
    dispatch(resetError())
}