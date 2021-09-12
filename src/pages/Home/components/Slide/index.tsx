import React from "react";
import Slider from "react-slick";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Home1 from "assets/home-img-1.png";
import Home2 from "assets/home-img-2.png";
import Home3 from "assets/home-img-3.png";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center"
  },
  spanStyle: {
    color: "#27ae60",
    fontSize: "1.5rem"
  },
  h3Style: {
    color: "#192a56",
    fontSize: "5rem"
  },
  pStyle: {
    color: "#666",
    fontSize: "1rem",
    padding: ".5rem 0",
    lineHeight: 1.5
  },
  bgColor: {
    background: "#fff",
    paddingTop: "5.5rem"
  }
}));

export default function Slide() {
  const classes = useStyle();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    Arrow: false
  };

  return (
    <Box className={classes.bgColor}>
      <Container maxWidth="lg">
        <Slider {...settings}>
          <Box className={classes.root}>
            <Box className="content">
              <Typography className={classes.spanStyle}>
                Our Special Dish
              </Typography>
              <Typography variant="h3" className={classes.h3Style}>
                Spicy Noodles
              </Typography>
              <Typography className={classes.pStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                natus dolor cumque?
              </Typography>
            </Box>
            <Box className="image">
              <img src={Home1} alt="" />
            </Box>
          </Box>
          <Box className={classes.root}>
            <Box className="content">
              <Typography className={classes.spanStyle}>
                Our Special Dish
              </Typography>
              <Typography variant="h3" className={classes.h3Style}>
                Spicy Noodles
              </Typography>
              <Typography className={classes.pStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                natus dolor cumque?
              </Typography>
            </Box>
            <Box className="image">
              <img src={Home2} alt="" />
            </Box>
          </Box>
          <Box className={classes.root}>
            <Box className="content">
              <Typography className={classes.spanStyle}>
                Our Special Dish
              </Typography>
              <Typography variant="h3" className={classes.h3Style}>
                Spicy Noodles
              </Typography>
              <Typography className={classes.pStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                natus dolor cumque?
              </Typography>
            </Box>
            <Box className="image">
              <img src={Home3} alt="" />
            </Box>
          </Box>
        </Slider>
      </Container>
    </Box>
  );
}
