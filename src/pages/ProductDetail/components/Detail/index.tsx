import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { getProduct } from 'store/Products/products.slide';
import { addToCart } from 'store/Cart/cart.slice';
import ImageGrid from './ImageGrid';
import styles from './Styles.module.css';

export default function Detail() {
  const { id } = useParams<{ id: any }>();
  const detail = useAppSelector((state) => state.products.productDetail);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: '100px' }}>
      <Grid container spacing={1}>
        <Grid item sm={1}>
          <ImageGrid
            images={detail.images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        </Grid>
        <Grid item sm={5}>
          <img src={detail.images[selectedImage].image} alt="" width="100%" />
        </Grid>
        <Grid item sm={6}>
          <Box padding="20px 0 0 10px">
            <Box>
              <Typography className={styles.nameStyle}>
                {detail.name}
              </Typography>
              <Typography className={styles.priceStyle}>
                ${detail.price}
              </Typography>
              <Typography className={styles.des}>{detail.des}</Typography>
            </Box>
            <Box marginTop="65px">
              <Button
                className={styles.addtocartBtn}
                onClick={() => handleAddToCart(detail)}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
