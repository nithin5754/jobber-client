

import { IResponse } from "src/shared/shared.interface";
import { apiSlice } from "src/store/api";




export const sellerGigApi=apiSlice.injectEndpoints({
  endpoints:(build)=>({

    getGigById: build.query<IResponse, string>({
      query: (gigId: string) => `gig/gigId/${gigId}`,
      providesTags: ['Gigs']
    }),
    getGigsBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/gig-sellerId/${sellerId}`,
      providesTags: ['Gigs']
    }),
    getSellerPausedGigs: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/pause/${sellerId}`,
      providesTags: ['Gigs']
    }),
    createGig: build.mutation<IResponse, FormData>({
      query(formData: FormData) {
        return {
          url: 'gig/create-gig',
          method: 'POST',
          body:formData
        };
      },
      invalidatesTags: ['Gigs']
    }),
    deleteGig: build.mutation<IResponse, { gigId: string; sellerId: string }>({
      query({ gigId, sellerId }) {
        return {
          url: `gig/${gigId}/${sellerId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Gigs']
    })
  })
})


export const {useCreateGigMutation,useGetGigByIdQuery,useGetGigsBySellerIdQuery}=sellerGigApi