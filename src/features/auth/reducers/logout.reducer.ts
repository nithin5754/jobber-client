



import {  IReduxLogout } from "../interfaces/auth.interface";
import { createSlice,  Slice } from "@reduxjs/toolkit";
import { RootState } from "src/store/store";





const initialValue:boolean= true



const logoutSlice:Slice=createSlice({
  name:'logout',
  initialState:initialValue,
  reducers:{
    updateLogout:(state:boolean,action:IReduxLogout):boolean=>{

      state=action.payload;
      return state
           
    },
    logout:(state:boolean):boolean=>{
       return state
    }
  }
})


export const {updateLogout,logout}=logoutSlice.actions


 export const useUserLogout=(store:RootState)=>store.logout
export default logoutSlice.reducer