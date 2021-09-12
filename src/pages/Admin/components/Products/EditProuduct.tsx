import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  getProduct,
  updateProduct,
  getProducts
} from "store/Products/products.slide";
import { ProductDetail } from "pages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#fff",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%"
      }
    },
    boxItem: {
      display: "flex",
      alignItems: "center"
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

export default function EditProduct() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: any }>();
  console.log(id);

  const { productDetail } = useAppSelector((state) => state.products);

  const [product, setProduct] = useState({
    id: uuidv4(),
    name: "",
    des: "",
    price: 0,
    category: "",
    quantity: 0,
    images: [{ idI: uuidv4(), image: "" }]
  });

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail) {
      setProduct({ ...productDetail });
    }
  }, [productDetail]);

  const { name, des, price, category, quantity, images } = product;

  const handleInputChange = () => {
    setProduct({ ...product });
  };

  const handleName = (e: any) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handlePrice = (e: any) => {
    setProduct({ ...product, price: Number(e.target.value) });
  };
  const handleCategory = (e: any) => {
    setProduct({ ...product, category: e.target.value });
  };
  const handleQuantity = (e: any) => {
    setProduct({ ...product, quantity: Number(e.target.value) });
  };

  const handleDescription = (e: any) => {
    setProduct({ ...product, des: e.target.value });
  };

  const handleImageChange = (idI: string, e: any) => {
    const newProductList = { ...product };
    newProductList.images.map((image) => {
      if (idI === image.idI) {
        image.image = e.target.value;
      }
      return image;
    });
    setProduct(newProductList);
  };

  const handleAddImage = () => {
    setProduct({
      ...product,
      images: [...images, { idI: uuidv4(), image: "" }]
    });
  };

  const handleRemoveImage = (record: any) => {
    setProduct({
      ...product,
      images: images.filter((sidI) => sidI.idI !== record)
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!id || !images) {
      console.log("errr");
    } else {
      dispatch(updateProduct({ id, product }));
      dispatch(getProducts());
      history.push("/admin/products");
    }
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box padding="20px">
        <Typography style={{ color: "#161f6a", fontWeight: 700 }}>
          UPDATE PRODUCT
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
          name="name"
          type="text"
          variant="outlined"
          required
          onChange={handleName}
        />
        <Box className={classes.boxItem}>
          <TextField
            id="standard-basic"
            label="Price"
            value={price || ""}
            name="price"
            type="number"
            variant="outlined"
            required
            onChange={handlePrice}
          />

          <TextField
            id="standard-basic"
            label="Quantity"
            value={quantity || ""}
            name="quantity"
            type="number"
            variant="outlined"
            onChange={handleQuantity}
            required
            style={{ margin: "0px 10px" }}
          />
        </Box>
        <Box>
          <TextField
            id="standard-basic"
            label="Category"
            value={category || ""}
            name="category"
            type="text"
            variant="outlined"
            required
            onChange={handleCategory}
          />
        </Box>

        {images.map((imagesItem, index) => (
          <Box key={imagesItem.idI} className={classes.boxItem}>
            <TextField
              id="standard-basic"
              label="Image"
              value={imagesItem.image}
              fullWidth
              name="image"
              type="text"
              required
              variant="outlined"
              onChange={(e) => handleImageChange(imagesItem.idI, e)}
            />

            <Box>
              {index === 0 ? (
                <IconButton onClick={handleAddImage}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRemoveImage(imagesItem.idI)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}

        <TextField
          id="standard-basic"
          label="Description"
          value={des || ""}
          name="des"
          type="text"
          rowsMax={20}
          rows={5}
          multiline
          fullWidth
          required
          variant="outlined"
          onChange={handleDescription}
        />
        <Box>
          <Button
            className={classes.btnAdd}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => history.push("/admin/products")}
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
