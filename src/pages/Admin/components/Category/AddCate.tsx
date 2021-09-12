import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

import { useAppDispatch } from "store/hook";
import { addCategory } from "store/Categories/categories.slice";

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

export default function AddCate() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [category, setCategory] = useState({
    id: uuidv4(),
    name: "",
    sku: "",
    image: ""
  });

  const { id, name, sku, image } = category;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setCategory({ ...category, [e.target.name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!id || !name || !sku || !image) {
      console.log("errr");
    } else {
      dispatch(addCategory(category));
      history.push("/admin/category");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box padding="20px">
        <Typography style={{ color: "#161f6a", fontWeight: 700 }}>
          ADD CATEGORY
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
          value={name}
          name="name"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku}
          name="sku"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image}
          name="image"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
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
