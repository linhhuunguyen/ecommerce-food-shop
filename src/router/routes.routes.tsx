import { ComponentType } from 'react';

import Home from 'pages/users/home';
import ProductDetail from 'pages/users/productDetail';
import ProductsGroup from 'pages/users/productsGroup';
import Search from 'pages/users/search';
import Cart from 'pages/users/cart';
import Shipping from 'pages/users/cart/shipping';
import NotFound from 'pages/users/notFound';
import OrderSuccess from 'pages/users/orderSuccess';
import Profile from 'pages/users/profile';
import Purchase from 'pages/users/purchase';
import ConfirmOrder from 'pages/users/cart/orderConfirm';

import Dashboard from 'pages/admin/dashboard';
import AdminCategory from 'pages/admin/category/list';
import AdminProducts from 'pages/admin/product/list';
import AdminOrders from 'pages/admin/orders';
import Members from 'pages/admin/members';

import CategoryCreate from 'pages/admin/category/create';

import CategoryEdit from 'pages/admin/category/edit';

import ProductCreate from 'pages/admin/product/create';
import ProductEdit from 'pages/admin/product/edit';
import OrderDetail from 'pages/admin/orders/OrderDetail';
import AddMember from 'pages/admin/members/AddMembers';

import {
  PATH_HOME,
  PATH_PRODUCT,
  PATH_PRODUCT_DETAIL,
  PATH_SEARCH,
  PATH_CART,
  PATH_CART_SHIPPING,
  PATH_USER_ACCOUNT_PROFILE,
  PATH_USER_PURCHASE,
  PATH_ADMIN,
  PATH_ADMIN_PRODUCTS,
  PATH_ADMIN_PRODUCTS_ADD,
  PATH_ADMIN_PRODUCTS_UPDATE,
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_CATEGORY_ADD,
  PATH_ADMIN_CATEGORY_UPDATE,
  PATH_ADMIN_ORDERS,
  PATH_ADMIN_ORDERS_DETAIL,
  PATH_ADMIN_MEMBERS,
  PATH_ADMIN_MEMBERS_ADD,
  PATH_ORDER_SUCCESS,
  PATH_CART_ORDER_CONFIRM
} from './routes.paths';

interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_HOME,
    component: Home
  },
  {
    exact: false,
    path: PATH_PRODUCT_DETAIL,
    component: ProductDetail
  },
  {
    exact: false,
    path: PATH_PRODUCT,
    component: ProductsGroup
  },
  {
    exact: false,
    path: PATH_SEARCH,
    component: Search
  },
  {
    exact: true,
    path: PATH_CART,
    component: Cart
  },
  {
    exact: true,
    path: PATH_CART_SHIPPING,
    component: Shipping
  },
  {
    exact: true,
    path: PATH_CART_ORDER_CONFIRM,
    component: ConfirmOrder
  },
  {
    exact: true,
    path: PATH_ORDER_SUCCESS,
    component: OrderSuccess
  },
  {
    exact: true,
    path: '',
    component: NotFound
  }
];

export const userInfomationRouter: RouteModel[] = [
  {
    exact: true,
    path: PATH_USER_PURCHASE,
    component: Purchase
  },
  {
    exact: true,
    path: PATH_USER_ACCOUNT_PROFILE,
    component: Profile
  }
];

export const adminRouter: RouteModel[] = [
  {
    exact: true,
    path: PATH_ADMIN,
    component: Dashboard
  },
  {
    exact: true,
    path: PATH_ADMIN_PRODUCTS,
    component: AdminProducts
  },
  {
    exact: true,
    path: PATH_ADMIN_CATEGORY,
    component: AdminCategory
  },
  {
    exact: true,
    path: PATH_ADMIN_CATEGORY_ADD,
    component: CategoryCreate
  },
  {
    exact: true,
    path: PATH_ADMIN_CATEGORY_UPDATE,
    component: CategoryEdit
  },
  {
    exact: true,
    path: PATH_ADMIN_PRODUCTS_ADD,
    component: ProductCreate
  },
  {
    exact: true,
    path: PATH_ADMIN_PRODUCTS_UPDATE,
    component: ProductEdit
  },
  {
    exact: true,
    path: PATH_ADMIN_ORDERS,
    component: AdminOrders
  },
  {
    exact: true,
    path: PATH_ADMIN_ORDERS_DETAIL,
    component: OrderDetail
  },
  {
    exact: true,
    path: PATH_ADMIN_MEMBERS,
    component: Members
  },
  {
    exact: true,
    path: PATH_ADMIN_MEMBERS_ADD,
    component: AddMember
  }
];
