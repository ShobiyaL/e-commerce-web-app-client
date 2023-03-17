import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    shippingAddress:null,
    orderInfo:null,    
}

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.loading = true;
        },
        setError : (state,{payload})=>{
            state.error = payload;
            state.loading = false;
        },
        addShippingAddress: (state,{payload})=>{
            state.shippingAddress =payload;
            state.loading = false;
        },
        
        clearOrder:(state)=>{
            state=initialState
        }
    }
})

export const {setLoading, setError,addShippingAddress,clearOrder} = orderSlice.actions;

export default orderSlice.reducer;

export const orderSelector = (state) => state.order;