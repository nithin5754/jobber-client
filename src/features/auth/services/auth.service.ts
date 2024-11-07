
import { apiSlice } from 'src/store/api';

import { AUTH_API_ENDPOINTS } from 'src/shared/utils/constant.api';
import { IResponse } from 'src/shared/shared.inferface';
import { IResetPassword } from '../interfaces/auth.interface';

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
      },
      invalidatesTags: ['Auth']
    }),
    forgotPassword:build.mutation<IResponse,string>({
      query(email:string){
        return {
          url :AUTH_API_ENDPOINTS('FORGOT_PASSWORD'),
          method:'POST',
          body:{email}
        }
      },
      invalidatesTags: ['Auth']
    }),

  resetPassword:build.mutation<IResponse,IResetPassword>({
      query(data:IResetPassword){
        return {
          url :AUTH_API_ENDPOINTS('RESET_PASSWORD',data.token),
          method:'PUT',
          body:{password:data.password,confirmPassword:data.confirmPassword}
        }
      },
      invalidatesTags: ['Auth']
    })


})
});

export const { 
  useSignUpMutation,
  useVerifyEmailMutation,
  useSigInMutation ,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
