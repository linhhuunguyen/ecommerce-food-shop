import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { adminRouter } from 'router/routes.routes';
import { Topbar, Siderbar } from 'components';

export default function AdminLayout() {
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
