import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
import shortUUID from 'short-uuid';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { addToCart, removeFromCart, clearCart } from 'store/Cart/cart.slice';
import { addOrders } from 'store/Orders/orders.slice';
// import { Info } from 'types/Order';
import { CartItem } from 'types/Cart';
import CartItemCard from './itemCard';
import CartEmpty from './empty';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px'
    },
    boxInfo: {
      background: '#fff',
      padding: '5px 10px',
      margin: '10px 0'
    },
    textFiel: {
      margin: '10px 0'
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
    total: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    priceContent: {
      color: '#fe3834',
      fontSize: '25px',
      fontWeight: 400
    },
    totalItem: {
      background: '#fff',
      height: '10vh',
      padding: '20px',
      boxShadow: '#64646f33 0px 7px 29px 0px'
    },
    subTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    content: {
      fontSize: '13px',
      textAlign: 'center',
      fontWeight: 400
    }
  })
);

export default function Cart() {
  const [itemLists, setItemList] = useState<CartItem[]>([]);
  const data = localStorage.getItem('buyer');
  const buyer = JSON.parse(`${data}`);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const storage = localStorage.getItem('cartItems');

  useEffect(() => {
    if (storage) {
      setItemList(JSON.parse(storage));
    }
  }, [storage, itemLists]);

  const increaseQuantity = (item: CartItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      images: item.images,
      quantity: 1,
      stock: item.stock
    };

    dispatch(addToCart(cartItem));
  };

  const decreaseQuantity = (item: CartItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      images: item.images,
      quantity: -1,
      stock: item.stock
    };
    if (item.quantity <= 1) {
      return;
    }
    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    history.push('/cart/shipping');
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        {itemLists.length === 0 ? (
          <CartEmpty />
        ) : (
          <Grid container spacing={2} className={classes.root}>
            <Grid container item sm={9}>
              <Grid container item spacing={1} className={classes.cartTitle}>
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
                itemLists.map((cartItem: CartItem) => (
                  <Grid
                    container
                    key={cartItem.id}
                    item
                    spacing={1}
                    className={classes.cartItem}
                  >
                    <CartItemCard
                      deleteCartItems={() => handleRemoveFromCart(cartItem.id)}
                      item={cartItem}
                    />
                    <Grid item sm={3} className={classes.main}>
                      <Button
                        className={classes.quantityBtn}
                        onClick={() => decreaseQuantity(cartItem)}
                      >
                        -
                      </Button>
                      <Box className={classes.valueQuantity}>
                        {cartItem.quantity}
                      </Box>
                      {/* <input type="number" value={item.quantity} readOnly /> */}
                      <Button
                        className={classes.quantityBtn}
                        onClick={() => increaseQuantity(cartItem)}
                      >
                        +
                      </Button>
                    </Grid>
                    <Grid item sm={1} className={classes.total}>
                      <Typography style={{ fontSize: '18px', fontWeight: 500 }}>
                        {parseFloat(
                          (cartItem.price * cartItem.quantity).toFixed(2)
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid item sm={3}>
              <Box className={classes.totalItem}>
                <Box className={classes.subTotal}>
                  <Typography>Subtotal</Typography>
                  <Typography className={classes.priceContent}>
                    {parseFloat(
                      itemLists
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)
                    )}
                  </Typography>
                </Box>
                <Typography className={classes.content}>
                  Taxes and shipping calculated at checkout
                </Typography>
              </Box>
              <Button
                onClick={handleCheckout}
                className="btn-primary"
                type="submit"
              >
                Check Out
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
