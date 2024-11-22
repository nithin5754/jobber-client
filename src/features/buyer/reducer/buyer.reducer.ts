import { createSlice, Slice } from '@reduxjs/toolkit';
import { IBuyer, IReduxBuyer } from '../interfaces/buyer.interfaces';
import { initialBuyerDetailsValue } from 'src/shared/utils/static.data';
import { RootState } from 'src/store/store';

const initialValue: IBuyer = initialBuyerDetailsValue as IBuyer;

const BuyerSlice: Slice = createSlice({
  name: 'buyer',
  initialState: initialValue,
  reducers: {
    addBuyer: (state: IBuyer, action: IReduxBuyer) => {
      state = { ...(action.payload as IBuyer) };
      return state;
    },
    emptyBuyer: (state: IBuyer, _action) => {
      state = initialBuyerDetailsValue as IBuyer;
      return state;
    }
  }
});

export const { addBuyer, emptyBuyer } = BuyerSlice.actions;

export const useGetBuyerDetails=((store:RootState)=>store.buyer)

export default BuyerSlice.reducer;
