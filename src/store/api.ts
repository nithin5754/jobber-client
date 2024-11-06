import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { BASE_ENDPOINT, REFRESH_API_ENDPOINTS } from 'src/shared/utils/constant.api';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token



    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    //dispatch to refresh token

    let loggedInUsername: string = '';

    const refreshResult = await baseQuery(
      /** REFRESH_API_ENDPOINTS is use for refresh token
       * @param {string} loggedInUsername - get logged username as the parameter
       * @returns {string -[/auth/refresh-token/:loggedInUsername]} -it return the refresh-token api endpoints
       */
      REFRESH_API_ENDPOINTS(loggedInUsername),
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // api.dispatch(setCredentials(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logOut());
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
  tagTypes: ['Auth'],
  endpoints: () => ({})
});
