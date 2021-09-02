import * as React from "react";
import { ComponentType } from "react";

import { Home, Admin, ProductDetail, ProductsGroup, Search, Cart } from "pages";
import { AdminProducts, AdminCategory } from "pages/Admin/components";
import AddCate from "pages/Admin/components/Category/AddCate";
import EditCate from "pages/Admin/components/Category/EditCate";

import { Login, Signup } from "pages/LoginSignup/components";
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_SIGNUP,
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
  PATH_ADMIN_CATEGORY_UPDATE
} from "./routes.paths";

interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_LOGIN,
    component: Login
  },
  {
    exact: true,
    path: PATH_HOME,
    component: Home
  },

  {
    exact: true,
    path: PATH_SIGNUP,
    component: Signup
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
  }
];
