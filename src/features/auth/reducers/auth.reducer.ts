import { initialAuthUserValues } from 'src/shared/utils/static.data';
import { IAuthSliceType, IAuthUser, IReduxAddAuthUser } from '../interfaces/auth.interface';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

const initialValue: IAuthSliceType = {
  details: initialAuthUserValues as IAuthUser,
  token: null
};

const authSlice: Slice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    addAuthUser: (
      state: IAuthSliceType,
      action: IReduxAddAuthUser
    ): {
      details: IAuthUser;
      token: string | null;
    } => {
      state = { ...action.payload } as unknown as IAuthSliceType;
      return state;
    },
    clearAuthUser: () => {
      return {
        details: initialAuthUserValues as IAuthUser,
        token: null
      };
    }
  }
});

export const { addAuthUser, clearAuthUser } = authSlice.actions;

export const useUserDetails = (store: RootState) => store.auth;
export default authSlice.reducer;
