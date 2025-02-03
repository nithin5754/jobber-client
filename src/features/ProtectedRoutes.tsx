import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { applicationLogout, saveToSessionStorage } from "src/shared/utils/utils.service";
import { useAppSelector, useAppDispatch } from "src/store/store";
import { useAuthDetails, useCurrentToken, addAuthUser, clearAuthUser } from "./auth/reducers/auth.reducer";
import { useCheckCurrentUserQuery } from "./auth/services/auth.service";
import HomeHeader from "src/shared/header/components/HomeHeader";
import { useGetBuyerByEmailQuery } from "./buyer/services/buyer.service";
import { useGetSellerByIdQuery } from "./seller/services/seller.service";
import { addBuyer } from "./buyer/reducer/buyer.reducer";
import { addSeller } from "./seller/reducers/seller.reducer";
import { useIsCategoryContainerOpen } from "src/shared/header/reducer/category.reducer";
import { useHeaderType } from "src/shared/header/reducer/header.reducer";
import socketService from "src/sockets/socket.service";
import Footer from "src/shared/footer/Footer";



interface IProtectedRoutesProps {
  children:ReactNode
}

const ProtectedRoutes:FC<IProtectedRoutesProps> = ({children}) => {

const socket=socketService.getSocket()
  const authUser = useAppSelector(useAuthDetails);
const showCategoryContainer:boolean=useAppSelector(useIsCategoryContainerOpen)
const headerType:string=useAppSelector(useHeaderType)

  const token = useAppSelector(useCurrentToken);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const { data: currentUserDetails, isError } = useCheckCurrentUserQuery();

  const { data: BuyerData } = useGetBuyerByEmailQuery(undefined);
  const {data:currentSellers}=useGetSellerByIdQuery(undefined)


  const dispatch = useAppDispatch();
  const checkUser = useCallback(() => {
  
      if (currentUserDetails && currentUserDetails.user) {
        setTokenIsValid(true)
        dispatch(addAuthUser({ authInfo: currentUserDetails.user, token: token }));
        dispatch(addBuyer(BuyerData?.buyer));
        dispatch(addSeller(currentSellers?.seller))
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }

      if(isError){
        setTokenIsValid(false)
      if(socket){
        socket.emit('removeLoggedInUser',`${authUser.username}`)
      }
        applicationLogout(dispatch,navigate)
        dispatch(clearAuthUser(undefined))
      }
 
  }, [currentUserDetails, dispatch, authUser?.username,navigate,isError,BuyerData,currentSellers]);


  useEffect(()=>{
    checkUser()
  },[checkUser])

console.log("authuser",authUser)

    if((currentUserDetails&&currentUserDetails.user)||authUser&&authUser.email){
         if(tokenIsValid){
           return (
            <>
        { headerType&&headerType==='home'&& <HomeHeader showCategoryContainer={showCategoryContainer} />}
            {children}
            <Footer/>
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