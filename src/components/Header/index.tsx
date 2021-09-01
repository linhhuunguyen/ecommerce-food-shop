import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Container,
  InputBase,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { Notifications, ShoppingCart, Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#333"
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
    backgroundColor: "#f7f7f7",
    borderRadius: theme.shape.borderRadius,
    width: "50%"
    // [theme.breakpoints.down("sm")]: {
    //   display: (props) => (props.open ? "flex" : "none"),
    //   width: "70%",
    // },
  },
  input: {
    color: "#77798c",
    width: "100%",
    padding: "5px 10px",
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
  },
  iconSearch: {
    margin: "0 16px"
  }
}));

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoLg}>
            <Link to="/"> Resto.</Link>
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            <Link to="/"> Resto.</Link>
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search..."
              className={classes.input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button>
              <Link to={value === "" ? "" : `/search?q=${value}`}>
                <Search className={classes.iconSearch} />
              </Link>
            </Button>

            {/* <Cancel className={classes.cancel} onClick={() => setOpen(false)} /> */}
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              // onClick={() => setOpen(true)}
            />
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Link to="/cart">
                <ShoppingCart />
              </Link>
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
      </Container>
    </AppBar>
  );
}
