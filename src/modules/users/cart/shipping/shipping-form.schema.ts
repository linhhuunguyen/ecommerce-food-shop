import * as yup from 'yup';

export const shippingSchema = yup.object({
  name: yup
    .string()
    .max(120, 'Must be 120 characters or less')
    .required('Name cannot be empty'),
  address: yup
    .string()
    .max(220, 'Must be 220 characters or less')
    .required('Address cannot be empty'),

  city: yup
    .string()
    .max(100, 'Must be 10 characters or less')
    .required('City cannot be empty'),
  country: yup
    .string()
    .max(100, 'Country cannot be empty')
    .required('Country cannot be empty')
});
