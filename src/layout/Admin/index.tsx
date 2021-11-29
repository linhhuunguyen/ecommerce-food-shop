import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@mui/styles';

import { adminRouter } from 'router/routes.routes';
import { Topbar, Siderbar } from 'components';

const useStyles = makeStyles((theme) => ({
  right: {
    marginTop: '5rem !important',
    padding: '24px',
    marginLeft: '13rem !important',
    minHeight: '100vh',
    width: 'calc(100% - 13rem)'
  },
  sidebar: {
    background: '#fff',
    height: '100vh',
    position: 'fixed',
    width: '13rem'
  }
}));

export default function AdminLayout() {
  const classes = useStyles();
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
      <Grid container>
        <Grid item className={classes.sidebar}>
          <Siderbar />
        </Grid>
        <Grid item className={classes.right}>
          <Switch>{renderRoutes(adminRouter)}</Switch>
        </Grid>
      </Grid>
    </>
  );
}
