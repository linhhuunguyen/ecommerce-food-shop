import React, { useState, useEffect } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

import { useAppSelector, useAppDispatch } from "store/hook";
import {
  getCategorys,
  deleteCategory
} from "store/Categories/categories.slice";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const categories = useAppSelector((state) => state.categories.cateloryList);

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="left">image</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell component="th" scope="row">
                  {category.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img src={category.image} alt="" />
                </StyledTableCell>
                <StyledTableCell align="left">{category.name}</StyledTableCell>
                <StyledTableCell align="left">
                  <div className={buttonStyles.root}>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      aria-label="contained primary button group"
                    >
                      <Button style={{ marginRight: "5px" }} color="primary">
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
