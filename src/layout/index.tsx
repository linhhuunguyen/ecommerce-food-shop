import * as React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { appRoutes } from "../router/routers";

export interface AppLayoutProps {}

export default function AppLayout(props: AppLayoutProps) {
  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));

  return <Switch>{renderRoutes(appRoutes)}</Switch>;
}
