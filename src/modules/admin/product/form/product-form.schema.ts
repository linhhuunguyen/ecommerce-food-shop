import * as yup from 'yup';

export const productSChema = yup.object({
  name: yup.string().required('Name cannot be emppty'),
  description: yup.string().required('Description cannot be emppty'),
  price: yup.string().required('Price canot be emppty'),
  category: yup.string().required('Category canot be emppty'),
  stock: yup.string().required('Quantity canot be emppty'),
  images: yup.array().of(
    yup.object().shape({
      url: yup.string().required('Image canot be emppty') //
    })
  )
});
