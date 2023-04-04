import axios from 'axios';
import {setError,addShippingAddress,clearOrder} from '../slices/order';

//address 
export const setShippingAddress = (data) => (dispatch)=>{
    dispatch(addShippingAddress(data));   
}

export const setShippingAddressError = (value) => (dispatch)=>{
    dispatch(setError(value));   
}

export const createOrder = (order) => async(dispatch,getState)=>{
    // console.log(order)
   const {
    order:{shippingAddress},
    user:{userInfo},
   } = getState();

//   console.log(userInfo.token)

   const preparedOrder ={...order,shippingAddress};
// console.log(preparedOrder);
   try {
    const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post('https://e-commerce-web-app-server.vercel.app/api/protected/orders/createOrder',
    preparedOrder,
    config)
    console.log(data,"orders placed");

   } catch (error) {
    console.log(error)
       dispatch(setError(
           error.response && error.response.data.message ? error.response.data.message :
            error.message?error.message : "Error"
       ))
   }
}

export const resetOrder = () => ( dispatch)=>{
    dispatch(clearOrder())
   }