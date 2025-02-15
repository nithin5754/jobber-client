import { FC, FormEvent, lazy, useState } from 'react';
import './CheckoutForm.scss';
import { ICheckoutProps } from '../../interfaces/order.interface';
import { IButtonProps } from 'src/shared/shared.interface';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';


const Button: FC<IButtonProps>=lazy(()=>import('src/shared/button/Button'))
const CheckoutForm:FC<ICheckoutProps> = ({gigId,offer}) => {


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate:NavigateFunction=useNavigate()

const handleSubmit=async(event:FormEvent):Promise<void>=>{
  event.preventDefault()

  setIsLoading(true)
setTimeout(() => {
  setIsLoading(false)
  setMessage('Payment succeeded!');
  navigate( `/gig/order/requirement/${gigId}?${createSearchParams({
    offer: JSON.stringify(offer),
    order_date: `${new Date()}`
  })}`)
}, 3000);
}

  return (
    <form action="" id='payment-form' onSubmit={handleSubmit}>
          <Button
        id="submit"
        className={`w-full rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
          isLoading? 'cursor-not-allowed bg-sky-200' : 'bg-customPurple hover:bg-customViolet'
        }`}
        label={<span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Confirm & Pay'}</span>}
      />
            {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
export default CheckoutForm


