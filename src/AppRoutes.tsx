import { FC, lazy, LazyExoticComponent, ReactNode, Suspense } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import ResetPasswordModal from 'src/features/auth/components/ResetPassword';

import ProtectedRoutes from 'src/features/ProtectedRoutes';
import GigView from './features/gigs/components/view/GigView';
import Gigs from './features/gigs/components/gigs/Gigs';
import Checkout from './features/order/components/Checkout';
import Requirements from './features/order/components/Requirements';
import Order from './features/order/components/Order';
import PrivacyPolicy from './shared/footer/PrivacyPolicy';
import FooterLayout from './shared/footer/FooterLayout';
import TermOfService from './shared/footer/TermOfService';
import RefundPolicy from './shared/footer/RefundPolicy';
import Contact from './shared/footer/Contact';
import ShippingPolicy from './shared/footer/ShippingPolicy';
import CircularPageLoader from './shared/page-loader/CircularPageLoader';
import IndexGigs from './features/gigs/components/gigs/IndexGigs';
import IndexGigRoute from './features/gigs/components/gigs/IndexGigRoute';

const AppPage: LazyExoticComponent<FC> = lazy(() => import('src/features/AppPage'));

const Home: LazyExoticComponent<FC> = lazy(() => import('src/features/home/components/Home'));
const VerifyEmail: LazyExoticComponent<FC> = lazy(() => import('src/features/auth/components/VerifyEmail'));

const ErrorPage404: LazyExoticComponent<FC> = lazy(() => import('src/shared/error/Error'));

const Chat: LazyExoticComponent<FC> = lazy(() => import('src/features/chat/components/Chat'));
const BuyerDashBoard: LazyExoticComponent<FC> = lazy(() => import('src/features/buyer/components/BuyerDashboard'));

const AddSeller: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/add/AddSeller'));

const CurrentProfile: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/profile/CurrentSellerProfile'));
const SellerProfile: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/profile/SellerProfile'));
const Seller: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/dashboard/Seller'));

const SellerDashBoard: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/dashboard/SellerDashBoard'));
const ManageOrders: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/dashboard/ManageOrders'));
const ManageEarnings: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/dashboard/ManageEarnings'));
const AddGig: LazyExoticComponent<FC> = lazy(() => import('src/features/gigs/components/gig/AddGig'));
const EditGigs: LazyExoticComponent<FC> = lazy(() => import('src/features/gigs/components/gig/EditGigs'));
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
        <Suspense fallback={<CircularPageLoader/>}>
          <AppPage />
        </Suspense>
      )
    },
    {
      path: '/index-search/gigs',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
   <IndexGigRoute>

              <IndexGigs type="search" />
   </IndexGigRoute>

            </Suspense>
     
      )
    },
    {
      path: '/index-search/categories/:category',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
   <IndexGigRoute>

              <IndexGigs type="categories" />
   </IndexGigRoute>

            </Suspense>
     
      )
    },

    {
      path: '/privacy',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <Layout backgroundColor="#ffffff ">
            <FooterLayout>
              <PrivacyPolicy />
            </FooterLayout>
          </Layout>
        </Suspense>
      )
    },


    {
      path: '/terms-of-service',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <Layout backgroundColor="#ffffff ">
            <FooterLayout>
              <TermOfService />
            </FooterLayout>
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/refund_policy',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <Layout backgroundColor="#ffffff ">
            <FooterLayout>
              <RefundPolicy />
            </FooterLayout>
          </Layout>
        </Suspense>
      )
    },

    {
      path: '/contact',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <Layout backgroundColor="#ffffff ">
            <FooterLayout>
              <Contact />
            </FooterLayout>
          </Layout>
        </Suspense>
      )
    },

    {
      path: '/shipping-policy',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <Layout backgroundColor="#ffffff ">
            <FooterLayout>
              <ShippingPolicy />
            </FooterLayout>
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor="#ffffff">
      <Suspense fallback={<CircularPageLoader/>}>
              <Home />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/confirm_email',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <VerifyEmail />
        </Suspense>
      )
    },
    {
      path: 'forgot-password',
      element: (
          <Suspense fallback={<CircularPageLoader/>}>
          <ResetPasswordModal />
        </Suspense>
      )
    },
    {
      path: 'users/:username/:buyerId/orders',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
      <Suspense fallback={<CircularPageLoader/>}>
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
      <Suspense fallback={<CircularPageLoader/>}>
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
      <Suspense fallback={<CircularPageLoader/>}>
              <CurrentProfile />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
      <Suspense fallback={<CircularPageLoader/>}>
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
      <Suspense fallback={<CircularPageLoader/>}>
              <Seller />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      ),
      children: [
        {
          path: 'seller_dashboard',
          element: (
            <Suspense fallback={'loading..'}>
              <SellerDashBoard />
            </Suspense>
          )
        },
        {
          path: 'manage_orders',
          element: (
            <Suspense fallback={'loading..'}>
              <ManageOrders />
            </Suspense>
          )
        },
        {
          path: 'manage_earnings',
          element: (
            <Suspense fallback={'loading..'}>
              <ManageEarnings />
            </Suspense>
          )
        }
      ]
    },

    {
      path: '/manage_gigs/new/:sellerId',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
      <Suspense fallback={<CircularPageLoader/>}>
              <AddGig />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },
    {
      path: '/manage_gigs/edit/:gigId',
      element: (
        <Suspense>
          <ProtectedRoutes>
            <Layout backgroundColor={'#e0e0e0f'}>
              <EditGigs />
            </Layout>
          </ProtectedRoutes>
        </Suspense>
      )
    },

    {
      path: '/gig/:username/:title/:sellerId/:gigId/view',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
      <Suspense fallback={<CircularPageLoader/>}>
              <GigView />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/categories/:category',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
      <Suspense fallback={<CircularPageLoader/>}>
              <Gigs type="categories" />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },
    {
      path: '/search/gigs',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
          <Suspense fallback={<CircularPageLoader/>}>
              <Gigs type="search" />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/gig/checkout/:gigId',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor="#ffffff">
            <Suspense >
              <Checkout />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },
    {
      path: '/gig/order/requirement/:gigId',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={<CircularPageLoader/>}>
              <Requirements />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },
    {
      path: '/orders/:orderId/activities',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={<CircularPageLoader/>}>
              <Order />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/inbox',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={<CircularPageLoader/>}>
              <Chat />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '/inbox/:username/:conversationId',
      element: (
        <ProtectedRoutes>
          <Layout backgroundColor={'#e0e0e0f'}>
            <Suspense fallback={<CircularPageLoader/>}>
              <Chat />
            </Suspense>
          </Layout>
        </ProtectedRoutes>
      )
    },

    {
      path: '*',
      element: (
        <Suspense fallback={<CircularPageLoader/>}>
          <ErrorPage404 />
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
};
export default AppRouter;
