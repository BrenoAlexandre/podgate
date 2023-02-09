import { lazy } from 'react';
import { IRoute } from '../routes/types';

// const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const Category = lazy(() => import('../pages/category'));
const Feed = lazy(() => import('../pages/feed'));
// const Error = lazy(() => import('../pages/error'));

export const routes: IRoute[] = [
  // {
  //   path: '/login',
  //   component: Login,
  // },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/category/:category',
    component: Category,
  },
  {
    path: '/feed/:feedId',
    component: Feed,
  },
  // {
  //   path: '*',
  //   component: Error,
  // },
];
