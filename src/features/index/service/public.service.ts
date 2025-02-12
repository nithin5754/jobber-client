



import { IResponse } from 'src/shared/shared.interface';
import { apiSlice } from 'src/store/api';

export const publicGigsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    publicCategory: build.query<IResponse, { category:string}>({
      query: ({category}) => `public/public-category/${category}`,
      providesTags: ['Public']
    })
  
  })
});

export const { usePublicCategoryQuery } = publicGigsApi;