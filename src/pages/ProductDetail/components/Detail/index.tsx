import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Container, Typography, Button } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "store/hook";
import { getProduct } from "store/Products/products.slide";
import { addToCart } from "store/Cart/cart.slice";
import ImageGrid from "./ImageGrid";
import styles from "./Styles.module.css";

export interface DetialProps {}

export default function Detail(props: DetialProps) {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function decrement() {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  }

  return (
    <Container maxWidth="lg" style={{ paddingTop: "100px" }}>
      <Grid container spacing={1}>
        <Grid item sm={1}>
          <ImageGrid
            images={productDetail.images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        </Grid>
        <Grid item sm={5}>
          <img src={productDetail.images[selectedImage]} alt="" width="100%" />
        </Grid>
        <Grid item sm={6}>
          <Box padding="20px 0 0 10px">
            <Box>
              <Typography className={styles.nameStyle}>
                {productDetail.name}
              </Typography>
              <Typography className={styles.priceStyle}>
                ${productDetail.price}
              </Typography>
              <Typography className={styles.des}>
                {productDetail.des}
              </Typography>
            </Box>
            <Box marginTop="60px">
              <Button onClick={decrement} className={styles.quantityBtn}>
                -
              </Button>
              <input value={quantity} className={styles.quantityInput} />
              <Button
                onClick={() => setQuantity(quantity + 1)}
                className={styles.quantityBtn}
              >
                +
              </Button>
            </Box>
            <Box marginTop="65px">
              <Button
                className={styles.addtocartBtn}
                onClick={() => handleAddToCart(productDetail)}
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
