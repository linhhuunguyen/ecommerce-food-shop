import React from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CategoryIcon from '@material-ui/icons/Category';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: 'auto'
    },
    titleStyle: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#161f6a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 55px 20px 30px'
    },
    nameStyle: {
      paddingLeft: '15px'
    }
  })
);

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <Toolbar />
        <Box className={classes.drawerContainer}>
          <NavLink
            exact
            to="/admin"
            className={classes.titleStyle}
            activeClassName="active-links"
          >
            <DashboardIcon />
            <Typography className={classes.nameStyle}>Dashboard</Typography>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={classes.titleStyle}
            activeClassName="active-links"
          >
            <ShoppingBasketIcon />
            <Typography className={classes.nameStyle}>Products</Typography>
          </NavLink>

          <NavLink
            to="/admin/category"
            className={classes.titleStyle}
            activeClassName="active-links"
          >
            <CategoryIcon />
            <Typography className={classes.nameStyle}> Category</Typography>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={classes.titleStyle}
            activeClassName="active-links"
          >
            <ShopTwoIcon />
            <Typography className={classes.nameStyle}>Orders</Typography>
          </NavLink>

          <NavLink
            to="/admin/members"
            className={classes.titleStyle}
            activeClassName="active-links"
          >
            <PeopleAltIcon />
            <Typography className={classes.nameStyle}>Members</Typography>
          </NavLink>
        </Box>
      </Drawer>
    </Box>
  );
}
