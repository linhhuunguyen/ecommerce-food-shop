import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  getSingleCategory,
  updateCategory,
  getCategorys
} from "store/Categories/categories.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
        width: "45ch"
      }
    },
    btnAdd: {
      color: "#fff",
      width: "130px",
      padding: "14px 16px",
      background: "#019376",
      border: "none",
      "&:hover": {
        backgroundColor: "#019376",
        color: "#fff",
        border: "none"
      }
    }
  })
);

export default function EditCate() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { singleCategory } = useAppSelector((state) => state.categories);
  const history = useHistory();
  const [category, setCategory] = useState({
    id: uuidv4(),
    name: "",
    sku: "",
    image: ""
  });

  const { id } = useParams<{ id: any }>();

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
      dispatch(updateCategory({ id, category }));
      dispatch(getCategorys());
      history.push("/admin/category");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box padding="20px">
        <Typography style={{ color: "#161f6a", fontWeight: 700 }}>
          UPDATE CATEGORY
        </Typography>
      </Box>
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
          variant="outlined"
          required
          onChange={handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku || ""}
          name="Sku"
          type="text"
          variant="outlined"
          required
          onChange={handleSkuChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image || ""}
          name="image"
          type="text"
          variant="outlined"
          required
          onChange={handleImageChange}
        />
        <Box>
          <Button
            className={classes.btnAdd}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => history.push("/admin/category")}
            style={{
              marginRight: "20px",
              color: "#fc5c63",
              background: "#fff",
              boxShadow: "0 2px 5px 1px rgb(64 60 67 / 16%)"
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.btnAdd}
            variant="outlined"
            color="primary"
            type="submit"
            onChange={handleInputChange}
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
}
