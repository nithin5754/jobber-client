import { FC, lazy, ReactElement } from "react"
// import { useLocation } from "react-router-dom";
import { IButtonProps } from "src/shared/shared.interface"
const Button: FC<IButtonProps>=lazy(()=>import('src/shared/button/Button'))
const Order:FC = ():ReactElement => {
    // const { state }= useLocation();


  return (
    <div className="container mx-auto">
    <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
            {/* <!-- OrderDetailsTable --> */}

            <div className="mt-4 flex flex-col justify-between bg-white md:flex-row">
                <div className="flex w-full flex-col flex-wrap p-4 md:w-2/3">
                    <span className="text-base font-bold text-black lg:text-lg">
                        Your order is now in the works
                    </span>
                    <p className="mt-1 w-5/6 flex-wrap text-sm">
                        View the delivery to make sure you have exactly what you need. Let sellerUsername know your
                        thoughts.
                    </p>
                    <p className="mt-1 w-5/6 flex-wrap text-sm">We notified sellerUsername about your order.</p>
                    <p className="mt-1 w-5/6 flex-wrap text-sm">
                        You should receive your delivery by newDeliveryDate
                    </p>
                </div>
                <div className="mb-4 ml-5 w-full justify-center self-center text-left md:mr-3 md:w-1/3 md:text-right">
                    <Button
                        className="rounded bg-customPurple px-2 py-2 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-4 md:py-2 md:text-base"
                        label="View Delivery" />
                </div>
            </div>
            {/* <!-- OrderActivities --> */}
        </div>

        <div className="w-full p-4 lg:w-1/3 ">
            {/* <!-- DeliveryTimer --> */}

            <div className="bg-white">
                <div className="mb-2 flex flex-col border-b px-4 pb-4 pt-3 md:flex-row">
                    <img className="h-11 w-20 object-cover" src="https://placehold.co/330x220?text=Placeholder"
                        alt="Gig Cover Image" />
                    <div className="flex flex-col">
                        <h4 className="mt-2 text-sm font-bold text-[#161c2d] md:mt-0 md:pl-4">gigTitle</h4>
                        <span
                            className="status mt-1 w-24 rounded px-[3px] py-[3px] text-xs font-bold uppercase text-white md:ml-4">
                            status
                        </span>
                    </div>
                </div>
                <ul className="mb-0 list-none">
                    <li className="flex justify-between px-4 pb-2 pt-2">
                        <div className="flex gap-2 text-sm font-normal">Ordered from</div>
                        <span className="text-sm font-bold text-green-500">sellerUsername</span>
                    </li>
                    <li className="flex justify-between px-4 pb-2 pt-2">
                        <div className="flex gap-2 text-sm font-normal">Order</div>
                        <span className="text-sm font-bold">#JO1234567</span>
                    </li>
                    <li className="flex justify-between px-4 pb-2 pt-2">
                        <div className="flex gap-2 text-sm font-normal">Delivery date</div>
                        <span className="text-sm font-bold">24/11/2025</span>
                    </li>
                    <li className="flex justify-between px-4 pb-4 pt-2">
                        <div className="flex gap-2 text-sm font-normal">Total price</div>
                        <span className="text-sm font-bold">$12</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  )
}
export default Order