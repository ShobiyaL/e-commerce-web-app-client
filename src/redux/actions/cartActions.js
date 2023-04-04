import axios from 'axios';
import {setLoading,setError,addCartItem,removeCartItem,setExpressShipping,clearCart} from '../slices/cart';

export const addItemToCart = (id,qty) => async (dispatch)=>{
    dispatch(setLoading(true));
    try{
        const {data} = await axios.get(`https://e-commerce-web-app-server.vercel.app/api/public/products/${id}`);
        const itemsToAdd = {
            id:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            stock:data.stock,
            qty,
        }
     dispatch(addCartItem(itemsToAdd))
    }catch(error){
        console.log(error)
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message :
             error.message?error.message : "Error "
        ))
    }

};

export const removeItemFromCart =(id)=> async(dispatch)=>{
    dispatch(setLoading(true));
    
    dispatch(removeCartItem(id));
}

export const setExpress = (value) => async(dispatch)=>{
    dispatch(setExpressShipping(value))
}

export const resetCart = () =>( dispatch)=>{
 dispatch(clearCart())
}