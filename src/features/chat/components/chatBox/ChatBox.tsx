import {
  ChangeEvent,
  FC,
  FormEvent,
  ForwardRefExoticComponent,
  lazy,
  LazyExoticComponent,
  ReactElement,
  RefObject,
  useRef,
  useState
} from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { IButtonProps, IResponse, ITextInputProps } from 'src/shared/shared.interface';
import { IChatBoxProps, IConversation, IMessage } from '../../interface/chat.interface';
import { UseChatScrollToBottom } from '../../hooks/UseChatScrollToBottom';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAppSelector } from 'src/store/store';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { generateRandomNumbers, showErrorToast } from 'src/shared/utils/utils.service';
import { useGetConversationQuery, useGetMessagesQuery, useSaveChatMessageMutation } from '../../service/chat.service';

import ChatBoxSkeleton from './ChatBoxSkeleton';

const ChatBoxButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const ChatBoxTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));

const ChatBox: FC<IChatBoxProps> = ({ buyer, onClose, seller, gigId }): ReactElement => {
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const [message, setMessage] = useState<string>('');
  const [saveChatMessage] = useSaveChatMessageMutation();
  const conversationIdRef = useRef<string>(`${generateRandomNumbers(15)}`);

  const { data: conversationData, isSuccess: isConversationSuccess } = useGetConversationQuery({
    senderUsername: `${seller.username}`,
    receiverUsername: `${buyer.username}`
  });

  const {
    data: messageData,
    isLoading: isMessageLoading,
    isSuccess: isMessageSuccess
  } = useGetMessagesQuery(
    { senderUsername: `${seller.username}`, receiverUsername: `${buyer.username}` },
    { refetchOnMountOrArgChange: true }
  );
  let chatMessages: IMessage[] = [];
  if (isConversationSuccess && conversationData.conversations && conversationData.conversations.length) {
    conversationIdRef.current = (conversationData.conversations as IConversation[])[0].conversationId as string;
  }
  if (isMessageSuccess && messageData.messages && messageData.messages.length) {
    chatMessages = messageData.messages as IMessage[];
  }
  const scrollRef: RefObject<HTMLDivElement> = UseChatScrollToBottom(chatMessages);

  const sendMessage = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!message) {
      return;
    }
    try {
      const messageBody: IMessage = {
        conversationId: conversationIdRef.current,
        hasConversationId: conversationData && conversationData.conversations && conversationData.conversations.length > 0,
        body: message,
        gigId,
        sellerId: seller.id,
        buyerId: buyer.id,
        senderUsername: authUser.username === seller.username ? seller.username : buyer.username,
        senderPicture: authUser.username === seller.username ? seller.profilePicture : buyer.profilePicture,
        receiverUsername: authUser.username !== seller.username ? seller.username : buyer.username,
        receiverPicture: authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture,
        isRead: false,
        hasOffer: false
      };

      if (messageBody) {
        const response: IResponse = await saveChatMessage(messageBody).unwrap();
        setMessage('');
        conversationIdRef.current = `${response.conversationId}`;
      }
    } catch (error) {
      showErrorToast('Error sending message ');
    }
  };

  return (
    <>
      {isMessageLoading && !chatMessages ? (
        <>
          <ChatBoxSkeleton />
        </>
      ) : (
        <>
          <div className=" rounded-md border-spacing-60 border-gray-600/50  fixed bottom-10 left-2 right-2 h-[600px] max-h-[600px] w-auto border bg-white md:left-8  md:max-h-[800px] md:w-96 ">
            <div className="border-grey flex items-center space-x-4 border-b px-5 py-2">
              <img
                src={authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture}
                className="h-10 w-10 rounded-full"
                alt="profile image"
              />
              <div className="w-full font-medium text-[#777d74]">
                <div className="flex w-full cursor-pointer justify-between text-sm font-bold text-[#777d74] md:text-base">
                  <span>{authUser.username !== seller.username ? seller.username : buyer.username}</span>
                  <FaTimes className="flex self-center" onClick={onClose} />
                </div>
                <div className="text-xs text-gray-500">
                  Avg. response time: {seller.responseTime} hour{seller.responseTime === 1 ? '' : 's'}
                </div>
              </div>
            </div>

            <div className="h-[500px] overflow-y-scroll md:h-full">
              <div className="my-2 flex h-[280px] flex-col overflow-y-scroll px-4 md:h-[72%]" ref={scrollRef}>
                {chatMessages.map((msg: IMessage) => (
                  <div
                    key={msg.id}
                    className={`my-2 flex max-w-[300px] gap-y-6 text-sm ${
                      msg.senderUsername !== buyer.username ? 'flex-row-reverse self-end' : ''
                    }`}
                  >
                    <img src={     msg.senderUsername !== buyer.username?buyer.profilePicture:seller.profilePicture} className="h-8 w-8 rounded-full object-cover" alt="profile image" />
                    <p className="ml-2 max-w-[200px] rounded-[10px] bg-[#e4e6eb] px-4 py-2 text-start text-sm font-normal md:max-w-[220px]  text-white">
                      {msg.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form className="absolute bottom-0 left-0 right-0 mb-1 flex px-2 ">
              <ChatBoxTextInput
                type="text"
                name="message"
                value={message}
                onChange={(event: ChangeEvent) => setMessage((event.target as HTMLInputElement).value)}
                placeholder="Enter your message..."
                className="border-grey mb-0 w-full rounded-l-lg border p-2 text-sm font-normal text-gray-600 focus:outline-none"
              />
              <ChatBoxButton
                onClick={sendMessage}
                className="rounded-r-lg bg-customPurple px-6 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-3 md:text-base"
                label={<FaPaperPlane className="self-center" />}
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};
export default ChatBox;
