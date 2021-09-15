import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Button
} from '@material-ui/core';

import { getGroup } from 'store/Products/products.slide';

export interface GroupProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    },
    contentStyle: {
      boxSizing: 'border-box',
      padding: '20px'
    },
    titleStyle: {
      color: '#77798c',
      fontSize: '13px',
      fontWeight: 400
    },
    priceStyle: {
      color: '#0d1136',
      fontSize: '16px',
      fontWeight: 600
    },
    btnLoadMore: {
      color: '#fff',
      background: '#019376',
      borderColor: '#019376',
      marginTop: '15px',
      fontSize: '13px',
      '&:hover': {
        backgroundColor: '#019376',
        color: '#fff',
        border: 'none'
      }
    }
  })
);

export default function Group(props: GroupProps) {
  const classes = useStyles();
  const [visible, setVisible] = useState(30);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const cate: any = searchParams.get('category');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGroup(cate));
  }, [dispatch, cate]);

  const loadMore = () => {
    setVisible(visible + 10);
  };

  const products = useAppSelector((state) => state.products.productsList);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {products.slice(0, visible).map((product: any) => (
          <Grid item xs={12} sm={3} spacing={2} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Box className={classes.root}>
                <Box>
                  <Box>
                    <img
                      src={product.images[0].image}
                      alt=""
                      style={{ height: '100%', width: '100%' }}
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
