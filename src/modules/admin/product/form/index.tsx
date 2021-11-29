import { useMemo, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import shortUUID from 'short-uuid';
import { v4 as uuidv4 } from 'uuid';
import { useFormik, FieldArray, FormikProvider, getIn } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { MdCloudUpload } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'store/hook';
import Paper from 'components/paper';
import {
  addProduct,
  updateProduct,
  getProduct
} from 'store/Products/products.slide';
import { getCategories } from 'store/Categories/categories.slice';
import { Category } from 'types/Category';
import { Product } from 'types/Product';
import { productSChema } from './product-form.schema';

interface ProductFormProps {
  mode: 'create' | 'edit';
}

const ProductForm = ({ mode }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { productDetail, loading } = useAppSelector((state) => state.products);
  const { cateloryList } = useAppSelector((state) => state.categories);
  const { token } = useAppSelector((state) => state.auth);

  const { id } = useParams<{ id: string }>();
  const initialValues = useMemo(() => {
    if (mode === 'edit') {
      return {
        _id: productDetail._id,
        name: productDetail.name,
        description: productDetail.description,
        price: productDetail.price,
        ratings: productDetail.ratings,
        images: productDetail.images,
        category: productDetail.category,
        stock: productDetail.stock,
        numOfReviews: productDetail.numOfReviews,
        reviews: productDetail.reviews,
        createAt: productDetail.createAt
      };
    }

    return {
      name: '',
      description: '',
      price: 0,
      ratings: 0,
      images: [
        { public_id: uuidv4(), url: '' },
        { public_id: uuidv4(), url: '' }
      ],
      category: '',
      stock: 0,
      numOfReviews: 0,
      createAt: ''
    };
  }, [productDetail, mode]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
    dispatch(getCategories());
  }, [id, dispatch, token]);

  function handleSubmit(values: Product) {
    if (mode === 'edit') {
      const product = { ...values };
      dispatch(updateProduct({ id, product }));
      history.push('/admin/products');
    }
    if (mode === 'create') {
      const data = { values, token };
      dispatch(addProduct(data));
      console.log('dataaaaaaaaaaaaaaaaaaaaaaaaa', data);
      // history.push('/admin/products');
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: productSChema,
    onSubmit: handleSubmit
  });

  return (
    <Paper loading={loading} heading="Product Information">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item lg={6} md={6}>
                <TextField
                  id="name"
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.touched.name && !!formik.errors.name}
                  helperText={
                    formik.touched.name &&
                    formik.errors.name &&
                    formik.errors.name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  id="price"
                  type="number"
                  variant="outlined"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={!!formik.touched.price && !!formik.errors.price}
                  helperText={
                    formik.touched.price &&
                    formik.errors.price &&
                    formik.errors.price
                  }
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item lg={6} md={6}>
                <TextField
                  id="stock"
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  variant="outlined"
                  required
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  error={!!formik.touched.stock && !!formik.errors.stock}
                  helperText={
                    formik.touched.stock &&
                    formik.errors.stock &&
                    formik.errors.stock
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <Select
                  id="category"
                  name="category"
                  variant="outlined"
                  displayEmpty
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="" disabled>
                    Category
                  </MenuItem>
                  {cateloryList.categories.map((category: Category) => (
                    <MenuItem value={category.name} key={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <FieldArray
              name="images"
              render={(arrayHelpers) => (
                <>
                  {formik.values.images.map((image, index) => (
                    <div
                      className="flex justify-center flex-wrap items-center"
                      key={image.public_id}
                    >
                      {/* <TextField
                        id="image"
                        label="Image"
                        fullWidth
                        value={formik.values.images[index].url}
                        name={`images[${index}].url`}
                        type="text"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={Boolean(
                          getIn(formik.touched, `images[${index}].url`) &&
                            getIn(formik.errors, `images[${index}].url`)
                        )}
                        helperText={
                          getIn(formik.touched, `images[${index}].url`) &&
                          getIn(formik.errors, `images[${index}].url`)
                            ? getIn(formik.errors, `images[${index}].url`)
                            : ''
                        }
                      /> */}
                      <div className="wrapper">
                        <div className="image">
                          <img src="" alt="" />
                        </div>
                        <div className="content">
                          <div className="icon">
                            <MdCloudUpload />
                          </div>
                          <input
                            id="file"
                            type="file"
                            multiple
                            value={formik.values.images[index].url}
                            name={`images[${index}].url`}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="cancel-btn">
                          <FaTimes />
                        </div>
                      </div>
                      {/* <div className="btn-add flex justify-center items-center">
                        <div>
                          {index === 0 ? (
                            <Button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  public_id: uuidv4(),
                                  url: ''
                                })
                              }
                            >
                              +
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </div> */}
                    </div>
                  ))}
                </>
              )}
            />
            <Grid container item spacing={2}>
              <Grid item lg={12} md={12}>
                <TextField
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  multiline
                  rows={10}
                  fullWidth
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    !!formik.touched.description && !!formik.errors.description
                  }
                  helperText={
                    formik.touched.description &&
                    formik.errors.description &&
                    formik.errors.description
                  }
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Box>
                <Button onClick={() => history.push('/admin/products')}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </Paper>
  );
};

export default ProductForm;
