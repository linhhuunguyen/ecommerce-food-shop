import React from "react";
import { Link, useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CategoryIcon from "@material-ui/icons/Category";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

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
  const history = useHistory();
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
          <Box className={classes.items}>
            <Link to="/admin/products" className={classes.titleStyle}>
              <ShoppingBasketIcon />
              <Typography className={classes.nameStyle}>Products</Typography>
            </Link>
          </Box>
          <Box className={classes.items}>
            <Link to="/admin/category" className={classes.titleStyle}>
              <CategoryIcon />
              <Typography className={classes.nameStyle}> Category</Typography>
            </Link>
          </Box>
          <Box className={classes.items}>
            <Link to="/admin/orders" className={classes.titleStyle}>
              <ShopTwoIcon />
              <Typography className={classes.nameStyle}>Orders</Typography>
            </Link>
          </Box>
          <Box className={classes.items}>
            <Link to="/admin/members" className={classes.titleStyle}>
              <PeopleAltIcon />
              <Typography className={classes.nameStyle}>Members</Typography>
            </Link>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}
