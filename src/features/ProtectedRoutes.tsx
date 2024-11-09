import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { applicationLogout, saveToSessionStorage } from "src/shared/utils/utils.service";
import { useAppSelector, useAppDispatch } from "src/store/store";
import { useAuthDetails, useCurrentToken, addAuthUser, clearAuthUser } from "./auth/reducers/auth.reducer";
import { useCheckCurrentUserQuery } from "./auth/services/auth.service";
import HomeHeader from "src/shared/header/components/HomeHeader";



interface IProtectedRoutesProps {
  children:ReactNode
}

const ProtectedRoutes:FC<IProtectedRoutesProps> = ({children}) => {


  const authUser = useAppSelector(useAuthDetails);
const showCategoryContainer:boolean=true
  const token = useAppSelector(useCurrentToken);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const { data: currentUserDetails, isError } = useCheckCurrentUserQuery();
  console.log("currentUserDetails",currentUserDetails)
  console.log("isError",isError)
  const dispatch = useAppDispatch();

  const checkUser = useCallback(() => {
  
      if (currentUserDetails && currentUserDetails.user) {
        setTokenIsValid(true)
        dispatch(addAuthUser({ authInfo: currentUserDetails.user, token: token }));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }

      if(isError){
        setTokenIsValid(false)
        applicationLogout(dispatch,navigate)
        dispatch(clearAuthUser(undefined))
      }
 
  }, [currentUserDetails, dispatch, authUser?.username,navigate]);


  useEffect(()=>{
    checkUser()
  },[checkUser])

    if((currentUserDetails&&currentUserDetails.user)||authUser){
         if(tokenIsValid){
           return (
            <>
            <HomeHeader showCategoryContainer={showCategoryContainer}/>
            {children}
            
            </>
           )
         }else{
          return <></>
         }
       
    }else{
      return <> <Navigate to={'/'} replace/></>
    }
}
export default ProtectedRoutes