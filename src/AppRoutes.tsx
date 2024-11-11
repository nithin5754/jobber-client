import { FC, lazy, LazyExoticComponent, Suspense } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import ResetPasswordModal from 'src/features/auth/components/ResetPassword';
import Categories from 'src/features/categories/Categories';
import ProtectedRoutes from 'src/features/ProtectedRoutes';


const AppPage: LazyExoticComponent<FC> = lazy(() => import('src/features/AppPage'));

const Home: LazyExoticComponent<FC> = lazy(() => import('src/features/home/components/Home'));
const VerifyEmail: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/VerifyEmail'));

const ErrorPage404:LazyExoticComponent<FC>=lazy(()=>import('src/shared/error/Error'))

const AppRouter: FC = () => {
  let routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Suspense>
          <AppPage />
        </Suspense>
      )
    },

    {
      path: '/',
      element: (
        <Suspense>
         <ProtectedRoutes>
            <Home/>
         </ProtectedRoutes>
        </Suspense>
      )
    },

    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <VerifyEmail />
        </Suspense>
      )
    },
    {
      path: 'forgot-password',
      element: (
        <Suspense>
          <ResetPasswordModal />
        </Suspense>
      )
    },

    {
      path: 'categories/:index',
      element: (
        <Suspense>
          <ProtectedRoutes>
          <Categories />

          </ProtectedRoutes>
        </Suspense>
      )
    },

 

    {
      path: '*',
      element: (
        <Suspense>
        
            <ErrorPage404/>
   
        </Suspense>
      )
    },
  ];

  return useRoutes(routes);
};
export default AppRouter;
