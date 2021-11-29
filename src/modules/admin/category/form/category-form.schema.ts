import * as yup from 'yup';

export const categorySchema = yup.object({
  name: yup
    .string()
    .max(20, 'Must be 20 characters or less')
    .required('Name cannot be empty'),
  description: yup
    .string()
    .max(10, 'Must be 10 characters or less')
    .required('SKU canot be empty'),
  status: yup.boolean().required('Status cannot be empty')
});
