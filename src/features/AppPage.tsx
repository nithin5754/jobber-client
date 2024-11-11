import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/store';
import { addAuthUser, clearAuthUser, useAuthDetails, useCurrentToken } from './auth/reducers/auth.reducer';
import { useUserLogout } from './auth/reducers/logout.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { applicationLogout, getDataFromSessionStorage, saveToSessionStorage } from 'src/shared/utils/utils.service';

import { IHomeHeaderProps } from 'src/shared/header/interface/header.inferface';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Index: LazyExoticComponent<FC> = lazy(() => import('./index/Index'));
const Home: LazyExoticComponent<FC> = lazy(() => import('./home/components/Home'));
const HomeHeader: LazyExoticComponent<FC<IHomeHeaderProps>> = lazy(() => import('src/shared/header/components/HomeHeader'));
let showCategoryContainer:boolean=true
const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector(useAuthDetails);

  const token = useAppSelector(useCurrentToken);
  const userLogOut = useAppSelector(useUserLogout);
  const navigate: NavigateFunction = useNavigate();
  const { data: currentUserDetails, isError } = useCheckCurrentUserQuery();
  const dispatch = useAppDispatch();
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const checkUser = useCallback(() => {
    try {
      if (currentUserDetails && currentUserDetails.user && !userLogOut) {
        setTokenIsValid(true)
        dispatch(addAuthUser({ authInfo: currentUserDetails.user, token: token }));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUserDetails, dispatch, userLogOut, authUser?.username]);

  const logoutUser = useCallback(() => {

      if ((!currentUserDetails && userLogOut)|| isError) {
        setTokenIsValid(false)
        applicationLogout(dispatch, navigate);
        dispatch(clearAuthUser(undefined))
      }
  
  }, [currentUserDetails, dispatch, userLogOut, navigate, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser]);

  if (authUser) {
    return (

<>
{!tokenIsValid&&!authUser.id? (
   <Suspense fallback={<div>Loading...</div>}>
     <Index />
   
   </Suspense>
        ) : (
          <>
           <Suspense fallback={<div>Loading...</div>}>
           <HomeHeader showCategoryContainer={showCategoryContainer} />
           <Home />
   </Suspense>
        
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
