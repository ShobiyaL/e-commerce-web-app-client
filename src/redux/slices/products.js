import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    products:[],
    product:null,
    reviewSend:false,
};

export const productsSlice = createSlice({
    name:'products',
    initialState,
    //to update the state in the store based on the actions passed from the dispatch function
    reducers:{
        setLoading:(state)=>{
            state.loading = true;
        },
        setProducts:(state,{payload})=>{
            state.loading= false;
            state.error=null;
            state.products = payload;
        },
        setError:(state,{payload})=>{
            state.error = payload;
            state.loading = false;
        },
        setProduct:(state,{payload})=>{
           
            state.product = payload;
            state.loading=false;
            state.error=null;
        },
        productReviewed:(state)=>{
            state.loading= false;
            state.error=null;
            state.reviewSend=true;
        },
        resetError:(state)=>{
            state.error=null;
            state.reviewSend=false;
        }
    }
});

export const {setLoading,setProducts,setError,setProduct,productReviewed,resetError} = productsSlice.actions;

export default  productsSlice.reducer;

 export const productSelector = (state) => state.products;