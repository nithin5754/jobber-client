

// :page

import { IResponse } from 'src/shared/shared.interface';
import { apiSlice } from 'src/store/api';

export const searchGigsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    searchGigs: build.query<IResponse, { query: string; page: string;}>({
      query: ({ query, page}) => `gig/search/gig/${page}?${query}`,
      providesTags: ['Search']
    })
    ,
    indexSearchGigs: build.query<IResponse, { query: string; page: string;}>({
      query: ({ query, page}) => `/search/search/index-search/gig/${page}?${query}`,
      providesTags: ['Search']
    })
  })
});

export const { useSearchGigsQuery,useIndexSearchGigsQuery } = searchGigsApi;
