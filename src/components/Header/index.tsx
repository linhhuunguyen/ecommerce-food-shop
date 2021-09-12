import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ShoppingCart, Search } from "@material-ui/icons";
import { useAppSelector } from "store/hook";

import { BuyerLogin, Account } from "./components";

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
    fontSize: "29px",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  logoSm: {
    display: "block",
    fontSize: "29px",
    fontWeight: "bold",
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
    display: "flex"
  },
  badge: {
    marginLeft: theme.spacing(5)
  },
  iconSearch: {
    margin: "0 16px"
  }
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const cart = useAppSelector((state) => state.cart);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoLg}>
            <Link to="/">
              <span style={{ color: "#161f6a" }}>Pick</span>
              <span style={{ color: "#019376" }}>Bazar</span>
            </Link>
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
              <Link
                to={value !== "" ? `/search?q=${value}` : ""}
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Search className={classes.iconSearch} />
              </Link>
            </Button>
          </div>
          <div className={classes.icons}>
            <Search className={classes.searchButton} />
            {!localStorage.getItem("buyerToken") ? (
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  />
                </Box>
                <Account />
              </Box>
            ) : (
              <BuyerLogin />
            )}

            {/* 
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge> */}

            <Badge
              badgeContent={cart.cartItems.length}
              color="secondary"
              className={classes.badge}
            >
              <Link to="/cart" style={{ color: "#333" }}>
                <ShoppingCart />
              </Link>
            </Badge>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
