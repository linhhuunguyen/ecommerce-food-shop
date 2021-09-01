import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import {
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid
} from "@material-ui/core";

import { getProducts } from "store/Products/products.slide";

export interface ProductsProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    contentStyle: {
      boxSizing: "border-box",
      padding: "20px"
    },
    titleStyle: {
      color: "#77798c",
      fontSize: "13px",
      fontWeight: 400
    },
    priceStyle: {
      color: "#0d1136",
      fontSize: "16px",
      fontWeight: 600
    },
    h1Style: {
      color: "#192a56",
      textAlign: "center",
      margin: "50px 0"
    }
  })
);

export default function Products(props: ProductsProps) {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useAppSelector((state) => state.products.productsList);

  return (
    <Container maxWidth="lg">
      <h1 className={classes.h1Style}>Featured Products</h1>
      <Grid container spacing={2}>
        {products.map((product: any) => (
          <Grid item xs={12} sm={2} spacing={2} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Box className={classes.root}>
                <Box>
                  <Box>
                    <img
                      src={product.images[0]}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Box>
                <Box className={classes.contentStyle}>
                  <Typography className={classes.priceStyle}>
                    ${product.price}
                  </Typography>
                  <Typography className={classes.titleStyle}>
                    {product.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
