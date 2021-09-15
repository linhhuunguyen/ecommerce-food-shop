import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface OrderSuccessProps {}

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
    },
    logoLg: {
      display: 'none',
      fontSize: '50px',
      fontWeight: 'bold',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  })
);

export default function OrderSuccess(props: OrderSuccessProps) {
  const classes = useStyles();
  return (
    <Box
      mt={12}
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
        THANK YOU FOR ORDERING AT!
      </Typography>

      <Typography variant="h6" className={classes.logoLg}>
        <span style={{ color: '#161f6a' }}>Pick</span>
        <span style={{ color: '#019376' }}>Bazar</span>
      </Typography>

      <Link to="/" className={classes.btnShopping}>
        Continue shopping
      </Link>
    </Box>
  );
}
