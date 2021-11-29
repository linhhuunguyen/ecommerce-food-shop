import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { useFormik } from 'formik';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid
} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { saveShippingInfo } from 'store/Cart/cart.slice';
import { ShippingInfo } from 'types/Cart';
import CheckoutSteps from '../checkoutSteps';
import { shippingSchema } from './shipping-form.schema';

const ShippingSubmit = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { shippingInfo } = useAppSelector((state) => state.cart);

  const data = localStorage.getItem('buyer');
  const buyer = JSON.parse(`${data}`);

  const [telephone, setPhone] = useState(buyer?.contact);

  const initialValues = {
    id: buyer?.id || shippingInfo.id,
    name: buyer?.fullname || shippingInfo.name,
    address: buyer?.address || shippingInfo.address,
    city: shippingInfo?.city,
    country: shippingInfo?.country,
    phone: telephone || shippingInfo.phone
  };

  const handleShippingSubmit = (values: ShippingInfo) => {
    dispatch(saveShippingInfo({ ...values, phone: telephone }));
    history.push('/order/confirm');
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: shippingSchema,
    onSubmit: handleShippingSubmit
  });

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <CheckoutSteps activeStep={0} />
      <Typography>Shipping</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid container item lg={6} md={6}>
            <TextField
              id="standard-basic"
              label="name"
              value={formik.values.name}
              name="name"
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              error={!!formik.touched.name && !!formik.errors.name}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item lg={6} md={6}>
              <TextField
                id="standard-basic"
                label="address"
                value={formik.values.address}
                name="address"
                type="text"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                error={!!formik.touched.address && !!formik.errors.address}
                helperText={
                  formik.touched.address &&
                  formik.errors.address &&
                  formik.errors.address
                }
              />
            </Grid>
            <Grid item lg={6} md={6}>
              <TextField
                id="standard-basic"
                label="city"
                value={formik.values.city}
                name="city"
                type="text"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                error={!!formik.touched.city && !!formik.errors.city}
                helperText={
                  formik.touched.city &&
                  formik.errors.city &&
                  formik.errors.city
                }
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item lg={6} md={6}>
              <TextField
                id="standard-basic"
                label="country"
                value={formik.values.country}
                name="country"
                type="text"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                error={!!formik.touched.country && !!formik.errors.country}
                helperText={
                  formik.touched.country &&
                  formik.errors.country &&
                  formik.errors.country
                }
              />
            </Grid>
            <Grid item lg={6} md={6}>
              <PhoneInput
                country={'us'}
                value={telephone}
                onChange={setPhone}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button type="submit">Continue</Button>
      </form>
    </Container>
  );
};

export default ShippingSubmit;
