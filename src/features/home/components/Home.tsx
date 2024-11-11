import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from "react"
import { applicationLogout } from "src/shared/utils/utils.service"
import { useAppDispatch } from "src/store/store"
import {  useNavigate } from "react-router-dom"
import SliderShimmer from "src/shared/shimmer-ui/sliderShimmer"

import { IFeaturedEdExpertsProps, IHomeProps } from "../interface/home.interfce"
import ShimmerGigsViews from "src/shared/shimmer-ui/ShimmerGigsViews"
import ShimmerFeaturesEdExperts from "src/shared/shimmer-ui/ShimmerFeaturesEdExperts"




const HomeSlider:LazyExoticComponent<FC>=lazy(()=>import("./HomeSlider"))
const HomeGigsView:LazyExoticComponent<FC<IHomeProps>>=lazy(()=>import("./HomeGigsView"))

const HomeFeaturedEdExperts:LazyExoticComponent<FC<IFeaturedEdExpertsProps>>=lazy(()=>import("./HomeFeaturedEdExperts"))

const Home:FC = ():ReactElement => {




  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const handleLogout=():void=>{

    applicationLogout(dispatch,navigate)

    
  }
  return (
<div className="m-auto px-6 w-screen min-h-screen xl:container md:px-12 lg:px-6 ">
<Suspense fallback={<SliderShimmer/>}>
<HomeSlider/>

</Suspense>

<Suspense fallback={<ShimmerGigsViews/>}>

<HomeGigsView gigs={[]} title={"Because you viewed a gig on  "} category="JavaScript" subTitle=""/>
</Suspense>

<Suspense fallback={<ShimmerFeaturesEdExperts/>}>
<HomeFeaturedEdExperts sellers={[]}/>
</Suspense>

</div>
  )
}
export default Home