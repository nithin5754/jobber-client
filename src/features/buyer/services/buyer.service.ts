import { IResponse } from "src/shared/shared.interface";
import { apiSlice } from "src/store/api";



export const buyerApi=apiSlice.injectEndpoints({
  endpoints:(build)=>({


    getBuyerByEmail:build.query<IResponse,void>({
        query:()=>'buyer/email',
        providesTags: ['Buyer']
      })
  })
})


export const {useGetBuyerByEmailQuery}=buyerApi