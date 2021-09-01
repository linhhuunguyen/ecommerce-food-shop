import React from "react";
import { Link } from "react-router-dom";
import { Typography, makeStyles, Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  nameStyle: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#0d1136"
  },
  btnStyle: {
    margin: "15px 0 15px 30px"
  }
}));

export interface NameSiderbarProps {
  categories: any;
  onSelect: any;
  selectedColor: any;
}

export default function NameSiderbar({
  categories,
  onSelect,
  selectedColor
}: NameSiderbarProps) {
  const classes = useStyle();
  return (
    <>
      {categories.map((category: any, index: any) => (
        <Button
          key={category.id}
          className={classes.btnStyle}
          onClick={() => onSelect(index)}
        >
          <Link to={`/products?category=${category.sku}`}>
            <Typography
              className={classes.nameStyle}
              style={{ color: index === selectedColor ? "#009e7f" : "#000" }}
            >
              {category.name}
            </Typography>
          </Link>
        </Button>
      ))}
    </>
  );
}
