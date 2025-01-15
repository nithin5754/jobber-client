import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import ChatList from './chatlist/ChatList';
import { useParams } from 'react-router-dom';
import { IMessage } from '../interface/chat.interface';
import { useGetUserMessagesQuery } from '../service/chat.service';
import { chatMessageReceived } from '../service/chat.utils';
import ChatWindow from './chatWindow/ChatWindow';

const Chat: FC = (): ReactElement => {

  const { conversationId } = useParams<string>();
  const chatMessages = useRef<IMessage[]>([]);
  const [chatMessagesData, setChatMessagesData] = useState<IMessage[]>([]);

  const [skip, setSkip] = useState<boolean>(false);

  const { data: userMessageList, isSuccess, isLoading, isError } = useGetUserMessagesQuery(`${conversationId}`, { skip });



  useEffect(() => {
    if (isSuccess) {
      setChatMessagesData(userMessageList?.messages as IMessage[]);
    }
  }, [isSuccess, userMessageList?.messages]);

  useEffect(() => {
    if (isSuccess && conversationId) {
      chatMessageReceived(`${conversationId}`, chatMessagesData, chatMessages.current, setChatMessagesData);
    }
  }, [chatMessagesData, conversationId]);

  return (
    <div className="border-grey mx-2 my-5 flex max-h-[90%] flex-wrap border lg:container lg:mx-auto">
      <div className="lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r">
        <ChatList />
      </div>

      <div className="relative hidden w-full overflow-hidden md:w-2/3 lg:flex">
        {conversationId && chatMessagesData.length > 0 ? (
          <ChatWindow chatMessages={chatMessagesData} isLoading={isLoading} setSkip={setSkip} isError={isError} />
        ):(
          <div className="flex w-full items-center justify-center">Select a user to chat with.</div>

        )}
      </div>
    </div>
  );
};
export default Chat;
