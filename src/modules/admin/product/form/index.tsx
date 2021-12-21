import { useMemo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { RiArrowRightSLine } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from 'store/hook';
import Paper from 'components/paper';
import {
  addProduct,
  updateProduct,
  getProduct
} from 'store/Products/products.slide';
import { Product } from 'types/Product';
import { productSChema } from './product-form.schema';
import './styles.css';

interface ProductFormProps {
  mode: 'create' | 'edit';
}

const ProductForm = ({ mode }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { productDetail, loading } = useAppSelector((state) => state.products);
  const { token } = useAppSelector((state) => state.auth);
  const { id } = useParams<{ id: string }>();
  const [imagesT, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  useEffect(() => {
    if (mode === 'edit') {
      if (productDetail && productDetail._id !== id) {
        dispatch(getProduct(id));
      } else {
        setImagesPreview(productDetail.images);
      }
    }
  }, [id, dispatch, token, productDetail]);

  const ProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [
            ...old,
            { public_id: '', url: reader.result }
          ]);
          setImages([...imagesT, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

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
      name: productDetail.name,
      description: '',
      price: 0,
      ratings: 0,
      category: productDetail.category,
      stock: 0,
      numOfReviews: 0,
      createAt: ''
    };
  }, [productDetail, mode]);

  function handleSubmit(values: Product) {
    console.log('1');
    if (mode === 'edit') {
      const product: Product = { ...values, images: imagesPreview };
      const data = { product, token, id };
      dispatch(updateProduct(data));
      history.push('/admin/products');
    }
    if (mode === 'create') {
      console.log('111111111');
      const product: Product = { ...values, images: imagesT };
      console.log('producttttttttt', product);
      const data = { product, token };
      dispatch(addProduct(data));
      history.push('/admin/products');
    }
  }

  const handleDestroy = (item: string) => {
    setImages(imagesT.filter((image: any) => image !== item));
    setImagesPreview(imagesPreview.filter((image: any) => image !== item));
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: productSChema,
    onSubmit: handleSubmit
  });

  interface SelectCategory {
    parent: string;
    name: string;
  }

  return (
    <Paper loading={loading} heading="Product Information">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item lg={1} md={1}>
                <p>Product pictures</p>
              </Grid>
              <Grid item lg={11} md={11}>
                <div className="flex flex-col my-6">
                  <div
                    id="createProductFormImage"
                    className="flex mb-6 flex-wrap items-center"
                  >
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[0]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[0])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>

                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[1]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[1])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile1"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[2]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[2])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile2"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[3]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[3])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile3"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[4]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[4])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile4"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[5]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[5])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile5"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[6]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[6])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile6"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="wrapper_image mr-3 mb-3">
                      <img src={imagesPreview[7]?.url} alt="" />
                      <div className="remove_image">
                        <IconButton
                          onClick={() => handleDestroy(imagesPreview[7])}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div
                        id="createProductFormFile7"
                        className="drop-file-input"
                      >
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={ProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container item spacing={2}>
              <Grid item lg={1} md={1}>
                <p>Product Name</p>
              </Grid>
              <Grid item lg={11} md={11}>
                <TextField
                  id="name"
                  fullWidth
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
            </Grid>
            <Grid container item spacing={2}>
              <Grid item lg={1} md={1}>
                <p>Description</p>
              </Grid>
              <Grid item lg={11} md={11}>
                <TextField
                  id="description"
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
              <Grid item lg={1} md={1}>
                <p>Category</p>
              </Grid>
              <Grid item lg={11} md={11} className="flex items-center">
                <div className="flex category-product">
                  {formik.values.category?.map((category: any) => (
                    <span
                      key={Math.random()}
                      className="flex items-center justify-center category-product-item"
                    >
                      <RiArrowRightSLine className="iconArrows mx-1" />

                      {category}
                    </span>
                  ))}
                </div>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
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
