import { FC, ReactElement } from "react"


import { IProjectStatusBox } from "src/features/seller/interfaces/seller.interface"


const ProfileProjectStatus:FC<IProjectStatusBox> = ({gigInfo}):ReactElement => {
  return (
<>

      <div
        style={{ backgroundColor: `${gigInfo.bgColor}` }}
        className="col-span-4 flex items-center justify-center p-8 sm:col-span-2 md:col-span-1"
      >
        <div className="flex flex-col">
          <span className="text-center text-base lg:text-xl">{gigInfo.total}</span>
          <span className="truncate text-center text-sm lg:text-base">{gigInfo.title}</span>
        </div>
      </div>

</>
  )
}
export default ProfileProjectStatus