import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAppSelector, useAppDispatch } from "store/hook";
import {
  getCategorys,
  deleteCategory
} from "store/Categories/categories.slice";

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
  const categories = useAppSelector((state) => state.categories.cateloryList);
  console.log(categories);

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

  const handleDelete = (id: any) => {
    dispatch(deleteCategory(id));
    dispatch(getCategorys());
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box className={classes.topBox}>
        <Box>
          <Typography className={classes.title}>Category</Typography>
        </Box>
        <Button
          className={classes.btnAdd}
          variant="outlined"
          color="primary"
          onClick={() => history.push("category/add")}
        >
          Add Category
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
                    <img src={category.image} alt="" />
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="left">{category.sku}</TableCell>
                  <TableCell align="left">
                    <div className={buttonStyles.root}>
                      <Box style={{ display: "flex" }}>
                        <Button
                          className={classes.btnEdit}
                          onClick={() =>
                            history.push(`category/update/${category.id}`)
                          }
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          className={classes.btnDelete}
                          onClick={() => handleDelete(category.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
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
