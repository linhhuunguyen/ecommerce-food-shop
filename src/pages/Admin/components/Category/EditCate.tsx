import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  getSingleCategory,
  updateCategory
} from "store/Categories/categories.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "45ch"
      }
    }
  })
);
export interface EditCateProps {}

export default function EditCate(props: EditCateProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [category, setCategory] = useState({
    id: uuidv4(),
    name: "",
    sku: "",
    image: ""
  });

  const { id } = useParams<{ id: any }>();
  console.log(id);

  const { singleCategory } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleCategory) {
      setCategory({ ...singleCategory });
    }
  }, [singleCategory]);

  const { name, sku, image } = category;

  const handleInputChange = (e: any) => {
    setCategory({
      ...category
    });
  };

  const handleNameChange = (e: any) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSkuChange = (e: any) => {
    setCategory({ ...category, sku: e.target.value });
  };

  const handleImageChange = (e: any) => {
    setCategory({ ...category, image: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !sku || !image) {
      console.log("errr");
    } else {
      dispatch(updateCategory(id, category);
      dispatch(getSingleCategory(id));
      history.push("/admin/category");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          value={name || ""}
          type="text"
          onChange={handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku || ""}
          name="Sku"
          type="text"
          onChange={handleSkuChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image || ""}
          name="image"
          type="text"
          onChange={handleImageChange}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Update Category
        </Button>
      </form>
    </Container>
  );
}
