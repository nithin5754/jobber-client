
import { FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, useRef } from "react"
import { FaTimes, FaPaperPlane } from "react-icons/fa"
import { IButtonProps, ITextInputProps } from "src/shared/shared.interface";
import { IChatBoxProps } from "../../interface/chat.interface";

const ChatBoxButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const ChatBoxTextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));


const ChatBox:FC<IChatBoxProps> = ({buyer,onClose,seller}):ReactElement => {
  const scrollRef=useRef<HTMLDivElement|null>(null)
  return (
    <div
    className="border-grey fixed bottom-0 left-2 right-2 h-[400px] max-h-[500px] w-auto border bg-white md:left-8 md:h-96 md:max-h-[500px] md:w-96 ">
    <div className="border-grey flex items-center space-x-4 border-b px-5 py-2">
        <img src={seller.profilePicture} className="h-10 w-10 rounded-full" alt="profile image" />
        <div className="w-full font-medium text-[#777d74]">
            <div className="flex w-full cursor-pointer justify-between text-sm font-bold text-[#777d74] md:text-base">
                <span>{seller.username}</span>
                <FaTimes className="flex self-center"  onClick={onClose}/>
            </div>
            <div className="text-xs text-gray-500">
            Avg. response time: {seller.responseTime} hour{seller.responseTime === 1 ? '' : 's'}
           
            </div>
        </div>
    </div>

    <div className="h-[500px] overflow-y-scroll md:h-full">
        <div className="my-2 flex h-[280px] flex-col overflow-y-scroll px-4 md:h-[72%]" ref={scrollRef}>
            <div className="my-2 flex max-w-[300px] gap-y-6 text-sm">
                <img src={buyer.profilePicture} className="h-8 w-8 rounded-full object-cover" alt="profile image" />
                <p
                    className="ml-2 max-w-[200px] rounded-[10px] bg-[#e4e6eb] px-4 py-2 text-start text-sm font-normal md:max-w-[220px]  text-white">
                    this is a message
                </p>
            </div>
        </div>
    </div>

    <form className="absolute bottom-0 left-0 right-0 mb-1 flex px-2 ">
        <ChatBoxTextInput type="text" name="message" value="" placeholder="Enter your message..."
            className="border-grey mb-0 w-full rounded-l-lg border p-2 text-sm font-normal text-gray-600 focus:outline-none" />
        <ChatBoxButton
            className="rounded-r-lg bg-customPurple px-6 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-3 md:text-base"
            label={<FaPaperPlane className="self-center" />}
        />
    </form>
</div>
  )
}
export default ChatBox