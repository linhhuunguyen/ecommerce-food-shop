import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid
} from '@material-ui/core';

import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import { useAppSelector, useAppDispatch } from 'store/hook';
import { getOrder } from 'store/Orders/orders.slice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px',
      justifyContent: 'flex-end'
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
    priceProduct: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    priceContent: {
      color: '#fe3834',
      fontSize: '25px',
      fontWeight: 400,
      marginLeft: '20px'
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    valueQuantity: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '38px'
    },
    totalItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      padding: '20px',
      boxShadow: '#64646f33 0px 7px 29px 0px'
    },
    total: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    boxInfo: {
      background: '#fff',
      padding: '15px',
      boxShadow: '#64646f33 0px 7px 29px 0px'
    }
  })
);

export default function OrderDetail() {
  const classes = useStyles();
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  // const orderDetail = useAppSelector((state) => state.order.singleOrder);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch]);

  return (
    // <Container
    //   maxWidth="lg"
    //   style={{ marginTop: '100px', marginBottom: '20px' }}
    // >
    //   <Box className={classes.boxInfo}>
    //     <Box my={2}>
    //       <Box display="flex" alignItems="center" mb={1.5}>
    //         <BubbleChartOutlinedIcon style={{ color: '#019376' }} />
    //         <Typography style={{ fontWeight: 500, marginLeft: '10px' }}>
    //           Order ID
    //         </Typography>
    //       </Box>
    //       <Typography style={{ color: '#666', marginLeft: '35px' }}>
    //         #{orderDetail.id.toUpperCase()}
    //       </Typography>
    //     </Box>
    //     <Box my={2}>
    //       <Box display="flex" alignItems="center" mb={1.5}>
    //         <PersonOutlineOutlinedIcon style={{ color: '#019376' }} />
    //         <Typography style={{ fontWeight: 500, marginLeft: '10px' }}>
    //           Customer information
    //         </Typography>
    //       </Box>
    //       <Typography style={{ color: '#666', marginLeft: '35px' }}>
    //         Name: {orderDetail.info.name}
    //       </Typography>
    //       <Typography style={{ color: '#666', marginLeft: '35px' }}>
    //         Phone: {orderDetail.info.phone}
    //       </Typography>
    //       <Typography style={{ color: '#666', marginLeft: '35px' }}>
    //         Email: {orderDetail.info.email}
    //       </Typography>
    //     </Box>
    //     <Box my={2}>
    //       <Box display="flex" alignItems="center" mb={1.5}>
    //         <PinDropOutlinedIcon style={{ color: '#019376' }} />
    //         <Typography style={{ fontWeight: 500, marginLeft: '10px' }}>
    //           Delivery address
    //         </Typography>
    //       </Box>
    //       <Typography style={{ color: '#666', marginLeft: '35px' }}>
    //         Address: {orderDetail.info.address}
    //       </Typography>
    //     </Box>
    //   </Box>
    //   <Grid container spacing={2} className={classes.root}>
    //     <Grid item>
    //       <Grid container spacing={1} className={classes.cartTitle}>
    //         <Grid item sm={7}>
    //           <Typography className="product-title">Product</Typography>
    //         </Grid>
    //         <Grid item sm={1} className={classes.main}>
    //           <Typography className="price">Price</Typography>
    //         </Grid>
    //         <Grid item sm={3} className={classes.main}>
    //           <Typography className="quantity">Quantity</Typography>
    //         </Grid>
    //         <Grid item sm={1} className={classes.main}>
    //           <Typography className="total">Total</Typography>
    //         </Grid>
    //       </Grid>
    //       {orderDetail.orderItem.cartItems?.map((cartItem: any) => (
    //         <Grid
    //           container
    //           key={cartItem.id}
    //           spacing={1}
    //           className={classes.cartItem}
    //         >
    //           <Grid item container sm={7} alignItems="center">
    //             <Grid item sm={3}>
    //               <img src={cartItem.images[0].image} alt="" width="100%" />
    //             </Grid>
    //             <Grid item sm={9}>
    //               <Box>{cartItem.name}</Box>
    //             </Grid>
    //           </Grid>

    //           <Grid item sm={1} className={classes.priceProduct}>
    //             ${cartItem.price}
    //           </Grid>
    //           <Grid item sm={3} className={classes.main}>
    //             <Box className={classes.valueQuantity}>
    //               {cartItem.cartQuantity}
    //             </Box>
    //           </Grid>
    //           <Grid item sm={1} className={classes.total}>
    //             <Typography style={{ fontSize: '18px', fontWeight: 500 }}>
    //               $
    //               {parseFloat(
    //                 (cartItem.price * cartItem.cartQuantity).toFixed(2)
    //               )}
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       ))}
    //     </Grid>
    //     <Box className={classes.totalItem}>
    //       <Typography>Revenue:</Typography>
    //       <Typography className={classes.priceContent}>
    //         ${orderDetail.orderItem?.cartTotalAmount}
    //       </Typography>
    //     </Box>
    //   </Grid>
    // </Container>
    <div>hello</div>
  );
}
