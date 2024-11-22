import { FC, ReactElement, useState } from "react"
import Table from "./Table"
import { lowerCase } from "lodash"


const  Gig_Status ={
  ACTIVE:'active',
  CANCELLED:'cancelled',
  IN_PROGRESS:'in progress',
  COMPLETED:'completed'
}


const DashBoard:FC = ():ReactElement => {

  const [type,setType]=useState<string>(Gig_Status.ACTIVE)
  return (
    <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-6">
    <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl">Manage Orders</div>
        <div className="p-0">
            <ul
                className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
                <li className="inline-block py-3 uppercase" onClick={()=>setType(Gig_Status.ACTIVE)}>
                    <a href="#activeorders"
                        className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type===Gig_Status.ACTIVE?'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg':''}`}>
                        Active{' '}
                        <span
                            className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white">
                            2
                        </span>
                    </a>
                </li>
                <li className="inline-block py-3 uppercase" onClick={()=>setType(Gig_Status.COMPLETED)}>
                    <a href="#activeorders"
                         className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type===Gig_Status.COMPLETED?'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg':''}`}>
                        Completed{' '}
                        <span
                            className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white">
                            1
                        </span>
                    </a>
                </li>
                <li className="inline-block py-3 uppercase"  onClick={()=>setType(Gig_Status.CANCELLED)}>
                    <a href="#activeorders"
                         className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type===Gig_Status.CANCELLED?'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg':''}`}>
                        Cancelled{' '}
                        <span
                            className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white">
                            2
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        {
          type===Gig_Status.ACTIVE&&(
            <Table type={'active'}/>
          )
        }
           {
          type===Gig_Status.COMPLETED&&(
            <Table type={'completed'}/>
          )
        }
           {
          type===Gig_Status.CANCELLED&&(
            <Table type={'cancelled'}/>
          )
        }
    </div>
</div>
  )
}
export default DashBoard