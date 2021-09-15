import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useAppDispatch } from 'store/hook';
import {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart
} from 'store/Cart/cart.slice';
import { Popup } from 'components';

export interface CartProductsProps {
  itemLists: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px'
    },
    cartTitle: {
      background: '#fff',
      padding: '10px',
      marginBottom: '20px'
    },
    cartItem: {
      background: '#fff',
      marginBottom: '15px',
      boxShadow: '#64646f33 0px 7px 29px 0px'
    },
    nameProduct: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    priceProduct: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    priceContent: {
      color: '#fe3834',
      fontSize: '25px',
      fontWeight: 400
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    quantityBtn: {
      background: '#019376',
      minWidth: '38px',
      height: '30px',
      color: '#fff',
      borderRadius: 0,
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#019376'
      }
    },
    valueQuantity: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '38px'
    },
    totalItem: {
      background: '#fff',
      height: '10vh',
      padding: '20px',
      boxShadow: '#64646f33 0px 7px 29px 0px'
    },
    total: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      fontSize: '13px',
      textAlign: 'center',
      fontWeight: 400
    }
  })
);

export default function CartProducts({ itemLists }: CartProductsProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
              <Popup
                name="Remove"
                title="Are you sure to delete this product? "
                btnConfirm="Confirm"
                btnCanel="Canel"
                handleConfirm={() => handleRemoveFromCart(cartItem)}
              />
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
              <Typography style={{ fontSize: '18px', fontWeight: 500 }}>
                $
                {parseFloat(
                  (cartItem.price * cartItem.cartQuantity).toFixed(2)
                )}
              </Typography>
            </Grid>
          </Grid>
        ))}
      <Popup
        name="Clear Cart"
        title="Are you sure to delete all products in cart? "
        btnConfirm="Confirm"
        btnCanel="Canel"
        handleConfirm={() => handleClearCart()}
      />
    </>
  );
}
