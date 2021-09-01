import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "100px"
    },
    products: {
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
      textAlign: "start",
      margin: "50px 0",
      fontWeight: 300
    }
  })
);

export interface SearchProps {}

export default function Search(props: SearchProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const q: any = searchParams.get("q");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useAppSelector((state) => state.products.productsList);

  const filterProducts = products.filter((value) => value.name.includes(q));

  console.log(typeof filterProducts);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <h1 className={classes.h1Style}>Search results for`{q}`</h1>
      <Grid container spacing={2}>
        {filterProducts.map((product: any) => (
          <Grid item xs={12} sm={2} spacing={2} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Box className={classes.products}>
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
