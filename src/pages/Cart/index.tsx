import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  Button,
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid
} from "@material-ui/core";

import { addToCart, removeFromCart, clearCart } from "store/Cart/cart.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "100px"
    },
    cartItem: {
      background: "#fff",
      marginBottom: "15px",
      boxShadow: "#64646f33 0px 7px 29px 0px"
    },
    nameProduct: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    priceProduct: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 500
    },
    quantityProduct: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    quantityBtn: {
      background: "#019376",
      minWidth: "38px",
      height: "30px",
      color: "#fff",
      borderRadius: 0,
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: "#019376"
      }
    },
    valueQuantity: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "38px"
    },
    totalItem: {
      background: "#fff",
      height: "10vh",
      padding: "20px",
      boxShadow: "#64646f33 0px 7px 29px 0px"
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    content: {
      fontSize: "13px",
      textAlign: "center",
      fontWeight: 400
    },
    btnCheckout: {
      color: "#fff",
      background: "#007bff",
      borderColor: "#007bff",
      width: "100%",
      marginTop: "15px"
    }
  })
);

export interface CartProps {}

export default function Cart(props: CartProps) {
  const [itemLists, setItemList] = useState([]);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  console.log(cart);

  const storage = localStorage.getItem("cartItems");

  useEffect(() => {
    if (storage) {
      setItemList(JSON.parse(storage));
    }
  }, [storage]);

  const handleAddToCart = (product: any) => {
    //  dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product: any) => {
    //  dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart([]));
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <h2>Shopping Cart</h2>
        {itemLists.length === 0 ? (
          <Box className="cart-empty">
            <Typography>Your cart is currently empty</Typography>
            <Box className="start-shopping">
              <Link to="/">
                <Typography>Start Shopping</Typography>
              </Link>
            </Box>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item sm={8}>
              {itemLists &&
                itemLists.map((cartItem: any) => (
                  <Grid
                    container
                    key={cartItem.id}
                    spacing={1}
                    className={classes.cartItem}
                  >
                    <Grid item sm={2}>
                      <img
                        src={cartItem.images[0]}
                        alt={cartItem.name}
                        width="100%"
                      />
                    </Grid>
                    <Grid item sm={6} className={classes.nameProduct}>
                      <Typography>{cartItem.name}</Typography>
                      <Button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </Button>
                    </Grid>
                    <Grid item sm={1} className={classes.priceProduct}>
                      ${cartItem.price}
                    </Grid>
                    <Grid item sm={3} className={classes.quantityProduct}>
                      <Button
                        className={classes.quantityBtn}
                        onClick={() => handleDecreaseCart(cartItem)}
                      >
                        -
                      </Button>
                      <Box className={classes.valueQuantity}>
                        {cartItem.cartQuantity}
                      </Box>
                      <Button
                        className={classes.quantityBtn}
                        onClick={() => handleAddToCart(cartItem)}
                      >
                        +
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              <Button onClick={() => handleClearCart()}>Clear Cart</Button>
            </Grid>
            <Grid item sm={4}>
              <Box>
                <Box className={classes.totalItem}>
                  <Box className={classes.total}>
                    <Typography>Subtotal</Typography>
                    <Typography>${cart.cartTotalAmount}</Typography>
                  </Box>
                  <Typography className={classes.content}>
                    Taxes and shipping calculated at checkout
                  </Typography>
                </Box>
                <Button className={classes.btnCheckout}>Check out</Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
