import { createSlice, Slice } from '@reduxjs/toolkit';


import { RootState } from 'src/store/store';
import { IReduxShowCategory } from '../interface/header.interface';

const initialValue = true;

const categoryContainerSlice: Slice = createSlice({
  name: 'showCategoryContainer',
  initialState: initialValue,
  reducers: {
    updateCategoryContainer: (state: boolean, action: IReduxShowCategory): boolean => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateCategoryContainer } = categoryContainerSlice.actions;
export const useIsCategoryContainerOpen=(store:RootState)=>store.showCategoryContainer
export default categoryContainerSlice.reducer;
