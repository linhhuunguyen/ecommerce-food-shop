import { Switch, Route, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@mui/styles';
import { appRoutes, userInfomationRouter } from 'router/routes.routes';

import { Header, Footer } from 'components';
import SidebarUser from 'components/sidebar-user';

export interface AppLayoutProps {
  mode?: 'information';
}

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

export default function Users({ mode }: AppLayoutProps) {
  const classes = useStyles();
  const location = useLocation();
  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));
  const renderRoutes2 = (routes: typeof userInfomationRouter) =>
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
      <Header />
      {mode === 'information' ? (
        <Grid container>
          <Grid item className={classes.sidebar}>
            <SidebarUser />
          </Grid>
          <Grid item className={classes.right}>
            <Switch>{renderRoutes2(userInfomationRouter)}</Switch>
          </Grid>
        </Grid>
      ) : (
        <Switch>{renderRoutes(appRoutes)}</Switch>
      )}

      <Footer />
    </>
  );
}
