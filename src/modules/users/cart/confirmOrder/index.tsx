import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Grid, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from 'store/hook';
import { CartItem } from 'types/Cart';
import { addOrders } from 'store/Orders/orders.slice';
import { Order } from 'types/Order';
import CheckoutSteps from '../checkoutSteps';

const ConfirmOrder = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [itemLists, setItemList] = useState<CartItem[]>([]);
  const storage = localStorage.getItem('cartItems');
  useEffect(() => {
    if (storage) {
      setItemList(JSON.parse(storage));
    }
  }, [storage, itemLists]);

  const buyer = JSON.parse(`${localStorage.getItem('buyer')}`);
  const shippingInfo = JSON.parse(`${localStorage.getItem('shippingInfo')}`);

  const subtotal = itemLists.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 100 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPriceC = subtotal + tax + shippingCharges;

  const order: Order = {
    shippingInfo,
    orderItem: itemLists,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPriceC,
    orderStatus: 'pending'
  };

  const handleClickOrder = () => {
    dispatch(addOrders(order));
    history.push('/order-success');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <CheckoutSteps activeStep={1} />
      <Grid container spacing={2}>
        <Grid container item lg={9} md={9}>
          {itemLists &&
            itemLists.map((cartItem: CartItem) => (
              <Grid
                container
                item
                key={cartItem.id}
                className="bg-white flex items-center"
              >
                <Grid item sm={2}>
                  <img src={cartItem.images} alt={cartItem.name} width="100%" />
                </Grid>
                <Grid item sm={5}>
                  <Typography>{cartItem.name}</Typography>
                </Grid>
                <Grid item sm={1}>
                  x {cartItem.quantity}
                </Grid>
                <Grid item sm={1}>
                  {cartItem.price * cartItem.quantity}
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid container item lg={3} md={3}>
          <Grid container item lg={12} md={12} className="bg-white mb-3">
            <Box p={2} className="w-full">
              <Typography>Shipping Info</Typography>
              <Box>
                <Typography>{buyer.fullname}</Typography>
                <Box className="flex justify-between">
                  <Typography>Address</Typography>
                  <Typography>{buyer.address}</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Phone:</Typography>
                  <Typography>{buyer.contact}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid container item lg={12} md={12} className="bg-white">
            <Typography className="p-2">Order Summery</Typography>
            <Box p={2} className="w-full">
              <Box className="flex justify-between">
                <Typography>Subtotal:</Typography>
                <Typography>{subtotal}</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Shipping Charges:</Typography>
                <Typography>{shippingCharges}</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography>Tax:</Typography>
                <Typography>{tax}</Typography>
              </Box>
            </Box>
            <Box p={2} className="w-full flex justify-between">
              <Typography>Total:</Typography>
              <Typography>{totalPriceC}</Typography>
            </Box>
          </Grid>
          <Button onClick={handleClickOrder} className="btn-primary">
            ORDER NOW
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmOrder;
