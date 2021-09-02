import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "store/hook";
import { addCategory } from "store/Categories/categories.slice";

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

export default function AddCate() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    id: uuidv4(),
    name: "",
    sku: "",
    image: ""
  });

  const { id, name, sku, image } = state;

  const handleInputChange = (e: any) => {
    setState({
      ...state
    });
  };

  const handleNameChange = (e: any) => {
    setState({ ...state, name: e.target.value });
  };

  const handleSkuChange = (e: any) => {
    setState({ ...state, sku: e.target.value });
  };

  const handleImageChange = (e: any) => {
    setState({ ...state, image: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!id || !name || !sku || !image) {
      console.log("errr");
    } else {
      dispatch(addCategory(state));
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
          value={name}
          type="text"
          onChange={handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku}
          name="Sku"
          type="text"
          onChange={handleSkuChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image}
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
          Add Product
        </Button>
      </form>
    </Container>
  );
}
