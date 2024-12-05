

import { createSlice, Slice } from '@reduxjs/toolkit';
import { IReduxHeader } from '../interface/header.interface';
import { RootState } from 'src/store/store';



const initialValue = 'index';

const headerSlice: Slice = createSlice({
  name: 'header',
  initialState: initialValue,
  reducers: {
    updateHeader: (state: string, action: IReduxHeader): string => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateHeader } = headerSlice.actions;

export const useHeaderType=(store:RootState)=>store.header
export default headerSlice.reducer;
