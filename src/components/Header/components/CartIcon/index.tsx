import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector } from 'store/hook';

export interface CartIconProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#333'
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: theme.shape.borderRadius,
    width: '50%'
  },
  input: {
    color: '#77798c',
    width: '100%',
    padding: '5px 10px',
    marginLeft: theme.spacing(1)
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  badge: {
    marginLeft: theme.spacing(5)
  },
  iconSearch: {
    margin: '0 16px'
  }
}));

export default function CartIcon(props: CartIconProps) {
  const classes = useStyles();
  const cart = useAppSelector((state) => state.cart);
  return (
    <Badge
      badgeContent={cart.cartItems.length}
      color="secondary"
      className={classes.badge}
    >
      <Link to="/cart" style={{ color: '#333' }}>
        <ShoppingCart />
      </Link>
    </Badge>
  );
}
