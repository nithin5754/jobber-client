import { IResponse } from 'src/shared/shared.interface';
import {  apiSlice } from 'src/store/api';
import { IReview } from '../interfaces/review.interface';



export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReviewsByGigId: build.query<IResponse, string>({
      query: (gigId: string) => `review/review/review-gig/${gigId}`,
      providesTags: ['Review']
    }),
    getReviewsBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `review/review/review-seller/${sellerId}`,
      providesTags: ['Review']
    }),
    addReview: build.mutation<IResponse, { body: IReview }>({
      query({ body }) {
        return {
          url: 'review/review-create',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Review']
    })
  })
});

export const { useGetReviewsByGigIdQuery, useGetReviewsBySellerIdQuery, useAddReviewMutation } = reviewApi;
