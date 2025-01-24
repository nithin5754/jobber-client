import { AuthEndPointsTypes } from '../shared.interface';

export const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;


console.log(BASE_ENDPOINT,"BASE ENDPOINTS")

const CLOUDINARY_BASE_URL=import.meta.env.VITE_CLOUDINARY_PUBLIC_URL



export const CLOUDINARY_PICTURE_URL=(publicId:string)=>{
  return `${CLOUDINARY_BASE_URL}/${publicId}.jpg`
}


export const REFRESH_API_ENDPOINTS = () => {
  return '/auth/refresh';
};

export const AUTH_API_ENDPOINTS = (endpoints_name: AuthEndPointsTypes,data?:string): string => {
  switch (endpoints_name) {
    case 'REGISTER':
      return 'auth/register';
    case 'LOGIN':
      return 'auth/login';
    case 'VERIFY_EMAIL':
      return 'auth/verify-email'
     case 'FORGOT_PASSWORD':
      return 'auth/forgot-password' 
     case 'RESET_PASSWORD' :
      return `auth/reset-password/${data}` 
      case 'CURRENT_USER':
       return 'current/current-user'
      case  'SIGN_OUT':
        return 'auth/sign-out'
      case 'RESEND_EMAIL':
        return 'current/resend-email'

    default:
      return '';
  }
};
