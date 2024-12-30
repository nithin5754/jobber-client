import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { BASE_ENDPOINT } from 'src/shared/utils/constant.api';

import { logout } from 'src/features/auth/reducers/logout.reducer';

import { addAuthUser, clearAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { emptyBuyer } from 'src/features/buyer/reducer/buyer.reducer';

import { IResponse } from 'src/shared/shared.interface';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error && result.error.status === 403) ||
    (result.error && result.error.status === 401)
  ) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      const fetchData: IResponse = refreshResult.data;

      api.dispatch(addAuthUser({ authInfo: fetchData.user, token: fetchData.token }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout({}));
      
      api.dispatch(clearAuthUser(undefined));
      api.dispatch(emptyBuyer(undefined));
    }
  }

  return result;
};

/**
 * Creates an API slice for client-side operations
 * @typedef {Object} ClientApi
 * @property {string} reducerPath - Path for the reducer
 * @property {Function} baseQuery - Base query function
 * @property {Array<string>} tagTypes - Types for caching invalidation
 * @property {Object} endpoints - Endpoint definitions
 * @returns {ClientApi} Created API slice
 */

export const apiSlice = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Currentuser', 'Buyer','Seller','Gigs','Search'],
  endpoints: () => ({})
});
