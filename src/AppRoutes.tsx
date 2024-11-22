import { FC, lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import ResetPasswordModal from 'src/features/auth/components/ResetPassword';
// import Categories from 'src/features/categories/Categories';
import ProtectedRoutes from 'src/features/ProtectedRoutes';


const AppPage: LazyExoticComponent<FC> = lazy(() => import('src/features/AppPage'));

const Home: LazyExoticComponent<FC> = lazy(() => import('src/features/home/components/Home'));
const VerifyEmail: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/VerifyEmail'));

const ErrorPage404: LazyExoticComponent<FC> = lazy(() => import('src/shared/error/Error'));

const BuyerDashBoard: LazyExoticComponent<FC> = lazy(() => import('./features/buyer/components/Dashboard'));

const AddSeller:LazyExoticComponent<FC> = lazy(() => import('./features/seller/components/add/AddSeller'));

const Layout = ({ backgroundColor = '#ffffff', children }: { backgroundColor: string; children: ReactNode }): JSX.Element => {
  return (
    <div style={{ backgroundColor: backgroundColor }} className="flex flex-grow">
      {children}
    </div>
  );
};

const AppRouter: FC = () => {
  let routes: RouteObject[] = [
    {
      path: '/',
      element: (
         <Suspense fallback={"loading..."}>
          <AppPage />
        </Suspense>
      )
    },

    {
      path: '/',
      element: (
        <Suspense fallback={"loading..."}>
          <ProtectedRoutes>
            <Layout backgroundColor="#ffffff">
            <Home />
            </Layout>
          </ProtectedRoutes>
        </Suspense>
      )
    },

    {
      path: 'confirm_email',
      element: (
        <Suspense fallback={"loading..."}>
          <VerifyEmail />
        </Suspense>
      )
    },
    {
      path: 'forgot-password',
      element: (
         <Suspense fallback={"loading..."}>
          <ResetPasswordModal />
        </Suspense>
      )
    },

    // {
    //   path: 'categories/:index',
    //   element: (
    //      <Suspense fallback={"loading..."}>
    //       <ProtectedRoutes>
    //       <Categories />

    //       </ProtectedRoutes>
    //     </Suspense>
    //   )
    // },
    {
      path: 'users/:username/:buyerId/orders',
      element: (
        <Suspense fallback={"loading..."}>
          <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
              <BuyerDashBoard />
            </Layout>
          </ProtectedRoutes>
        </Suspense>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <Suspense fallback={"loading..."}>
          <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
              <AddSeller />
            </Layout>
          </ProtectedRoutes>
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
         <Suspense fallback={"loading..."}>
          <ErrorPage404 />
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
};
export default AppRouter;
