import { AuthEndPointsTypes } from '../shared.inferface';

export const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

export const REFRESH_API_ENDPOINTS = (username: string) => {
  return '/auth/refresh-token' + username;
};

export const AUTH_API_ENDPOINTS = (endpoints_name: AuthEndPointsTypes): string => {
  switch (endpoints_name) {
    case 'REGISTER':
      return '/auth/register';
    case 'LOGIN':
      return '/auth/login';
    case 'VERIFY_EMAIL':
      return '/auth/verify-email'

    default:
      return '';
  }
};
