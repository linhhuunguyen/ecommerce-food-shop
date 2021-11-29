import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import userAPI from 'api/users';
import { User, Users, Login } from 'types/User';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { getMembers, deleteMembers } from 'store/User/user.slice';
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
import DeleteIcon from '@material-ui/icons/Delete';

import { TopBox } from 'components/FormsUI';
import { Popup } from 'components';

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function Members() {
  const [keySearch, setKeySearch] = useState();
  const history = useHistory();
  const location = useLocation();
  const dispath = useAppDispatch();
  const classes = useStyles();

  const test = useAppSelector((state) => state.users.usersList);
  const members = [...test].reverse();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { token } = useAppSelector((state) => state.auth);

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
    if (token) {
      dispath(getMembers(token));
    }
  }, [token, getMembers]);

  const handleDelete = async (id: number) => {
    await dispath(deleteMembers(id));
    dispath(getMembers(token));
  };

  const handleChangeSearchByKeyWord = (e: any) => {
    const { value } = e.target;
    setKeySearch(value);
    if (!value) {
      const newUrl = location.pathname;
    }
  };
  const handleSearchByKeyWord = () => {
    const newUrl = location.pathname;
    console.log(newUrl);
  };

  // const getAllMember = async () => {
  //   const response = await userAPI.getAllUser();
  //   return response;
  // };

  return (
    <Container maxWidth="lg">
      <TopBox
        title="Staff Members"
        nameButton="Add Members"
        handle={() => history.push('members/add')}
      />
      <form onSubmit={handleSearchByKeyWord}>
        <input
          maxLength={200}
          placeholder="name, email, phone"
          value={keySearch}
          onChange={handleChangeSearchByKeyWord}
        />
        <Button type="submit">Search</Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">IMAGE</TableCell>
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
                <TableRow key={member._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" style={{ width: '15rem' }}>
                    <img
                      src={member.avatar.url}
                      alt={member.name}
                      style={{ width: '20%' }}
                    />
                  </TableCell>
                  <TableCell align="left">{member.name}</TableCell>
                  <TableCell align="left">{member.email}</TableCell>
                  <TableCell align="left">{member.createdAt}</TableCell>
                  <TableCell align="center">{member.role}</TableCell>
                  <TableCell align="right">
                    {/* <Popup
                      name={<DeleteIcon />}
                      title="Are you sure to delete this record? "
                      btnConfirm="Confirm"
                      btnCanel="Canel"
                      handleConfirm={() => handleDelete(member.id)}
                    /> */}
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
