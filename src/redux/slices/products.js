import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    products:[],
    product:null,
    reviewSend:false,
    productUpdate:false,
    reviewRemoval:false,
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
        setProductUpdateFlag:(state)=>{
            state.productUpdate =true;
            state.loading=false;
        },
        setReviewRemovalFlag:(state)=>{
            state.reviewRemoval=true;
            state.loading= false;
            state.error= null;
        },
        resetError:(state)=>{
            state.error=null;
            state.reviewSend=false;
            state.productUpdate=false;
            state.reviewRemoval=false;
        }
    }
});

export const {setLoading,setProducts,setError,setProduct,productReviewed,resetError,setProductUpdateFlag,setReviewRemovalFlag} = productsSlice.actions;

export default  productsSlice.reducer;

 export const productSelector = (state) => state.products;