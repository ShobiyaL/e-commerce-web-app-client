import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    products:[],
    product:null
};

export const productsSlice = createSlice({
    name:'products',
    initialState,
    //to update the state in the store based on the actions passed in the dispatch function
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
        }
    }
});

export const {setLoading,setProducts,setError,setProduct} = productsSlice.actions;

export default  productsSlice.reducer;

 export const productSelector = (state) => state.products;