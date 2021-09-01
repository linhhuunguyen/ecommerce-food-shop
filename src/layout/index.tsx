import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { appRoutes } from "router/routes.routes";

import { Header, Footer } from "components";

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

  return (
    <BrowserRouter>
      <Header />
      <Switch>{renderRoutes(appRoutes)}</Switch>
      <Footer />
    </BrowserRouter>
  );
}
