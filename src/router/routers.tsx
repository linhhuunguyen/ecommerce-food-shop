import * as React from "react";
import { ComponentType } from "react";
import Admin from "../pages/Admin";
import Home from "../pages/Home/Home";
import SignInOut from "../pages/SignInOut";
import Signup from "../pages/SignInOut/components/Signup";
import {
  PATH_HOME,
  PATH_ADMIN,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_ADMIN_DASHBOARD
} from "./routerPaths";

interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}
export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: PATH_LOGIN,
    component: SignInOut
  },
  {
    exact: true,
    path: PATH_HOME,
    component: Home
  },
  {
    exact: true,
    path: PATH_ADMIN,
    component: Admin
  },
  {
    exact: true,
    path: PATH_SIGNUP,
    component: Signup
  }
];
