import React from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CategoryIcon from "@material-ui/icons/Category";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";

import { Link } from "react-router-dom";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    items: {
      display: "flex",
      alignItems: "center",
      padding: "20px 55px 20px 30px"
    },
    titleStyle: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#161f6a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    nameStyle: {
      paddingLeft: "15px"
    }
  })
);

export interface SidebarProps {}

export default function Sidebar(props: SidebarProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Box className={classes.items}>
            <Link to="/admin" className={classes.titleStyle}>
              <DashboardIcon />
              <Typography className={classes.nameStyle}>Dashboard</Typography>
            </Link>
          </Box>
        </div>
        <div className={classes.drawerContainer}>
          <Box className={classes.items}>
            <Link to="/admin/products" className={classes.titleStyle}>
              <ShoppingBasketIcon />
              <Typography className={classes.nameStyle}>Products</Typography>
            </Link>
          </Box>
        </div>
        <div className={classes.drawerContainer}>
          <Box className={classes.items}>
            <Link to="/admin/category" className={classes.titleStyle}>
              <CategoryIcon />
              <Typography className={classes.nameStyle}> Category</Typography>
            </Link>
          </Box>
        </div>
        <div className={classes.drawerContainer}>
          <Box className={classes.items}>
            <Link to="/admin/orders" className={classes.titleStyle}>
              <ShopTwoIcon />
              <Typography className={classes.nameStyle}>Orders</Typography>
            </Link>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}
