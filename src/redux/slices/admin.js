import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    usersList:null,
    userRemoval:false, 
    orders:null,
    orderRemoval:false, 
    deliveredFlag:false, 
    
}

export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.loading = true;
        },
        setError : (state,{payload})=>{
            state.error = payload;
            state.loading = false;
        },
        getUsers:(state,{payload})=>{
            state.loading= false;
            state.error= null;
            state.usersList=payload;
        },
        getOrders:(state,{payload})=>{
            state.loading= false;
            state.error= null;
            state.orders=payload;
        },
        userDelete:(state)=>{
            state.loading= false;
            state.error= null;
            state.userRemoval=true;
        },
        orderDelete:(state)=>{
            state.loading= false;
            state.error= null;
            state.orderRemoval=true;
        },
        setDeliveredFlag:(state)=>{
state.deliveredFlag = true;
state.loading=false;
        },
        
        resetError:(state)=>{
            state.loading= false;
            state.error= null;
            state.userRemoval=false;
            state.deliveredFlag=false;
           state.orderRemoval=false;
        }
        
    }
})

export const {setLoading, setError,getUsers,userDelete,resetError,getOrders,orderDelete,setDeliveredFlag,
setReviewRemovalFlag} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;