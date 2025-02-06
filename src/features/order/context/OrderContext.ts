import { Context, createContext } from "react";
import { IOrder, IOrderContext, IOrderInvoice } from "../interfaces/order.interface";
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";





export const OrderContext:Context<IOrderContext>=createContext({
  order:{} as IOrder,
  authUser:{} as IAuthUser,
  orderInvoice:{}as IOrderInvoice
}) as Context<IOrderContext>