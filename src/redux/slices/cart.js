import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState)=>{
    let result =0;
    cartState.map((item)=>(
        result += item.price * item.qty
    ))
    return Number(result).toFixed(2);
}


const initialState ={
    loading:false,
    error:null,
    cart:JSON.parse(localStorage.getItem('cartItems')) ?? [],
    subtotal:localStorage.getItem('cartItems') ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) :0 ,
    expressShipping:false,
};

const updateLocalStorage = (cart)=>{
     localStorage.setItem('cartItems', JSON.stringify(cart));
     localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)))
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.loading = true;
        },
        addCartItem:(state,{payload})=>{
            state.loading= false;
            state.error=null;
            
            const existingItem = state.cart.find((item)=>  item.id === payload.id);
            console.log(existingItem);
            if(existingItem){
                state.cart = state.cart.map((item)=> {
                    console.log(item.id) 
                return item.id === existingItem.id ? payload : item
                })
            }else{
                state.cart = [...state.cart,payload]
            }
            updateLocalStorage(state.cart);
            state.subtotal = calculateSubtotal(state.cart);
        },
        setError:(state,{payload})=>{
            state.error = payload;
            state.loading = false;
        },
        removeCartItem:(state,{payload})=>{
           state.cart = [...state.cart].filter((item)=> item.id !== payload);
           updateLocalStorage(state.cart);
           state.subtotal = calculateSubtotal(state.cart)
           state.error=null
           state.loading=false
        }
    }
});

export const {setLoading,addCartItem,setError,removeCartItem} = cartSlice.actions;

export default  cartSlice.reducer;

 export const cartSelector = (state) => state.cart;