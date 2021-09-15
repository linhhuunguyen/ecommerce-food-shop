import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import shortUUID from 'short-uuid';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { getProduct, updateProduct } from 'store/Products/products.slide';
import { getCategorys } from 'store/Categories/categories.slice';
import { Product } from 'types/Product';
import { ButtonWrap, ButtonCanelWrap } from 'components/FormsUI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#fff',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: '100%'
      }
    },
    boxItem: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

export default function EditProduct() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: any }>();

  const { productDetail } = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories.cateloryList);

  const [product, setProduct] = useState<Product>({
    id: shortUUID,
    name: '',
    des: '',
    price: 0,
    category: '',
    quantity: 0,
    images: [{ idI: uuidv4(), image: '' }]
  });

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getCategorys());
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail) {
      setProduct({ ...productDetail });
    }
  }, [productDetail]);

  const { name, des, price, category, quantity, images } = product;

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, price: Number(e.target.value) });
  };
  const handleCategory = (e: any) => {
    setProduct({ ...product, category: e.target.value });
  };
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, quantity: Number(e.target.value) });
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, des: e.target.value });
  };

  const handleImageChange = (idI: string, e: any) => {
    const newProductList = { ...product };
    newProductList.images.map((image: any) => {
      if (idI === image.idI) {
        image.image = e.target.value;
      }
      return image;
    });
    setProduct(newProductList);
  };

  const handleAddImage = () => {
    setProduct({
      ...product,
      images: [...images, { idI: uuidv4(), image: '' }]
    });
  };

  const handleRemoveImage = (record: string) => {
    setProduct({
      ...product,
      images: images.filter((sidI: any) => sidI.idI !== record)
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, product }));
    history.push('/admin/products');
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <Box padding="20px">
        <Typography style={{ color: '#161f6a', fontWeight: 700 }}>
          UPDATE PRODUCT
        </Typography>
      </Box>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          name="name"
          type="text"
          variant="outlined"
          required
          onChange={handleName}
        />
        <Box className={classes.boxItem}>
          <TextField
            id="standard-basic"
            label="Price"
            value={price}
            name="price"
            type="number"
            variant="outlined"
            required
            onChange={handlePrice}
          />

          <TextField
            id="standard-basic"
            label="Quantity"
            value={quantity}
            name="quantity"
            type="number"
            variant="outlined"
            onChange={handleQuantity}
            required
            style={{ margin: '0px 10px' }}
          />
        </Box>
        <Box>
          <Select
            onChange={handleCategory}
            value={category}
            name="category"
            required
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            {categories.map((cate: any) => (
              <MenuItem value={cate.sku} key={cate.id}>
                {cate.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {images?.map((imagesItem: any, index: number) => (
          <Box key={imagesItem.idI} className={classes.boxItem}>
            <TextField
              id="standard-basic"
              label="Image"
              value={imagesItem.image}
              fullWidth
              name="image"
              type="text"
              required
              variant="outlined"
              onChange={(e) => handleImageChange(imagesItem.idI, e)}
            />

            <Box>
              {index === 0 ? (
                <IconButton onClick={handleAddImage}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRemoveImage(imagesItem.idI)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}

        <TextField
          id="standard-basic"
          label="Description"
          value={des}
          name="des"
          type="text"
          rowsMax={20}
          rows={5}
          multiline
          fullWidth
          required
          variant="outlined"
          onChange={handleDescription}
        />
        <Box>
          <ButtonCanelWrap
            name="Cancel"
            width="130px"
            handle={() => history.push('/admin/products')}
          />
          <ButtonWrap name="Save" width="130px" />
        </Box>
      </form>
    </Container>
  );
}
