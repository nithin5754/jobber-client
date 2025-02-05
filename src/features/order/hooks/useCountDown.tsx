import { useEffect, useState } from "react";




const useCountDown = (date:string) => {

  const targetDate:number=Date.parse(date)
  const now:number=Date.parse(`${new Date()}`);

  const [countDown,setCountDown]=useState<number>(targetDate-now)

  useEffect(()=>{
    const intervel:NodeJS.Timeout=setInterval(() => {
      setCountDown(targetDate-Date.parse(`${new Date()}`))
    },1000);

    return ()=>clearInterval(intervel)
  },[targetDate])
     


return getTimeValues(countDown)


}

const getTimeValues=(diff:number):number[]=>{
   
const day:number=Math.floor(diff/(1000*60*60*24));
const hours:number=Math.floor(diff/(1000*60*60));
const mins:number=Math.floor(diff/(1000*60));
const seconds=Math.floor(diff/1000)


const hour: number = hours - day * 24;
const minute: number = mins - hours * 60;
const second: number = seconds - mins * 60;


return [day,hour,minute,second]



}



export default useCountDown