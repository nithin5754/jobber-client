import { FC, Fragment, ReactElement, useEffect, useState } from "react"
import { IStartRatingProps } from "../shared.inferface"
import { FaRegStar, FaStar } from "react-icons/fa"
import { v4 as uuidV4 } from "uuid"



const StarRating:FC<IStartRatingProps> = ({value,size,setReviewRating}):ReactElement => {

  const [numberOfStars]=useState<number[]>([...Array(5).keys().map((index:number)=>index+1)])

  const [rating,setRating]=useState<number>(0)
    

  useEffect(()=>{

    if(value){
      setRating(value)
    }

  },[value])


  const handleClick=(index:number)=>{
    if(!value&&setReviewRating){
      setReviewRating(index)
      setRating(index)
    }
  }


  return (
    <div className="flex cursor-pointer">
      <div className="flex relative text-customPurple">
          {numberOfStars.map((index:number)=>(
        <Fragment key={uuidV4()}>
          {index<=rating&&<FaStar size={size} className="mr-1"/>}
            </Fragment>    
          ))}

          <div className="absolute flex text-customPurple">
          {numberOfStars.map((index:number)=>(    
          <FaRegStar size={size} className="mr-1" key={index} onClick={()=>handleClick(index)}/>
            
            
          ))}
          </div>

      </div>

    </div>
  )
}
export default StarRating