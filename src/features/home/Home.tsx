import { FC, ReactElement } from "react"
import { applicationLogout } from "src/shared/utils/utils.service"
import { useAppDispatch } from "src/store/store"
import {  useNavigate } from "react-router-dom"





const Home:FC = ():ReactElement => {

  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const handleLogout=():void=>{

    applicationLogout(dispatch,navigate)

    
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
export default Home