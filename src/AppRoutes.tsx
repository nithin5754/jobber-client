import { FC, lazy, LazyExoticComponent, Suspense } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import ResetPasswordModal from './features/auth/components/ResetPassword';

const AppPage: LazyExoticComponent<FC> = lazy(() => import('src/features/AppPage'));

const Home: LazyExoticComponent<FC> = lazy(() => import('./features/home/Home'));
const VerifyEmail: LazyExoticComponent<FC> = lazy(() => import('./features/auth/components/VerifyEmail'));

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
          <Home />
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
  ];

  return useRoutes(routes);
};
export default AppRouter;
