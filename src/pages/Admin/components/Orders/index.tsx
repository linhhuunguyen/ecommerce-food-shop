import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TablePagination,
  Paper
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";

import { useAppSelector, useAppDispatch } from "store/hook";
import { getOrders } from "store/Orders/orders.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "30px"
    },
    table: {
      minWidth: 700
    }
  })
);

export default function AdminOrders() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.order.orderList);
  const order = [...data].reverse();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="center">Total Order</TableCell>
              <TableCell align="right">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((items, index) => (
                <TableRow key={items.id}>
                  <TableCell component="th" scope="row">
                    <Typography style={{ fontWeight: 500 }}>
                      Order ID: {items.id}
                    </Typography>
                    {items.orderItem.cartItems.map((product: any) => (
                      <Grid container key={product.id} alignItems="center">
                        <Grid item sm={1}>
                          <Box>
                            <img
                              src={product.images[0].image}
                              style={{ width: "100%", height: "100%" }}
                              alt=""
                            />
                          </Box>
                        </Grid>
                        <Grid item sm={5}>
                          <Box>{product.name}</Box>
                        </Grid>
                        <Grid item sm={1}>
                          <Box>x {product.cartQuantity}</Box>
                        </Grid>
                      </Grid>
                    ))}
                  </TableCell>

                  <TableCell align="center">
                    {items.orderItem.cartTotalAmount}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/orders/${items.id}`}>
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 30, 50, 100]}
        component="div"
        count={order.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
