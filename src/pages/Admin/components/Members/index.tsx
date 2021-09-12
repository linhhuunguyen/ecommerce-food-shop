import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "store/hook";
import { getMembers, deleteMembers } from "store/User/user.slice";
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
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function Members() {
  const history = useHistory();
  const dispath = useAppDispatch();
  const classes = useStyles();
  const data = useAppSelector((state) => state.users.usersList);
  const members = [...data].reverse();
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
    dispath(getMembers());
  }, [getMembers]);

  const handleDelete = (id: number) => {
    dispath(deleteMembers(id));
    dispath(getMembers());
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <Box className={classes.topBox}>
        <Box>
          <Typography className={classes.title}>Staff Members</Typography>
        </Box>
        <Button
          className={classes.btnAdd}
          variant="outlined"
          color="primary"
          onClick={() => history.push("members/add")}
        >
          Add Members
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">EMAIL</TableCell>
              <TableCell align="left">CONTACT</TableCell>
              <TableCell align="center">ROLE</TableCell>
              <TableCell align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell component="th" scope="row">
                    {member.id}
                  </TableCell>
                  <TableCell align="left">{member.fullname}</TableCell>
                  <TableCell align="left">{member.email}</TableCell>
                  <TableCell align="left">{member.contact}</TableCell>
                  <TableCell align="center">{member.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      className={classes.btnDelete}
                      onClick={() => handleDelete(member.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
