import { FC, lazy, ReactElement,  } from 'react'
import { IModalProps } from 'src/shared/modal/interfaces/modal.interface'
import { IButtonProps } from 'src/shared/shared.interface'
import useCountDown from '../hooks/useCountDown'

const Button: FC<IButtonProps>=lazy(()=>import('src/shared/button/Button'))
const DeliveryTime: FC<IModalProps> = ({order,authUser}):ReactElement => {


    const [days, hours, minutes, seconds]: number[] = useCountDown(`${order?.offer.newDeliveryDate}`);
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-[4px] bg-white px-4 py-3">
    <div className="text-base font-bold">
    {!order?.delivered
            ? `Time left ${authUser?.username === order?.sellerUsername ? 'to deliver' : 'for delivery'}`
            : 'Want to deliver again?'}
    </div>
    {
        ! order?.delivered&&(
            <div className="mb-1 flex justify-between text-center">
            <div className="flex flex-col text-sm font-bold md:text-base">
                {days} <span className="text-xs font-normal md:text-sm">days</span>
            </div>
            <div className="flex flex-col text-sm font-bold md:text-base">
                {hours} <span className="text-xs font-normal md:text-sm">hours</span>
            </div>
            <div className="flex flex-col text-sm font-bold md:text-base">
                {minutes} <span className="text-xs font-normal md:text-sm">minutes</span>
            </div>
            <div className="flex flex-col text-sm font-bold md:text-base">
                {seconds} <span className="text-xs font-normal md:text-sm">seconds</span>
            </div>
        </div>
        )
    }
 

    <div className="flex w-full cursor-pointer flex-col gap-4">
        <Button
            className="w-full rounded bg-green-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-green-400 focus:outline-none md:text-base"
            label="Deliver Now" />
        <div className="mb-2 text-center text-sm underline">
            Extend delivery date
        </div>
    </div>
</div>
  )
}
export default DeliveryTime