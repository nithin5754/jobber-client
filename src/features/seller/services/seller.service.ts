import { IResponse } from 'src/shared/shared.interface';
import { apiSlice } from 'src/store/api';
import { ISeller } from '../interfaces/seller.interface';

export const sellerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSellerByUsername: build.query<IResponse, string>({
      query: (username: string) => `seller/username/${username}`,
      providesTags: ['Seller']
    }),

    getSellerById: build.query<IResponse, void>({
      query: () => `seller/id`,
      providesTags: ['Seller']
    }),

    getSellerBySellerId: build.query<IResponse, string>({
      query: (sellerId:string) => `seller/sellerId/${sellerId}`,
      providesTags: ['Seller']
    }),

    getRandomSellers: build.query<IResponse, string>({
      query: (size: string) => `seller/random/${size}`,
      providesTags: ['Seller']
    }),

    createSeller: build.mutation<IResponse, ISeller>({
      query(body: ISeller) {
        return {
          url: 'seller/create',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Seller']
    }),

    updateSeller: build.mutation<IResponse, { sellerId: string; seller: ISeller }>({
      query(body) {
        return {
          url: `seller/update/${body.sellerId}`,
          method: 'PUT',
          body: body.seller
        };
      },
      invalidatesTags: ['Seller']
    })
  })
});

export const {
  useGetSellerByUsernameQuery,
  useGetRandomSellersQuery,
  useGetSellerByIdQuery,
  useCreateSellerMutation,
  useUpdateSellerMutation,
  useGetSellerBySellerIdQuery
} = sellerApi;
