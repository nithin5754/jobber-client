import { IResponse } from "src/shared/shared.interface";
import { apiSlice } from "src/store/api";



export const buyerApi=apiSlice.injectEndpoints({
  endpoints:(build)=>({


    getBuyerByEmail:build.query<IResponse,void>({
        query:()=>'buyer/email',
        providesTags: ['Buyer']
      }),
      getBuyerByUsername: build.query<IResponse, string>({
        query: (username: string) => `buyer/username/${username}`,
        providesTags: ['Buyer']
      }),
  })
})


export const {useGetBuyerByEmailQuery,useGetBuyerByUsernameQuery}=buyerApi