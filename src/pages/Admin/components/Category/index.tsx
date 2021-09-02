import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TablePagination from "@material-ui/core/TablePagination";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { useAppSelector, useAppDispatch } from "store/hook";
import {
  getCategorys,
  deleteCategory
} from "store/Categories/categories.slice";

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
export default function AdminCategory() {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
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
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
    dispatch(getCategorys());
  };

  const categories = useAppSelector((state) => state.categories.cateloryList);
  console.log(categories);

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push("category/add")}
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
              <TableCell align="left">SKU</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="center">
                    <img src={category.image} alt="" style={{ width: "20%" }} />
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="left">{category.sku}</TableCell>
                  <TableCell align="left">
                    <div className={buttonStyles.root}>
                      <ButtonGroup
                        variant="contained"
                        color="primary"
                        aria-label="contained primary button group"
                      >
                        <Button
                          style={{ marginRight: "5px" }}
                          color="primary"
                          onClick={() =>
                            history.push(`category/update/${category.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </Button>
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
