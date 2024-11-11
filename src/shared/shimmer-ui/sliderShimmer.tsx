

import { FC, ReactElement } from "react"


const SliderShimmer:FC = ():ReactElement => {
  return (
    <div className="flex gap-x-8">
    <div className="relative h-96 w-full overflow-hidden bg-red-50">
        <img alt="slider" className="absolute h-96 w-full object-cover transition" src="" />
        <div className="absolute px-6 py-4">
            <h2 className="text-3xl font-bold text-white"></h2>
            <h4 className="pt-1 text-white font-bold"></h4>
        </div>
        <div className="absolute bottom-0 flex gap-3 px-6 py-4">
            <div className="h-2 w-2 rounded-full"></div>
        </div>
    </div>
</div>
  )
}
export default SliderShimmer