import { IResponse } from "src/shared/shared.interface";
import { apiSlice } from "src/store/api";
import { IMessage } from "../interface/chat.interface";




export const chatApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getConversation: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `chat/conversation/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getMessages: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `chat/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getConversationList: build.query<IResponse, string>({
      query: (username: string) => `chat/conversations/list/${username}`,
      providesTags: ['Chat']
    }),
    getUserMessages: build.query<IResponse, string>({
      query: (conversationId: string) => `chat/messages/chat-user-messages/${conversationId}`,
      providesTags: ['Chat']
    }),
    saveChatMessage: build.mutation<IResponse, IMessage>({
      query(body: IMessage) {
        return {
          url: 'chat/create-chat',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Chat']
    }),
    updateOffer: build.mutation<IResponse, { messageId: string; type: string }>({
      query({ messageId, type }) {
        return {
          url: 'chat/offer',
          method: 'PUT',
          body: { messageId, type }
        };
      },
      invalidatesTags: ['Chat']
    }),
    markMessagesAsRead: build.mutation<IResponse, string>({
      query(messageId: string) {
        return {
          url: 'chat/mark-as-read',
          method: 'PUT',
          body: { messageId }
        };
      },
      invalidatesTags: ['Chat']
    }),
    markMultipleMessagesAsRead: build.mutation<IResponse, { receiverUsername: string; senderUsername: string; messageId: string }>({
      query({ receiverUsername, senderUsername, messageId }) {
        return {
          url: 'chat/mark-multiple-as-read',
          method: 'PUT',
          body: { receiverUsername, senderUsername, messageId }
        };
      },
      invalidatesTags: ['Chat']
    })
  })
})



export const {
  useGetConversationQuery,
  useGetMessagesQuery,
  useGetConversationListQuery,
  useGetUserMessagesQuery,
  useSaveChatMessageMutation,
useMarkMessagesAsReadMutation,
  useMarkMultipleMessagesAsReadMutation,
  useUpdateOfferMutation
} = chatApi;