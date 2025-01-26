import {
  ChangeEvent,
  FC,
  FormEvent,
  ForwardRefExoticComponent,
  lazy,
  LazyExoticComponent,
  ReactElement,
  Suspense,

  useEffect,
  useRef,
  useState
} from 'react';
import {  FaPaperclip, FaPaperPlane } from 'react-icons/fa';

import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';
import { IChatWindowProps, IMessage, OnlineUserType } from '../../interface/chat.interface';
import { UseChatScrollToBottom } from '../../hooks/UseChatScrollToBottom';
import { useParams } from 'react-router-dom';
import { upperCase } from 'lodash';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';
import { useGetBuyerByUsernameQuery } from 'src/features/buyer/services/buyer.service';
import { firstLetterUppercase, showErrorToast } from 'src/shared/utils/utils.service';

import socketService from 'src/sockets/socket.service';
import { TimeAgo } from 'src/shared/utils/date.utils';

import ChatImagePreview from './ChatImagePreview';
import { checkFile, fileType, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { useAppSelector } from 'src/store/store';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import OfferModal from 'src/shared/modal/OfferModal';
import { useGetGigByIdQuery } from 'src/features/gigs/service/gig.service';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import ChatOffer from './ChatOffer';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import ChatFile from './ChatFile';
import { useSaveChatMessageMutation } from '../../service/chat.service';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';

const ChatWindowButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const ChatWindowInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const MESSAGE_STATUS = {
  EMPTY: '',
  IS_LOADING: false,
  LOADING: true
};
const ChatWindow: FC<IChatWindowProps> = ({ chatMessages, isLoading, setSkip }): ReactElement => {
  const seller: ISeller = useAppSelector(useGetSellerDetails);
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const fileRef = useRef<HTMLInputElement>(null);
  const socket = socketService.getSocket();
  const scrollRef = UseChatScrollToBottom(chatMessages);
  const [receiverUsername, setReceiverUsername] = useState<string>('');
  const [showImagePreview, setShowImagePreview] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [gigId, _setGigId] = useState<string>('');
  const [displayCustomOffer, setDisplayCustomOffer] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>(MESSAGE_STATUS.EMPTY);
  const [saveChatMessage] = useSaveChatMessageMutation();

  const { username } = useParams<string>();

  const receiverRef = useRef<IBuyer>();

  const singleMessageRef = useRef<IMessage>();

  const { data: buyerData, isSuccess: buyerSuccess } = useGetBuyerByUsernameQuery(`${firstLetterUppercase(`${username}`)}`);

  if (buyerSuccess) {
    receiverRef.current = buyerData.buyer;
  }

  if (chatMessages.length) {
    singleMessageRef.current = chatMessages[chatMessages.length - 1];
  }
  const { data: gigData } = useGetGigByIdQuery(`${singleMessageRef.current?.gigId}`);

  const handleOnline = (data: OnlineUserType[]) => {
    if (!receiverRef.current?.username) return setReceiverUsername('');

    const item = data.find((item) => item.username === receiverRef.current?.username);
    setReceiverUsername(item ? item.username : '');
  };

  useEffect(() => {
    if (socket) {
      socket.emit('getLoggedInUsers', '');
      socket.on('online', handleOnline);

      return () => {
        socket.off('online', handleOnline);
      };
    }
  }, [socket, handleOnline, username, receiverRef.current?.username]);

  const handleFileChange = (event: ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    if (target.files) {
      const file: File = target.files[0];
      if (!checkFile(file)) {
        setSelectedFile(file);
        setShowImagePreview(MESSAGE_STATUS.LOADING);
      }
    }
  };

  const setChatMessage = (event: ChangeEvent) => {
    setMessage((event.target as HTMLInputElement).value);
  };

  const sendChat = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (setSkip) {
      setSkip(true);
    }

    if (!message && !selectedFile) {
      return;
    }
    try {
      setIsUploadingFile(MESSAGE_STATUS.LOADING);

      const messageBody: IMessage = {
        conversationId: singleMessageRef.current?.conversationId,
        hasConversationId: true,
        body: message,
        gigId,
        sellerId: singleMessageRef.current?.sellerId,
        buyerId: singleMessageRef.current?.buyerId,
        senderUsername: `${authUser.username}`,
        senderPicture: CLOUDINARY_PICTURE_URL(`${authUser.profilePicture}`),
        receiverUsername: receiverRef.current?.username,
        receiverPicture: receiverRef.current?.profilePicture,
        isRead: false,
        hasOffer: false
      };

      if (selectedFile) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(selectedFile);
        console.log(dataImage, 'selected file');
        messageBody.file = dataImage as string;
        messageBody.body = messageBody.body ? messageBody.body : '1 file sent';
        messageBody.fileType = fileType(selectedFile);
        messageBody.fileName = selectedFile.name;
        messageBody.fileSize = `${selectedFile.size}`;
      }

      console.log("message,body",messageBody)

      await saveChatMessage(messageBody).unwrap();
      setSelectedFile(null);
      setShowImagePreview(MESSAGE_STATUS.IS_LOADING);
      setMessage(MESSAGE_STATUS.EMPTY);
      setIsUploadingFile(MESSAGE_STATUS.IS_LOADING);
      if(setSkip){
        setSkip(false)
      }
    } catch (error) {
      setMessage(MESSAGE_STATUS.EMPTY);
      setIsUploadingFile(MESSAGE_STATUS.IS_LOADING);
      showErrorToast('Error sending new chat');
    }
  };

  return (
    <>
      {!isLoading && displayCustomOffer && (
        <OfferModal
          header="Create custom offer!"
          gigTitle={gigData && gigData.gig?.title ? gigData.gig?.title : ''}
          singleMessage={singleMessageRef.current}
          receiver={receiverRef.current}
          authUser={authUser}
          cancelBtnHandler={() => setDisplayCustomOffer(MESSAGE_STATUS.IS_LOADING)}
        />
      )}
      {!isLoading ? (
        <div className="flex min-h-full w-full flex-col">
          <div className="border-grey flex w-full flex-col border-b px-5 py-0.5 ">
            {receiverUsername === receiverRef.current?.username ? (
              <>
                <div className="text-lg font-semibold">{upperCase(`${username}`)}</div>
                <div className="flex gap-1 pb-1 text-xs font-normal">
                  Online
                  <span className="flex h-2.5 w-2.5 self-center rounded-full border-2 border-white bg-green-400"></span>
                </div>
              </>
            ) : (
              <>
                <div className="py-2.5 text-lg font-semibold">{upperCase(`${username}`)}</div>
                <span className="py-2.5s text-xs font-normal"></span>
              </>
            )}
          </div>
          <div className="relative h-[100%]">
            <div className="absolute flex h-[98%] w-screen grow flex-col overflow-scroll" ref={scrollRef}>
              {chatMessages.map((message: IMessage) => (
                <div key={message.id} className="mb-4">
                  <div className="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-[#f5fbff]">
                    <div className="flex self-start">
                      <img className="h-10 w-10 object-cover rounded-full" src={message.senderPicture} alt={message.senderUsername} />
                    </div>
                    <div className="w-full text-sm dark:text-white">
                      <div className="flex gap-x-2 pb-1 font-bold text-[#777d74]">
                        <span>{message.senderUsername}</span>
                        <span className="mt-1 self-center text-xs font-normal">{TimeAgo.dayMonthYear(`${message.createdAt}`)}</span>
                      </div>
                      <div className="flex flex-col text-[#777d74]">
                        <span>{message.body}</span>
                        {message.hasOffer && <ChatOffer message={message} seller={seller} gig={gigData as ISellerGig} />}
                        {message.file && <ChatFile message={message} seller={seller} gig={gigData as ISellerGig} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col">
            {showImagePreview && (
              <ChatImagePreview
                image={URL.createObjectURL(selectedFile as File)}
                file={selectedFile as File}
                isLoading={isUploadingFile}
                message={message}
                handleChange={setChatMessage}
                onSubmit={sendChat}
                onRemoveImage={() => {
                  setSelectedFile(null);
                  setShowImagePreview(MESSAGE_STATUS.IS_LOADING);
                }}
              />
            )}

            {!showImagePreview && (
              <div className="bottom-0 left-0 right-0 z-0 h-28 px-4 ">
                <Suspense fallback={<CircularPageLoader />}>
          
                  <div className="flex cursor-pointer flex-row justify-between gap-4 ">
        
                  <div className="flex items-center gap-4">
                      {/* {!showImagePreview && <FaPaperclip className="mt-1 self-center" onClick={() => fileRef.current?.click()} />} */}
                      {!showImagePreview && singleMessageRef.current && singleMessageRef.current.sellerId === seller.id && (
                        <ChatWindowButton
                        className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"                          disabled={false}
                          label="Add Offer"
                          onClick={() => setDisplayCustomOffer(MESSAGE_STATUS.LOADING)}
                        />
                      )}



                    </div>
                    <div className="flex flex-1">
                    <form className="mb-1 w-full" onSubmit={sendChat}>
                    <ChatWindowInput
                      type="text"
                      name="message"
                      value={message}
                      onChange={(event: ChangeEvent) => setMessage((event.target as HTMLInputElement).value)}
                             className="w-full rounded border border-gray-300 px-3 py-6 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Enter your message..."
                    />
                  </form>
                    </div>
                    <div className="flex w-[50px]">
                      <ChatWindowButton
                        onClick={sendChat}
                              className="flex w-full justify-center rounded   bg-purple-600  text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        disabled={false}
                        label={<FaPaperPlane className="self-center" size={18}/>}
                      />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>loading...</>
      )}
    </>
  );
};
export default ChatWindow;
