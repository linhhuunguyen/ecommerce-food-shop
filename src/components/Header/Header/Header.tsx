import * as React from "react";
import { useState } from "react";
import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";

import {
  Cancel,
  Mail,
  Notifications,
  ShoppingCart,
  Search
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%"
    // [theme.breakpoints.down("sm")]: {
    //   display: (props) => (props.open ? "flex" : "none"),
    //   width: "70%",
    // },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1)
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  icons: {
    alignItems: "center",
    // display: (props) => (props.open ? "none" : "flex"),
    display: "flex"
  },
  badge: {
    marginRight: theme.spacing(2)
  }
}));

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoLg}>
            Lama Dev
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            LAMA
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase placeholder="Search..." className={classes.input} />
            {/* <Cancel className={classes.cancel} onClick={() => setOpen(false)} /> */}
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              // onClick={() => setOpen(true)}
            />
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <ShoppingCart />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            />
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
