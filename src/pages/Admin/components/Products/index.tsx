import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { TopBox } from 'components/FormsUI';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { getProducts, deleteProduct } from 'store/Products/products.slide';
import { Popup } from 'components';

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  btnEdit: {
    background: '#fff',
    color: '#019376',
    margin: '0 3px'
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

  const handleDelete = async (id: any) => {
    await dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <TopBox
        title="Products"
        nameButton="Add Product"
        handle={() => history.push('products/add')}
      />
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
                      style={{ width: '50%' }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="left">
                    <Box style={{ display: 'flex' }}>
                      <Button
                        className={classes.btnEdit}
                        onClick={() =>
                          history.push(`products/update/${product.id}`)
                        }
                      >
                        <EditIcon />
                      </Button>
                      <Popup
                        name={<DeleteIcon />}
                        title="Are you sure to delete this record? "
                        btnConfirm="Confirm"
                        btnCanel="Canel"
                        handleConfirm={() => handleDelete(product.id)}
                      />
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
