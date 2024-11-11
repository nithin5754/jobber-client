
import Error_404  from 'src/assets/json/error.json'
import LottieAnimation from '../lottie/components/LootieAnimation'
import { FC, ReactElement } from 'react'
import Button from '../button/Button'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const ErrorPage404:FC = ():ReactElement => {
  const navigate:NavigateFunction=useNavigate()
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <LottieAnimation animationData={Error_404} height={400} width={500}/>
      <p className='mt-1 text-base font-bold py-3 text-customPurple md:text-xl lg:text-2xl'>Error 404:Page Not Found</p>
      <Button
      onClick={()=>navigate(-1)}
      disabled={false}
      className=' bg-customViolet px-6 py-3 text-center text-sm font-bold text-white hover:bg-customPurple'
      label="< Back Home "
      />

    </div>
  )
}
export default ErrorPage404