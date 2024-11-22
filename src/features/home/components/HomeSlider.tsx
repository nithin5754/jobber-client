import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import { ISliderState } from "../interface/home.interfce"
import { sliderImages, sliderImagesText } from "src/shared/utils/utils.service"
import { ISliderImagesText } from "src/shared/shared.interface"

import { v4 as uuidV4 } from "uuid"


const HomeSlider:FC = ():ReactElement => {
  const [slideState,setSliderInterval]=useState<ISliderState>({
    slideShow:sliderImages[0],
    slideIndex:0
  })
  const [slideInterval,setSlideInterval]=useState<NodeJS.Timeout>();
  const [currentSliderImageText,setCurrentSliderImageText]=useState<ISliderImagesText>(sliderImagesText[0])
  let currentSlideIndex=0;

  useEffect(()=>{

const timeInterval=setInterval(() => {
  autoMoveSlide()
}, 4000);
setSlideInterval(timeInterval)
return ()=>{
  clearInterval(timeInterval)
  clearInterval(slideInterval)
}

  },[sliderImages])

  const autoMoveSlide=useCallback(():void=>{
    const lastIndex=currentSlideIndex+1;
    currentSlideIndex=lastIndex>=sliderImages.length?0:lastIndex
    setCurrentSliderImageText(sliderImagesText[currentSlideIndex])
    setSliderInterval((prev:ISliderState)=>({
      ...prev,
      slideIndex:currentSlideIndex,
      slideShow:sliderImages[currentSlideIndex]
    }))

  },[sliderImages])
  return (
    <div className="flex gap-x-8">
    <div className="relative h-96 w-full overflow-hidden bg-red-50">
        <img alt="slider" className="absolute h-96 w-full object-cover transition" src={slideState.slideShow} />
        <div className="absolute px-6 py-4">
            <h2 className="text-3xl font-bold text-white">{currentSliderImageText.header}</h2>
            <h4 className="pt-1 text-white font-bold">{currentSliderImageText.subHeader}</h4>
        </div>
        <div className="absolute bottom-0 left-[40%] flex gap-3 px-6 py-4 ">
          {
            sliderImages.map((_,index)=>(
              
              <div key={uuidV4()} className={`h-2 w-2 rounded-full ${index===slideState.slideIndex?'bg-customPurple hover:bg-customViolet':
                'bg-white'}`}></div>
              
         
            ))
          }
        </div>
    </div>
</div>
  )
}
export default HomeSlider