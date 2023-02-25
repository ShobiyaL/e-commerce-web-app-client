import axios from "axios"; 

import {setProducts,setLoading,setError,setProduct} from '../slices/products';


export const getProducts = ()=> async (dispatch)=>{
    dispatch(setLoading(true))
    try {
        const {data}= await axios.get('http://localhost:8001/api/public/products');
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
    dispatch(setLoading(true));
    try {
       
        const {data}= await axios.get(`http://localhost:8001/api/public/products/${id}`);
        dispatch(setProduct(data))
    } catch (error) {
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error"
        ))
    }
}