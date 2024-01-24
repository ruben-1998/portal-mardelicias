import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UserDescription from '../views/dashboard/Users/UserDescription';
import Products from '../views/dashboard/Products';
import ProductDetails from '../views/dashboard/Products/ProductDetails';
import UserNew from '../views/dashboard/Users/UserNew';
import ProductNew from '../views/dashboard/Products/ProductNew';
import Orders from '../views/dashboard/Orders';
import OrderDetails from '../views/dashboard/Orders/OrderDetails';
import Banks from 'views/dashboard/Bank';
import BankNew from 'views/dashboard/Bank/BankNew';
import BankDetails from 'views/dashboard/Bank/BankDetails';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Users = Loadable(lazy(() => import('views/dashboard/Users')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/users',
      children: [
        {
          path: '',
          element: <Users />
        },
        {
          path: ':id',
          element: <UserDescription />
        },
        {
          path: 'add',
          element: <UserNew />
        }
      ]
    },
    {
      path: '/products',
      children: [
        {
          path: '',
          element: <Products />
        },
        {
          path: ':id',
          element: <ProductDetails />
        },
        {
          path: 'add',
          element: <ProductNew />
        }
      ]
    },
    {
      path: '/banks',
      children: [
        {
          path: '',
          element: <Banks />
        },
        {
          path: ':id',
          element: <BankDetails />
        },
        {
          path: 'add',

          element: <BankNew />
        }
      ]
    },
    {
      path: '/orders',
      children: [
        {
          path: '',
          element: <Orders />
        },
        {
          path: ':id',
          element: <OrderDetails />
        }
      ]
    }
  ]
};

export default MainRoutes;
