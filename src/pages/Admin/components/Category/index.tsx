import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { TopBox } from 'components/FormsUI';
import { Popup } from 'components';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getCategorys,
  deleteCategory
} from 'store/Categories/categories.slice';

const useStyles = makeStyles((theme) => ({
  buttonStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  table: {
    minWidth: 700
  },
  btnEdit: {
    background: '#fff',
    color: '#019376',
    margin: '0 3px'
  }
}));

export default function AdminCategory() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.categories.cateloryList);
  const categories = [...data].reverse();
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

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteCategory(id));
    dispatch(getCategorys());
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <TopBox
        title="Category"
        nameButton="Add Category"
        handle={() => history.push('category/add')}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">IMAGE</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">SKU</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="center">
                    <img src={category.image} alt="" />
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="left">{category.sku}</TableCell>
                  <TableCell align="left">
                    <Box className={classes.buttonStyles}>
                      <Box style={{ display: 'flex' }}>
                        <Button
                          className={classes.btnEdit}
                          onClick={() =>
                            history.push(`category/update/${category.id}`)
                          }
                        >
                          <EditIcon />
                        </Button>
                        <Popup
                          name={<DeleteIcon />}
                          title="Are you sure to delete this record? "
                          btnConfirm="Confirm"
                          btnCanel="Canel"
                          handleConfirm={() => handleDelete(category.id)}
                        />
                      </Box>
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
