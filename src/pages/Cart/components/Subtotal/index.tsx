import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export interface SubtotalProps {
  cartTotalAmount: number;
}

export default function Subtotal({ cartTotalAmount }: SubtotalProps) {
  const classes = useStyles();
  return (
    <Box className={classes.totalItem}>
      <Box className={classes.subTotal}>
        <Typography>Subtotal</Typography>
        <Typography className={classes.priceContent}>
          ${cartTotalAmount}
        </Typography>
      </Box>
      <Typography className={classes.content}>
        Taxes and shipping calculated at checkout
      </Typography>
    </Box>
  );
}
