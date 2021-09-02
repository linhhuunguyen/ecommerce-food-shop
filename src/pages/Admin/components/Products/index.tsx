import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

import { useAppSelector, useAppDispatch } from "store/hook";
import { getProducts } from "store/Products/products.slide";

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});
const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1)
      }
    }
  })
);

export default function AdminProducts() {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const [image, setImage] = useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useAppSelector((state) => state.products.productsList);

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">IMAGE</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">CATEGORY</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={product.images[image]}
                      alt=""
                      style={{ width: "50%" }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="left">
                    <div className={buttonStyles.root}>
                      <ButtonGroup
                        variant="contained"
                        color="primary"
                        aria-label="contained primary button group"
                      >
                        <Button style={{ marginRight: "5px" }} color="primary">
                          Edit
                        </Button>
                        <Button color="secondary">Delete</Button>
                      </ButtonGroup>
                    </div>
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
