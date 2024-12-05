import { FC, lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import ResetPasswordModal from 'src/features/auth/components/ResetPassword';
// import Categories from 'src/features/categories/Categories';
import ProtectedRoutes from 'src/features/ProtectedRoutes';




const AppPage: LazyExoticComponent<FC> = lazy(() => import('src/features/AppPage'));

const Home: LazyExoticComponent<FC> = lazy(() => import('src/features/home/components/Home'));
const VerifyEmail: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/VerifyEmail'));

const ErrorPage404: LazyExoticComponent<FC> = lazy(() => import('src/shared/error/Error'));

const BuyerDashBoard: LazyExoticComponent<FC> = lazy(() => import('src/features/buyer/components/Dashboard'));

const AddSeller:LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/add/AddSeller'));

const CurrentProfile:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/profile/CurrentSellerProfile'))
const SellerProfile:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/profile/SellerProfile'))
const Seller:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/dashboard/Seller'))


const SellerDashBoard:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/dashboard/SellerDashBoard'))
const ManageOrders:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/dashboard/ManageOrders'))
const ManageEarnings:LazyExoticComponent<FC>=lazy(()=>import('src/features/seller/components/dashboard/ManageEarnings'))

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
        <ProtectedRoutes>
            <Layout backgroundColor="#ffffff">
            <Suspense fallback={"loading..."}>
            <Home />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
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
        <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
          <Suspense fallback={"loading..."}>
              <BuyerDashBoard />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={"loading..."}>
              <AddSeller />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/edit',
      element: (
        <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={"loading..."}>
              <CurrentProfile />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
      ),
 
    },

    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={"loading..."}>
              <SellerProfile />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
      )
    },


    {
      path: '/:username/:sellerId',
      element: (
        <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={"loading..."}>
              <Seller />
        </Suspense>
            </Layout>
          </ProtectedRoutes>
      ),
      children:[
        {
          path:'seller_dashboard',
          element:<Suspense fallback={'loading..'}>
            <SellerDashBoard/>
          </Suspense>
        },
        {
          path:'manage_orders',
          element:<Suspense fallback={'loading..'}>
                <ManageOrders/>
               </Suspense>
        },
        {
          path:'manage_earnings',
          element:<Suspense fallback={'loading..'}>
                <ManageEarnings/>
               </Suspense>
        }
      ]
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
