import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { BsFillInboxesFill, BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

import { useAppDispatch, useAppSelector } from "store/hook";
import { getProducts } from "store/Products/products.slide";
import { getCategorys } from "store/Categories/categories.slice";
import { getOrders } from "store/Orders/orders.slice";
import { getMembers } from "store/User/user.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    boxItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: "15px",
      height: "45vh"
    },
    iconItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: "64px",
      height: "64px"
    },
    textItem: {
      fontWeight: 600,
      fontSize: "0.85rem",
      opacity: 0.72,
      textAlign: "center"
    },
    numberStyle: {
      fontWeight: 800,
      fontSize: "4.5rem",
      lineHeight: 1.35,
      paddingTop: "20px",
      textAlign: "center"
    }
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productsList);
  const categories = useAppSelector((state) => state.categories.cateloryList);
  const orders = useAppSelector((state) => state.order.orderList);
  const members = useAppSelector((state) => state.users.usersList);
  const buyer = members.filter((member) => member.role.includes("buyer"));

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategorys());
    dispatch(getOrders());
    dispatch(getMembers());
  }, [dispatch]);
  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box
            className={classes.boxItem}
            style={{ color: "#005249", background: "#C8FACD" }}
          >
            <Box
              className={classes.iconItem}
              style={{
                color: "#007B55",
                backgroundImage:
                  "linear-gradient( 135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)"
              }}
            >
              <BsFillInboxesFill />
            </Box>
            <Box>
              <Typography
                className={classes.numberStyle}
                style={{ color: "#005249" }}
              >
                {products.length}
              </Typography>
              <Typography className={classes.textItem}>Products</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            className={classes.boxItem}
            style={{ color: "#04297A", background: "#D0F2FF" }}
          >
            <Box
              className={classes.iconItem}
              style={{
                color: "#0C53B7",
                backgroundImage:
                  "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)"
              }}
            >
              <FaClipboardList />
            </Box>
            <Box>
              <Typography
                className={classes.numberStyle}
                style={{ color: "#04297A" }}
              >
                {categories.length}
              </Typography>
              <Typography className={classes.textItem}>Category</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            className={classes.boxItem}
            style={{ color: "#7A4F01", background: "#FFF7CD" }}
          >
            <Box
              className={classes.iconItem}
              style={{
                color: "#B78103",
                backgroundImage:
                  "linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)"
              }}
            >
              <TiShoppingCart />
            </Box>
            <Box>
              <Typography
                className={classes.numberStyle}
                style={{ color: "#7A4F01" }}
              >
                {orders.length}
              </Typography>
              <Typography className={classes.textItem}>Orders</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            className={classes.boxItem}
            style={{ color: "#7A0C2E", background: "#FFE7D9" }}
          >
            <Box
              className={classes.iconItem}
              style={{
                color: "#B72136",
                backgroundImage:
                  "linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)"
              }}
            >
              <BsFillPeopleFill />
            </Box>
            <Box>
              <Typography
                className={classes.numberStyle}
                style={{ color: "#7A0C2E" }}
              >
                {buyer.length}
              </Typography>
              <Typography className={classes.textItem}>Buyer</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
