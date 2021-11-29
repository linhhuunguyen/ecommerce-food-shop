import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'store/hook';

import { getProduct } from 'store/Products/products.slide';
import { addToCart } from 'store/Cart/cart.slice';
import ImageGrid from './imageGrid';
import styles from './styles.module.css';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantityOrder, setQuantityOrder] = useState(1);

  const { productDetail } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const increaseQuantity = () => {
    if (productDetail.stock <= quantityOrder) return;

    const qty = quantityOrder + 1;
    setQuantityOrder(qty);
  };

  const decreaseQuantity = () => {
    if (quantityOrder <= 1) return;

    const qty = quantityOrder - 1;
    setQuantityOrder(qty);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: productDetail._id,
      name: productDetail.name,
      price: productDetail.price,
      images: productDetail.images[0].url,
      quantity: quantityOrder,
      stock: productDetail.stock
    };
    dispatch(addToCart(cartItem));
  };
  return (
    <Container maxWidth="lg" style={{ paddingTop: '100px' }}>
      <Grid container spacing={1}>
        <Grid item sm={1}>
          <ImageGrid
            images={productDetail.images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        </Grid>
        <Grid item sm={5}>
          <img
            src={productDetail.images[selectedImage].url}
            alt=""
            width="100%"
          />
        </Grid>
        <Grid item sm={6}>
          <Box padding="20px 0 0 10px">
            <Box>
              <Typography className={styles.nameStyle}>
                {productDetail.name}
              </Typography>
              <Typography className={styles.priceStyle}>
                {productDetail.price}
              </Typography>
              <Typography className={styles.des}>
                {productDetail.description}
              </Typography>
            </Box>
            <Box>
              <Button onClick={decreaseQuantity}>-</Button>
              <input readOnly type="number" value={quantityOrder} />
              <Button onClick={increaseQuantity}>+</Button>
            </Box>
            <Box marginTop="65px">
              <Button className={styles.addtocartBtn} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
