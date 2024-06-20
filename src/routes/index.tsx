import Layout from 'layouts';
import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from 'utils/route-util';

const Login = lazy(() => import('pages/Login'));
const Home = lazy(() => import('pages/Home'));
const Order = lazy(() => import('pages/Order'));
const Product = lazy(() => import('pages/Product'));
const Shop = lazy(() => import('pages/Shop'));
const Account = lazy(() => import('pages/Account'));

const router = createBrowserRouter(
  [
    // {
    //   path: ROUTE_PATH.login,
    //   element: (
    //     <Suspense>
    //       <Login />
    //     </Suspense>
    //   ),
    // },
    {
      path: ROUTE_PATH.root,
      element: <Layout />,
      errorElement: <Navigate to={ROUTE_PATH.home} />,
      children: [
        {
          path: ROUTE_PATH.home,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.order,
          element: (
            <Suspense>
              <Order />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.product,
          element: (
            <Suspense>
              <Product />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.shop,
          element: (
            <Suspense>
              <Shop />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.account,
          element: (
            <Suspense>
              <Account />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.root,
          element: <Navigate to={ROUTE_PATH.home} replace />,
        },
      ],
    },
  ],
  { basename: process.env.REACT_APP_PUBLIC_URL },
);

export { router };
