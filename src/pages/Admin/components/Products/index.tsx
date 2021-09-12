import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Container,
  Box,
  Typography
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAppSelector, useAppDispatch } from "store/hook";
import { getProducts, deleteProduct } from "store/Products/products.slide";

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  topBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px 0",
    padding: "30px 60px",
    background: "#fff"
  },
  title: {
    color: "#161f6a",
    fontSize: "20px",
    fontWeight: 700
  },
  btnAdd: {
    color: "#fff",
    padding: "14px 16px",
    background: "#019376",
    border: "none",
    "&:hover": {
      backgroundColor: "#019376",
      color: "#fff",
      border: "none"
    }
  },
  btnEdit: {
    background: "#fff",
    color: "#019376",
    margin: "0 3px"
  },
  btnDelete: {
    background: "#fff",
    color: "#fc5c63",
    margin: "0 3px"
  }
});

export default function AdminProducts() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const data = useAppSelector((state) => state.products.productsList);

  const products = [...data].reverse();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleDelete = (id: any) => {
    dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box className={classes.topBox}>
        <Box>
          <Typography className={classes.title}>Products</Typography>
        </Box>
        <Button
          className={classes.btnAdd}
          variant="outlined"
          color="primary"
          onClick={() => history.push("products/add")}
        >
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">IMAGE</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">QUANTITY</TableCell>
              <TableCell align="center">CATEGORY</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={product.images[0].image}
                      alt=""
                      style={{ width: "50%" }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="left">
                    <Box style={{ display: "flex" }}>
                      <Button
                        className={classes.btnEdit}
                        onClick={() =>
                          history.push(`products/update/${product.id}`)
                        }
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        className={classes.btnDelete}
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
