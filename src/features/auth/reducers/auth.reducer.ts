import { initialAuthUserValues } from 'src/shared/utils/static.data';
import { IAuthSliceType, IAuthUser, IReduxAddAuthUser } from '../interfaces/auth.interface';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

const initialValue: IAuthSliceType = {
  authInfo: initialAuthUserValues as IAuthUser,
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
      authInfo: IAuthUser;
      token: string|null ;
    } => {
      state = { ...action.payload } as  IAuthSliceType;
      return state;
    },


    updateAuthUser: (
      state: IAuthSliceType,
      action: PayloadAction<IAuthUser>
    ) => {
      state.authInfo=action.payload
      return state;
    },
    clearAuthUser: () => {
      return {
        authInfo: initialAuthUserValues as IAuthUser,
        token: null
      };
    }
  }
});

export const { addAuthUser, clearAuthUser,updateAuthUser } = authSlice.actions;


export const useAuthDetails = (store: RootState) => store.auth.authInfo;
export const useCurrentToken=(store:RootState)=>store.auth.token
export const useAuthUserName = (store: RootState) => store.auth.authInfo.username;
export default authSlice.reducer;
