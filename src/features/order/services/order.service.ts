import { IResponse } from 'src/shared/shared.interface';
import { apiSlice } from 'src/store/api';
import { IExtendedDelivery, IOrder } from '../interfaces/order.interface';

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrderByOrderId: build.query<IResponse, string>({
      query: (orderId: string) => `order/order/order-orderId/${orderId}`,
      providesTags: ['Order']
    }),
    getOrdersBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `order/order/order-seller/${sellerId}`,
      providesTags: ['Order']
    }),
    getOrdersByBuyerId: build.query<IResponse, string>({
      query: (buyerId: string) => `order/order/order-buyer/${buyerId}`,
      providesTags: ['Order']
    }),
    createOrder: build.mutation<IResponse, IOrder>({
      query(body: IOrder) {
        return {
          url: 'order/order/order-create',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    approveOrder: build.mutation<IResponse, { orderId: string }>({
      query({ orderId }) {
        return {
          url: `order/order/approve-order/${orderId}`,
          method: 'PUT'
        };
      },
      invalidatesTags: ['Order']
    }),

    deliverOrder: build.mutation<IResponse, { orderId: string; formData: FormData }>({
      query({ orderId, formData }) {
        return {
          url: `order/order/deliver-order/${orderId}`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ['Order']
    }),
    updateDeliveryDate: build.mutation<IResponse, { orderId: string; type: string; body: IExtendedDelivery }>({
      query({ orderId, type, body }) {
        return {
          url: `order/order/order-delivery-extension/${type}/${orderId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    cancelOrder: build.mutation<IResponse, { orderId: string}>({
      query({ orderId }) {
        return {
          url: `order/order/order-delivery-cancel/${orderId}`,
          method: 'PUT',
        
        };
      },
      invalidatesTags: ['Order']
    }),
    requestDeliveryDateExtension: build.mutation<IResponse, { orderId: string; body: IExtendedDelivery }>({
      query({ body, orderId }) {
        return {
          url: `order/order/order-update-extension/${orderId}`,
          method: 'PUT',
          body
        };
      }
    })
  })
});

export const {
  useGetOrderByOrderIdQuery,
  useGetOrdersBySellerIdQuery,
  useCreateOrderMutation,
  useGetOrdersByBuyerIdQuery,
  useApproveOrderMutation,
  useDeliverOrderMutation,
  useRequestDeliveryDateExtensionMutation,
  useUpdateDeliveryDateMutation,
  useCancelOrderMutation
} = orderSlice;
