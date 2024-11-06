
import { apiSlice } from 'src/store/api';

import { AUTH_API_ENDPOINTS } from 'src/shared/utils/constant.api';
import { IResponse } from 'src/shared/shared.inferface';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IResponse, FormData>({
      query(formData: FormData) {
        return {
          url: AUTH_API_ENDPOINTS('REGISTER'),
          method: 'POST',
          body:formData
        };
      },
      invalidatesTags: ['Auth']
    }),

    sigIn: build.mutation<IResponse, FormData>({
      query(formData: FormData) {
        return {
          url: AUTH_API_ENDPOINTS('LOGIN'),
          method: 'POST',
          body:formData
        };
      },
      invalidatesTags: ['Auth']
    }),

    verifyEmail:build.mutation<IResponse,string>({
      query(token:string){
        return {
          url :AUTH_API_ENDPOINTS('VERIFY_EMAIL'),
          method:'POST',
          body:{token}
        }
      }
    })
  })
});

export const { useSignUpMutation,useVerifyEmailMutation,useSigInMutation } = authApi;
