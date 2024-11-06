

import { object,ObjectSchema,string } from "yup";
import { ISignInPayload, ISignUpPayload } from "../interfaces/auth.interface";




export const registerUserSchema: ObjectSchema<ISignUpPayload> = object({
  username: string().required({ username: 'Username is a required field' }).min(4, { username: 'Username is a required field' }),
  password: string().required({ password: 'Password is a required field' }).min(4, { password: 'Password is a required field' }),
  email: string().email({ email: 'Email is a required field' }).required({ email: 'Email is a required field' }),
  country: string().notOneOf(['Select Country'], { country: 'Select a country' }).required({ country: 'Country is a required field' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
});
export const loginUserSchema: ObjectSchema<ISignInPayload> = object({
  username: string().required({ username: 'Username is a required field' }).min(4, { username: 'Username is a required field' }),
  password: string().required({ password: 'Password is a required field' }).min(4, { password: 'Password is a required field' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
});