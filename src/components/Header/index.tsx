import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

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
    <AppBar position="fixed" className={classes.root} color="default">
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
