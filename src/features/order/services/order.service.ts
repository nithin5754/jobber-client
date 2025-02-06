import { IResponse } from "src/shared/shared.interface";
import { apiSlice } from "src/store/api";
import { IOrder } from "../interfaces/order.interface";




export const orderSlice=apiSlice.injectEndpoints({

  endpoints:(build)=>(
    {
      getOrderByOrderId: build.query<IResponse, string>({
        query: (orderId: string) => `order/order-orderId/${orderId}`,
        providesTags: ['Order']
      }),
      getOrdersBySellerId: build.query<IResponse, string>({
        query: (sellerId: string) => `order/order-seller/${sellerId}`,
        providesTags: ['Order']
      }),
      getOrdersByBuyerId: build.query<IResponse, string>({
        query: (buyerId: string) => `order/order-buyer/${buyerId}`,
        providesTags: ['Order']
      }),
      createOrder: build.mutation<IResponse, IOrder>({
        query(body: IOrder) {
          return {
            url: 'order/order-create',
            method: 'POST',
            body
          };
        },
        invalidatesTags: ['Order']
      }),
    }
  )

})


export const {
  useGetOrderByOrderIdQuery,
  useGetOrdersBySellerIdQuery,
  useCreateOrderMutation,
  useGetOrdersByBuyerIdQuery
}=orderSlice

