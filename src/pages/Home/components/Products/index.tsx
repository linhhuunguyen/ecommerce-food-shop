import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useAppDispatch, useAppSelector } from "store/hook";
import { getProducts } from "store/Products/products.slide";

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
    },
    btnLoadMore: {
      color: "#fff",
      background: "#019376",
      borderColor: "#019376",
      marginTop: "15px",
      fontSize: "13px",
      "&:hover": {
        backgroundColor: "#019376",
        color: "#fff",
        border: "none"
      }
    }
  })
);

export default function Products() {
  const classes = useStyles();
  const [visible, setVisible] = useState(20);

  const products = useAppSelector((state) => state.products.productsList);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    setVisible(visible + 5);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <h1 className={classes.h1Style}>Featured Products</h1>
      <Grid container spacing={2}>
        {products.slice(0, visible).map((product: any) => (
          <Grid item xs={12} sm={2} spacing={2} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Box className={classes.root}>
                <Box>
                  <Box>
                    <img
                      src={product.images[0].image}
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
      <Box display="flex" alignItems="center" justifyContent="center">
        {visible < products.length && (
          <Button onClick={loadMore} className={classes.btnLoadMore}>
            Load More
          </Button>
        )}
      </Box>
    </Container>
  );
}
