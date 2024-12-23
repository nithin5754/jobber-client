import { IResponse } from 'src/shared/shared.interface';
import { apiSlice } from 'src/store/api';
import { ISellerGig } from '../interface/gigi.interface';

export const sellerGigApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGigById: build.query<IResponse, string>({
      query: (gigId: string) => `gig/gigId/${gigId}`,
      providesTags: ['Gigs']
    }),
    getGigsBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/gig-sellerId/${sellerId}`,
      providesTags: ['Gigs']
    }),
    getSellerPausedGigs: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/gig-pause/${sellerId}`,
      providesTags: ['Gigs']
    }),
    createGig: build.mutation<IResponse, FormData>({
      query(formData: FormData) {
        return {
          url: 'gig/create-gig',
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['Gigs']
    }),


    updateGig: build.mutation<IResponse, { gigId: string; gig: ISellerGig }>({
      query({ gigId, gig }) {
        return {
          url: `gig/update-gig/${gigId}`,
          method: 'PUT',
          body: gig
        };
      },
    }),
    getTopRatedGigsByCategory: build.query<IResponse, string>({
      query: (username: string) => `gig/top/${username}`,
      providesTags: ['Gigs']
    }),

    deleteGig: build.mutation<IResponse, { gigId: string; sellerId: string }>({
      query({ gigId, sellerId }) {
        return {
          url: `gig/delete-gig/${gigId}/${sellerId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Gigs']
    }),

    updateActiveGig: build.mutation<IResponse, { gigId: string; active:boolean }>({
      query({ gigId, active }) {
        return {
          url: `gig/update-gig-active/${gigId}`,
          method: 'PUT',
          body: { active }
        };
      },
      invalidatesTags: ['Gigs']
    }),

    getMoreGigsLikeThis: build.query<IResponse, string>({
      query: (gigId: string) => `gig/similar-gig/${gigId}`,
      providesTags: ['Gigs']
    }),
    getGigsByCategory: build.query<IResponse, string>({
      query: (category: string) => `gig/category/${category}`,
      providesTags: ['Gigs']
    })
  })
});

export const {
  useCreateGigMutation,
  useGetGigByIdQuery,
  useGetGigsBySellerIdQuery,
  useGetMoreGigsLikeThisQuery,
  useGetGigsByCategoryQuery,
  useUpdateGigMutation,
  useDeleteGigMutation,
  useUpdateActiveGigMutation,
  useGetSellerPausedGigsQuery
} = sellerGigApi;
// 