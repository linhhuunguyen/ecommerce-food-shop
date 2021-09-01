import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";

import { adminRouter } from "router/routes.routes";
import { Topbar, Siderbar } from "components";

export interface AdminLayoutProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  const renderRoutes = (routes: typeof adminRouter) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));
  return (
    <>
      <Topbar />
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <Siderbar />
        </Grid>
        <Grid item sm={10}>
          <Switch>{renderRoutes(adminRouter)}</Switch>
        </Grid>
      </Grid>
    </>
  );
}
