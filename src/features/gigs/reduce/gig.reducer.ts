






import { createSlice,  Slice } from "@reduxjs/toolkit";

import { RootState } from "src/store/store";
import { IReduxSellerGig } from "../interface/gigi.interface";




const initialValue:boolean= true



const GigSlice:Slice=createSlice({
  name:'gig',
  initialState:initialValue,
  reducers:{
    updateLogout:(state:boolean,action:IReduxSellerGig):boolean=>{

      state=action.payload;
      return state
           
    },
    logout:(state:boolean):boolean=>{
       return state
    }
  }
})


export const {updateLogout,logout}=GigSlice.actions


 export const useUserLogout=(store:RootState)=>store.logout
export default GigSlice.reducer