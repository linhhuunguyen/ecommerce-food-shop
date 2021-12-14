import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from 'store/hook';
import { getCategories } from 'store/Categories/categories.slice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    padding: '20px 0',
    borderRadius: '5px'
  },
  space: {
    margin: '30px 0'
  },
  nameStyle: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#0d1136'
  },
  titleStyle: {
    color: '#192a56',
    marginBottom: '10px',
    fontSize: '1.5rem',
    fontWeight: 500
  }
}));

function SampleArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#888',
        height: '35px',
        width: '35px',
        borderRadius: '50%',
        zIndex: '1'
      }}
      onClick={onClick}
    />
  );
}

export default function CategoryList() {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const data = useAppSelector((state) => state.categories.cateloryList);

  const categories = [...data].reverse();

  return (
    <Box className={classes.space}>
      <Container>
        <Typography className={classes.titleStyle}>Categories</Typography>
        <Slider {...settings}>
          {categories.map((category: any) => (
            <Button key={category.id}>
              <Link to={`/products?category=${category.sku}`}>
                <Box className={classes.root}>
                  <Box marginBottom="10px">
                    <img src={category.image} alt="" />
                  </Box>
                  <Typography className={classes.nameStyle}>
                    {category.name}
                  </Typography>
                </Box>
              </Link>
            </Button>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
