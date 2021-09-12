import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  TextField
} from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "store/hook";

import {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  getTotals
} from "store/Cart/cart.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "30px"
    },
    cartTitle: {
      background: "#fff",
      padding: "10px",
      marginBottom: "20px"
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
      alignItems: "center"
    },
    priceContent: {
      color: "#fe3834",
      fontSize: "25px",
      fontWeight: 400
    },
    main: {
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
      justifyContent: "center",
      alignItems: "center"
    },
    subTotal: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px"
    },
    content: {
      fontSize: "13px",
      textAlign: "center",
      fontWeight: 400
    },
    btnCheckout: {
      color: "#fff",
      background: "#019376",
      borderColor: "#019376",
      width: "100%",
      marginTop: "15px",
      "&:hover": {
        backgroundColor: "#019376",
        color: "#fff",
        border: "none"
      }
    }
  })
);

export default function CartProducts() {
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

  useEffect(() => {
    dispatch(getTotals(cart));
  }, [cart, dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart([]));
  };
  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <Grid container spacing={1} className={classes.cartTitle}>
            <Grid item sm={7}>
              <Typography className="product-title">
                Product({itemLists.length})
              </Typography>
            </Grid>
            <Grid item sm={1} className={classes.main}>
              <Typography className="price">Price</Typography>
            </Grid>
            <Grid item sm={3} className={classes.main}>
              <Typography className="quantity">Quantity</Typography>
            </Grid>
            <Grid item sm={1} className={classes.main}>
              <Typography className="total">Total</Typography>
            </Grid>
          </Grid>
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
                    src={cartItem.images[0].image}
                    alt={cartItem.name}
                    width="100%"
                  />
                </Grid>
                <Grid item sm={5} className={classes.nameProduct}>
                  <Typography>{cartItem.name}</Typography>
                  <Button onClick={() => handleRemoveFromCart(cartItem)}>
                    Remove
                  </Button>
                </Grid>
                <Grid item sm={1} className={classes.priceProduct}>
                  ${cartItem.price}
                </Grid>
                <Grid item sm={3} className={classes.main}>
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
                <Grid item sm={1} className={classes.total}>
                  <Typography style={{ fontSize: "18px", fontWeight: 500 }}>
                    $
                    {parseFloat(
                      (cartItem.price * cartItem.cartQuantity).toFixed(2)
                    )}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          <Grid item>
            <Grid container>
              <Grid item sm={9}>
                <Button onClick={() => handleClearCart()}>Clear Cart</Button>
              </Grid>
              <Grid item sm={3}>
                <Box className={classes.totalItem}>
                  <Box className={classes.subTotal}>
                    <Typography>Subtotal</Typography>
                    <Typography className={classes.priceContent}>
                      ${cart.cartTotalAmount}
                    </Typography>
                  </Box>
                  <Typography className={classes.content}>
                    Taxes and shipping calculated at checkout
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
