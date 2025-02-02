import { FC, ReactElement } from "react"
import { FaCircleNotch } from "react-icons/fa"


const CircularPageLoader:FC = ():ReactElement => {
  return (
    <div
     className="bg-white/[0.6] opacity-40 flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full"
    >
       <FaCircleNotch className="animate-spin  h-10 w-10 mr-3 " size={40} color="rgb(184, 44, 180)"/>
    </div>
  )
}
export default CircularPageLoader