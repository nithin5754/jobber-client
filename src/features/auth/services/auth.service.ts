
import { apiSlice } from 'src/store/api';

import { AUTH_API_ENDPOINTS } from 'src/shared/utils/constant.api';
import { IResponse } from 'src/shared/shared.interface';
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
          method:'PUT',
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
    }),


    checkCurrentUser: build.query<IResponse, void>({
      query: () => AUTH_API_ENDPOINTS('CURRENT_USER'),
      providesTags: ['Currentuser']
    }),


    
    logout: build.mutation<IResponse, void>({
      query() {
        return {
          url: 'auth/signout',
          method: 'POST',
          body: {}
        };
      },
      invalidatesTags: ['Auth']
    }),

    resendEmail: build.mutation<IResponse, {email:string}>({
      query({email}:{email:string}) {
        return {
          url: AUTH_API_ENDPOINTS('RESEND_EMAIL'),
          method: 'PUT',
          body: {email}
        };
      },
      invalidatesTags: ['Currentuser']
    }),
    refresh:build.query<IResponse,void>({
      query:()=>'auth/refresh',
      providesTags: ['Auth']
    })

})
});

export const { 
  useSignUpMutation,
  useVerifyEmailMutation,
  useSigInMutation ,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckCurrentUserQuery,
  useLogoutMutation,
  useResendEmailMutation
} = authApi;
