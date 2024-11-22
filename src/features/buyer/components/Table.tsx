import { Link } from "react-router-dom"


const Table = ({type}:{type:any}) => {
  return (
    <div className="flex flex-col">
    <div className="border-grey border border-b-0 px-3 py-3">
        <div className="text-xs font-bold uppercase sm:text-sm 
        md:text-base">{type} orders </div>
    </div>
    <table
        className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 
        sm:inline-table">
        <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
                <tr key=""
                    className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 
                    sm:table-row md:table-row lg:bg-transparent
                     lg:text-black">
                    <th className="p-3 text-center md:w-[6%]">
                        <span className="block lg:hidden">Image</span>
                    </th>
                    <th className="p-3 text-center md:w-[40%]">
                        <span className="block lg:hidden">Title</span>
                    </th>
                    <th className="p-3 text-center">Order Date</th>
                    <th className="p-3 text-center">Due On</th>
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
                <tr key=""
                    className="border-grey mb-2 flex flex-col flex-nowrap border-b bg-white sm:mb-0 
                    sm:table-row ">
                    <td className="px-3 py-3 lg:flex lg:justify-center">
                        <img className="h-6 w-10 object-cover lg:h-8 lg:w-11" src="" alt="Gig cover image" />
                    </td>
                    <td className="p-3 text-left">
                        <div className="grid">
                            <Link to="" className="truncate text-sm font-normal hover:text-sky-500">
                            Gig basic title
                            </Link>
                        </div>
                    </td>
                    <td className="p-3 text-left lg:text-center">20/20/2027</td>
                    <td className="p-3 text-left lg:text-center">
                        20/20/2028
                    </td>
                    <td className="p-3 text-left lg:text-center">$10</td>
                    <td className="px-3 py-1 text-left lg:p-3 lg:text-center">
                        <span
                            className="status rounded bg-transparent p-0 text-xs font-bold uppercase text-black sm:px-[5px] sm:py-[4px]
                             sm:text-white">
                            Completed
                        </span>
                    </td>
                </tr>
            </tbody>
        </>

        <tbody>
            <tr>
                <td className="w-full px-4 py-2 text-sm">No {type} orders to show.</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}
export default Table