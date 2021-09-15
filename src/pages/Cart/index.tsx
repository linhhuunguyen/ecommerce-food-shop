import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
import shortUUID from 'short-uuid';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { clearCart, getTotals } from 'store/Cart/cart.slice';
import { addOrders } from 'store/Orders/orders.slice';
import { Info } from 'types/Order';
import { CartEmpty, CartProducts, Subtotal } from './components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px'
    },
    btnCheckout: {
      color: '#fff',
      background: '#019376',
      borderColor: '#019376',
      width: '100%',
      marginTop: '15px',
      '&:hover': {
        backgroundColor: '#019376',
        color: '#fff',
        border: 'none'
      }
    },
    boxInfo: {
      background: '#fff',
      padding: '5px 10px',
      margin: '10px 0'
    },
    textFiel: {
      margin: '10px 0'
    }
  })
);

export default function Cart() {
  const data = localStorage.getItem('buyer');

  const buyer = JSON.parse(`${data}`);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [itemLists, setItemList] = useState([]);

  const [infomation, setInfomation] = useState<Info>({
    name: buyer?.fullname || '',
    phone: buyer?.contact || '',
    email: buyer?.email || '',
    address: buyer?.address || ''
  });

  const { name, phone, email, address } = infomation;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setInfomation({ ...infomation, [e.target.name]: value });
  };

  const storage = localStorage.getItem('cartItems');

  useEffect(() => {
    if (storage) {
      setItemList(JSON.parse(storage));
    }
  }, [storage]);

  useEffect(() => {
    dispatch(getTotals(cart));
  }, [cart, dispatch]);

  const handleOrder = (e: any) => {
    e.preventDefault();
    const newData = {
      id: shortUUID,
      info: infomation,
      orderItem: cart
    };
    dispatch(addOrders(newData));
    dispatch(clearCart([]));
    history.push('/order-success');
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        {itemLists.length === 0 ? (
          <CartEmpty />
        ) : (
          <Grid container spacing={2} className={classes.root}>
            <Grid item sm={9}>
              <CartProducts itemLists={itemLists} />
            </Grid>
            <Grid item sm={3}>
              <Subtotal cartTotalAmount={cart.cartTotalAmount} />
              <Box className={classes.boxInfo}>
                <form autoComplete="off" onSubmit={handleOrder}>
                  <TextField
                    className={classes.textFiel}
                    id="standard-basic"
                    label="Name"
                    value={name}
                    name="name"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textFiel}
                    id="standard-basic"
                    label="Phone"
                    value={phone}
                    name="phone"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textFiel}
                    id="standard-basic"
                    label="Email"
                    value={email}
                    name="email"
                    type="email"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textFiel}
                    id="standard-basic"
                    label="Address"
                    value={address}
                    name="address"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleInputChange}
                  />
                  <Button className={classes.btnCheckout} type="submit">
                    Order Now
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
