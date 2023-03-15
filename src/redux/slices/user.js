import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    error:null,
    userInfo:JSON.parse(localStorage.getItem('userInfo')  ?? null),
    updateSuccess:false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setLoading: (state,{payload})=>{
            state.loading = true;
        },
        setError : (state,{payload})=>{
            state.error = payload;
            state.loading = false;
        },
        userLogin : (state,{payload})=>{
           state.userInfo = payload;
           state.loading = false;
           state.error = null;
        },
        userLogout :(state)=>{
            state.userInfo =null;
           state.loading = false;
           state.error = null;
        },
        userRegister : (state,{payload})=>{
            state.userInfo = payload;
            state.loading = false;
            state.error = null;
         }, 
         updateUserProfile : (state,{payload})=>{
            state.userInfo = payload;
            state.updateSuccess= true;
            state.loading = false;
            state.error = null;
         },
         resetUpdate: (state)=>{
            state.updateSuccess=false;
         }
    }
})

export const {setLoading,setError,userLogin,userLogout,userRegister,updateUserProfile,resetUpdate} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state)=> state.user;
