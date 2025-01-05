import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/store';
import { addAuthUser, clearAuthUser, useAuthDetails, useCurrentToken } from './auth/reducers/auth.reducer';
import { useUserLogout } from './auth/reducers/logout.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { applicationLogout, getDataFromLocalStorage, saveToSessionStorage } from 'src/shared/utils/utils.service';

import { IHomeHeaderProps } from 'src/shared/header/interface/header.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useGetBuyerByEmailQuery } from './buyer/services/buyer.service';
import { addBuyer } from './buyer/reducer/buyer.reducer';
import { useGetSellerByIdQuery } from './seller/services/seller.service';
import { addSeller } from './seller/reducers/seller.reducer';
import { useIsCategoryContainerOpen } from 'src/shared/header/reducer/category.reducer';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import socketService from 'src/sockets/socket.service';



const Index: LazyExoticComponent<FC> = lazy(() => import('./index/Index'));
const Home: LazyExoticComponent<FC> = lazy(() => import('./home/components/Home'));
const HomeHeader: LazyExoticComponent<FC<IHomeHeaderProps>> = lazy(() => import('src/shared/header/components/HomeHeader'));

const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector(useAuthDetails);
 
  let showCategoryContainer: boolean = useAppSelector(useIsCategoryContainerOpen)
  const token = useAppSelector(useCurrentToken);
  const userLogOut = useAppSelector(useUserLogout);
  const navigate: NavigateFunction = useNavigate();
  const { data: BuyerData ,isLoading:isBuyerLoading } = useGetBuyerByEmailQuery(undefined, { skip: authUser.id === null });

  const { data: currentUserDetails, isError,isLoading:isUserLoading } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
  const {data:currentSellers,isLoading:isSellerLoading}=useGetSellerByIdQuery(undefined, { skip: authUser.id === null })

const socket=socketService.getSocket()


  const dispatch = useAppDispatch();
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const checkUser = useCallback(() => {
    try {
      if (currentUserDetails && currentUserDetails.user && !userLogOut) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserDetails.user, token: token }));
        dispatch(addBuyer(BuyerData?.buyer));
        dispatch(addSeller(currentSellers?.seller))
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));

        const becomeASeller:boolean=getDataFromLocalStorage('becomeASeller')



        if(becomeASeller){
          navigate('/seller_onboarding')
        }

        if(authUser&&authUser.username&&authUser.username!==null&&socket){
          socket.emit('loggedInUsers', authUser.id,authUser.username);
        
      }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket,currentUserDetails,navigate, dispatch, userLogOut, authUser?.username,currentSellers,BuyerData]);

  const logoutUser = useCallback(() => {
    if ((!currentUserDetails && userLogOut) || isError) {
      setTokenIsValid(false);
if(socket){
  socket.emit('removeLoggedInUser',`${authUser.username}`)
}
      applicationLogout(dispatch, navigate);
      dispatch(clearAuthUser(undefined));
    }
  }, [currentUserDetails, dispatch, userLogOut, navigate, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser]);




  if (authUser) {

    
  
    return (
      <>
        {!tokenIsValid && !authUser.id ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Index />
          </Suspense>
        ) : (
          <>
          
            {(isBuyerLoading||isUserLoading||isSellerLoading)?(
              <CircularPageLoader/>
            ):(<>
                  
                  <Suspense fallback={<div>Loading...</div>}>
                  <HomeHeader showCategoryContainer={showCategoryContainer} />
                  <Home />
                </Suspense>
            </>)}
    
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <Suspense>
          <Index />
        </Suspense>
      </>
    );
  }
};
export default AppPage;
