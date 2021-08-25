import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

export interface BannerProps {}

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(https://shop-redq.vercel.app/_next/static/images/grocery-f1565ac25de02b9295dccc2da13004ab.png)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column"
  },
  textcolor: {
    color: "#77798c"
  }
}));

export default function Banner(props: BannerProps) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <h1>Groceries Delivedred in 90 Minute</h1>
      <p className={classes.textcolor}>
        Get your healthy foods & snacks delivered at your doorsteps all day
        everyday
      </p>
    </div>
  );
}
