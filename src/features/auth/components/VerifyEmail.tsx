import { Link, useSearchParams } from "react-router-dom"
import Alert from "src/shared/alert/Alert"
import { useVerifyEmailMutation } from "../services/auth.service"
import { useCallback, useEffect, useState } from "react"

import {  FETCH_STATUS } from "../interfaces/auth.interface"
import { useAppDispatch } from "src/store/store"
import { IResponse } from "src/shared/shared.inferface"
import { addAuthUser } from "../reducers/auth.reducer"
import Button from "src/shared/button/Button"
import { FaSpinner } from "react-icons/fa"




const VerifyEmail = () => {

  const [alertMessage,setAlertMessage]=useState<string>('')
  const [status,setStatus]=useState<string>(FETCH_STATUS.IDLE)
  const [searchParams]=useSearchParams({})

  const dispatch=useAppDispatch()

  const [verifyEmail,{isLoading}]=useVerifyEmailMutation()


  const onVerifyEmail=useCallback(async ():Promise<void>=>{
try {
  
  let params:string=searchParams.get('v_token')?.toString() as string

  const result:IResponse=await verifyEmail(params).unwrap()

  setStatus(FETCH_STATUS.SUCCESS)
  dispatch(addAuthUser(result.user))
  

} catch (error) {
  setStatus(FETCH_STATUS.ERROR)
  setAlertMessage(error?.data.message)
  
}

  },[dispatch,searchParams,verifyEmail])



useEffect(()=>{
  onVerifyEmail()

},[onVerifyEmail])


  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-20 lg:py-0">
    <div className="w-[30%]">
      <Alert type={status} message={alertMessage} />
    </div>
{
  isLoading?(
    <>
      <Button  label={<FaSpinner size={16} className="animate-spin "/>} />
    </>
  ):(
    <Link
    to="/"
    className="rounded bg-sky-500 px-6 py-3 mt-5 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
  >
    Continue to Home
  </Link>
  )
}
  </div>
  )
}
export default VerifyEmail