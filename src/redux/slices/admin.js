import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    usersList:null,
    userRemoval:false,    
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
            state.error= false;
            state.usersList=payload;
        },
        userDelete:(state)=>{
            state.loading= true;
            state.error= false;
            state.userRemoval=true;
        },
        resetError:(state)=>{
            state.loading= false;
            state.error= null;
            state.userRemoval=false;
        }
        
    }
})

export const {setLoading, setError,getUsers,userDelete,resetError} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;