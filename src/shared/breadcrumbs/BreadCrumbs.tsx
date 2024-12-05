import { FC, ReactElement } from "react"
import { FaHome, FaAngleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IBreadCrumbProps } from "../shared.interface"
import { v4 as uuidV4 } from "uuid"

const BreadCrumbs:FC<IBreadCrumbProps> = ({breadCrumbItems}):ReactElement => {
  return (
    <nav className="flex px-4 py-6 text-white bg-customViolet/60">
    <ol className="container mx-auto px-6 md:px-12 lg:px-6 inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
            <Link to="/"
                className="inline-flex items-center text-sm font-bold text-white uppercase hover:text-customPurple dark:text-white dark:hover:text-white">
            <FaHome className="mr-2 h-4 w-4" />
            Home
            </Link>
        </li>

      {
        breadCrumbItems.map((item:string)=>(
          <div key={uuidV4()} className="flex items-center">
          <FaAngleRight className="h-6 w-6 text-white" />
          <a href="#"
              className="ml-1 text-sm font-bold text-white uppercase hover:text-customPurple dark:text-white dark:hover:text-white md:ml-2">
              {item}
          </a>
      </div>
        ))
      }
    </ol>
</nav>
  )
}
export default BreadCrumbs