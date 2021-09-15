import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
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

  const handleDelete = async (id: number) => {
    await dispath(deleteMembers(id));
    dispath(getMembers());
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <TopBox
        title="Staff Members"
        nameButton="Add Members"
        handle={() => history.push('members/add')}
      />
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
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{member.fullname}</TableCell>
                  <TableCell align="left">{member.email}</TableCell>
                  <TableCell align="left">{member.contact}</TableCell>
                  <TableCell align="center">{member.role}</TableCell>
                  <TableCell align="right">
                    <Popup
                      name={<DeleteIcon />}
                      title="Are you sure to delete this record? "
                      btnConfirm="Confirm"
                      btnCanel="Canel"
                      handleConfirm={() => handleDelete(member.id)}
                    />
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
