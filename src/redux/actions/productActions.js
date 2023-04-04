import axios from "axios"; 

import {setProducts,setLoading,setError,setProduct,productReviewed,resetError} from '../slices/products';


export const getProducts = ()=> async (dispatch)=>{
    dispatch(setLoading(true))
    try {
        const {data}= await axios.get('https://e-commerce-web-app-server.vercel.app/api/public/products');
        dispatch(setProducts(data))
    } catch (error) {
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        ))
    }
}

export const getProduct = (id) => async(dispatch)=>{
    // console.log(id)
    dispatch(setLoading(true));
    try {
       
        const {data}= await axios.get(`https://e-commerce-web-app-server.vercel.app/api/public/products/${id}`);
        // console.log(data)
        dispatch(setProduct(data))
    } catch (error) {
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        ))
    }
}

export const createProductReview = (productId, userId, comment, rating, title)=> async(dispatch,getState)=>{
    dispatch(setLoading(true))
    const {user:{ userInfo },} = getState()
    
    try {
   const config = {
       headers:{
           Authorization: `Bearer ${userInfo.token}`,
           'Content-Type': 'application/json'
       }
   }
   const {data} = await axios.post(`https://e-commerce-web-app-server.vercel.app/api/protected/products/reviews/${productId}`,
   {comment, userId, rating, title},
    config)
 localStorage.setItem('userInfo', JSON.stringify(data));
 dispatch(productReviewed())

    } catch (error) {
       console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
    }
}

export const resetProductError = ()=> async(dispatch)=>{
    dispatch(resetError())
}