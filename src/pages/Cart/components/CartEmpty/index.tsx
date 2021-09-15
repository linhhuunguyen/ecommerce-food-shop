import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import EmptyCart from 'assets/empty-cart.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnShopping: {
      padding: '15px',
      color: '#fff',
      background: '#019376',
      borderColor: '#019376',
      marginTop: '30px',
      borderRadius: '15px',
      '&:hover': {
        backgroundColor: '#019376',
        color: '#fff',
        border: 'none'
      }
    }
  })
);

export default function CartEmpty() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography
        style={{
          fontSize: '20px',
          fontWeight: 500,
          marginBottom: '30px'
        }}
      >
        Your cart is currently empty
      </Typography>
      <img src={EmptyCart} style={{ width: '30%' }} alt="" />
      <Link to="/" className={classes.btnShopping}>
        Continue shopping
      </Link>
    </Box>
  );
}
