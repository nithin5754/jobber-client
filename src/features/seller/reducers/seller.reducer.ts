import { createSlice, Slice } from '@reduxjs/toolkit';


import { RootState } from 'src/store/store';
import { IReduxSeller, ISeller } from '../interfaces/seller.interface';
import { emptySellerData } from 'src/shared/utils/static.data';

const initialValue: ISeller = emptySellerData as ISeller;

const SellerSlice: Slice = createSlice({
  name: 'seller',
  initialState: initialValue,
  reducers: {
    addSeller: (state: ISeller, action: IReduxSeller) => {
 
       if(action.payload){
        state = { ...(action.payload as ISeller) }
      }
      return state;
    },
    emptySeller: (_state: ISeller, _action) => {
      return  emptySellerData as ISeller;
     
    }
  }
});

export const { addSeller, emptySeller } = SellerSlice.actions;

export const useGetSellerDetails=((store:RootState)=>store.seller)

export default SellerSlice.reducer;
