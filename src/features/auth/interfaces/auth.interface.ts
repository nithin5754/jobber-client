import { ObjectSchema } from 'yup';

export interface IAuthUser {
  profilePublicId: string | null;
  country: string | null;
  createdAt: Date | null;
  email: string | null;
  emailVerificationToken: string | null;
  emailVerified: boolean | null;
  id: number | null;
  passwordResetExpires: Date | null;
  passwordResetToken: null | null;
  profilePicture: string | null;
  updatedAt: Date | null;
  username: string | null;
  browserName?: string | null;
  deviceType?: string | null;
}

export interface ISignUpPayload {
  [key: string]: string | null | undefined;
  username: string;
  password: string;
  email: string;
  country: string;
  browserName: string | null | undefined;
  deviceType: string | null | undefined;
}


export interface ISignInPayload {
  [key: string]: string | null | undefined;
  username: string;
  password: string;
  browserName: string | null | undefined;
  deviceType: string | null | undefined;
}

export interface IUseAuthSchema {
  schema: ObjectSchema<ISignUpPayload|ISignInPayload>;
  userInfo: ISignUpPayload|ISignInPayload;
}

export interface IReduxAuthPayload {
  authInfo?: IAuthUser;
  token?: string | null;
}

export interface IReduxAddAuthUser {
  type: string;
  payload: IReduxAuthPayload;
}

export interface IAuthSliceType {
  details: IAuthUser;
  token: string | null;
}

export interface IReduxLogout {
  type: string;
  payload: boolean;
}


export const FETCH_STATUS={
  IDLE:'',
  SUCCESS:'success',
  ERROR:'error'
}
