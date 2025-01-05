import { FC, ReactElement, useEffect, useState } from 'react';
import { FaCircle, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { useAppSelector } from 'src/store/store';
import { IMessage } from '../../interface/chat.interface';
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetConversationListQuery, useMarkMultipleMessagesAsReadMutation } from '../../service/chat.service';
import { TimeAgo } from 'src/shared/utils/date.utils';
import { orderBy } from 'lodash';
import { lowerCase, showErrorToast } from 'src/shared/utils/utils.service';
import socketService from 'src/sockets/socket.service';
const ChatList: FC = (): ReactElement => {
  const { username, conversationId } = useParams<string>();
  const location: Location = useLocation();
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const [selectedUser, setSelectedUser] = useState<IMessage>();
  const socket = socketService.getSocket();

  const [chatList, setChatList] = useState<IMessage[]>([]);
  const navigate: NavigateFunction = useNavigate();

  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });

  const [markMultipleMessagesAsRead] = useMarkMultipleMessagesAsReadMutation();

  const selectedUserFromList = async (user: IMessage): Promise<void> => {
    try {
      setSelectedUser(user);
      const pathList: string[] = location.pathname.split('/');
      console.log(pathList,"path")
      pathList.splice(-2, 2);
      const locationPathname: string = !pathList.join('/') ? location.pathname : pathList.join('/');
      const chatUsername: string = (user.receiverUsername !== authUser?.username ? user.receiverUsername : user.senderUsername) as string;
      navigate(`${locationPathname}/${lowerCase(chatUsername)}/${user.conversationId}`);
      if (socket) {
        socket.emit('getLoggedInUsers', '');
      }
    } catch (error) {
      showErrorToast('Error selecting chat user');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const sortedConversation: IMessage[] = orderBy(data.conversations, ['createdAt'], ['desc']) as IMessage[];
      setChatList(sortedConversation);
    }
  }, [isSuccess, data?.conversations]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUser) {
        if (
          selectedUser.receiverUsername === authUser?.username &&
          lowerCase(`${selectedUser.senderUsername}`) === username &&
          !selectedUser.isRead
        ) {
          const list: IMessage[] = chatList.filter((item: IMessage) => item.receiverUsername === authUser.username && !item.isRead);
          if (list.length > 0) {
            await markMultipleMessagesAsRead({
              receiverUsername: `${selectedUser.receiverUsername}`,
              senderUsername: `${selectedUser.senderUsername}`,
              messageId: `${selectedUser.id}`
            }).unwrap();
          }
        }
      }
    };

    fetchData();
  }, [username, conversationId, selectedUser, authUser, chatList, markMultipleMessagesAsRead]);

  return (
    <>
      <div className="border-grey truncate border-b px-5 py-3 text-base font-medium">
        <h2 className="w-6/12 truncate text-sm md:text-base lg:text-lg">All Conversations</h2>
      </div>
      <div className="absolute h-full w-full overflow-scroll pb-14">
        {chatList.map((item: IMessage, index: number) => (
          <div
            key={index}
            onClick={() => {
              selectedUserFromList(item);
            }}
            className={`flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50 ${index !== chatList.length - 1 ? 'border-grey border-b ' : ''} ${!item.isRead ? 'bg-[#f5fbff]' : ''} ${data?.conversationId === conversationId ? 'bg-[#f5fbff]' : ''}`}
          >
            <img
              src={item.receiverUsername !== authUser.username ? item.receiverPicture : item.senderPicture}
              alt="profile image"
              className="h-10 w-10 object-cover rounded-full"
            />
            <div className="w-full text-sm dark:text-white">
              <div className="flex justify-between pb-1 font-bold text-[#777d74]">
                <span className={`${selectedUser && !item.body ? 'flex items-center' : ''}`}>
                  {item.receiverUsername !== authUser.username ? item.receiverUsername : item.senderUsername}
                </span>
                {item.createdAt ? <span className="font-normal">{TimeAgo.transform(`${item.createdAt}`)}</span> : <></>}
              </div>
              <div className="flex justify-between text-[#777d74]">
                <span>
                  {item.receiverUsername !== authUser.username ? '' : 'Me: '}
                  {item.body}
                </span>
                {!item.isRead ? (
                  <>
                    {item.receiverUsername === authUser.username ? (
                      <FaCircle className="mt-2 text-sky-500" size={8} />
                    ) : (
                      <FaCheck className="mt-2" size={8} />
                    )}
                  </>
                ) : (
                  <FaCheckDouble className="mt-2 text-sky-500" size={8} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ChatList;
