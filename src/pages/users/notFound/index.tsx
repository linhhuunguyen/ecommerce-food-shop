import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import NotFoundImg from 'assets/not-found.jpg';

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

export default function NotFound() {
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
        WE ARE SORRY, PAGE NOT FOUND!
      </Typography>
      <img src={NotFoundImg} style={{ width: '50%' }} alt="" />
      <Link to="/" className={classes.btnShopping}>
        Continue shopping
      </Link>
    </Box>
  );
}
