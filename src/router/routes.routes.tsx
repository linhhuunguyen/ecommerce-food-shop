import React, { ComponentType } from "react";

import { Home, Admin, ProductDetail, ProductsGroup, Search, Cart } from "pages";
import {
  AdminProducts,
  AdminCategory,
  AdminOrders,
  Members
} from "pages/Admin/components";
import AddCate from "pages/Admin/components/Category/AddCate";
import EditCate from "pages/Admin/components/Category/EditCate";
import AddProduct from "pages/Admin/components/Products/AddProduct";
import EditProduct from "pages/Admin/components/Products/EditProuduct";
import OrderDetail from "pages/Admin/components/Orders/OrderDetail";
import AddMember from "pages/Admin/components/Members/AddMembers";

import {
  PATH_HOME,
  PATH_PRODUCT,
  PATH_PRODUCT_DETAIL,
  PATH_SEARCH,
  PATH_CART,
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
  PATH_ADMIN_MEMBERS_ADD
} from "./routes.paths";

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
  }
];

export const adminRouter: RouteModel[] = [
  {
    exact: true,
    path: PATH_ADMIN,
    component: Admin
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
    component: AddCate
  },
  {
    exact: true,
    path: PATH_ADMIN_CATEGORY_UPDATE,
    component: EditCate
  },
  {
    exact: true,
    path: PATH_ADMIN_PRODUCTS_ADD,
    component: AddProduct
  },
  {
    exact: true,
    path: PATH_ADMIN_PRODUCTS_UPDATE,
    component: EditProduct
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
