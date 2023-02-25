import axios from 'axios';
import {setLoading,setError,addCartItem,removeCartItem} from '../slices/cart';

export const addItemToCart = (id,qty) => async (dispatch)=>{
    dispatch(setLoading(true));
    try{
        const {data} = await axios.get(`http://localhost:8001/api/public/products/${id}`);
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