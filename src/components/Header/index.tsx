import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { BuyerLogin, Account, Logo, CartIcon, SearchBar } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#333'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Logo link="/" />
          <SearchBar />
          <Box display="flex" alignItems="center">
            {!localStorage.getItem('buyerToken') ? (
              <Box display="flex" alignItems="center">
                <Account />
              </Box>
            ) : (
              <BuyerLogin />
            )}
            <CartIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
