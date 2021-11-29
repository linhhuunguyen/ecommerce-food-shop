import { ReactNode, MouseEvent, ChangeEvent, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import MuiTable, { TableProps as MuiTableProps } from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { pageSizeOptions } from './table.constant';

import { useStyles } from './table.styles';

interface TableProps extends MuiTableProps {
  loading?: boolean;
  head: ReactNode;
  colSpan: number;
  data: any[];
  renderRows: Function;
}

export default function Table({
  loading,
  head,
  data,
  colSpan,
  renderRows
}: TableProps) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const { paginationGrid } = useStyles();

  function handleChangePage(
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }
  function handleChangePageSize(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPageSize(Number(event.target.value));
    setPage(0);
  }

  const indexOfLastItem = (page + 1) * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentDataList = data?.slice(indexOfFirstItem, indexOfLastItem);

  function renderTableBody() {
    if (loading) {
      return (
        <TableRow>
          <TableCell
            align="center"
            style={{ border: 'none' }}
            colSpan={colSpan}
          >
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }
    if (data?.length === 0 || !data) {
      return (
        <TableRow>
          <TableCell
            align="center"
            style={{ border: 'none' }}
            colSpan={colSpan}
          >
            <Typography variant="body1">No data</Typography>
          </TableCell>
        </TableRow>
      );
    }
    return currentDataList.map((item) => renderRows(item));
  }

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </MuiTable>
      <Grid className={paginationGrid} container justifyContent="flex-end">
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPageOptions={pageSizeOptions}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePageSize}
        />
      </Grid>
    </TableContainer>
  );
}

Table.defaultProps = {
  loading: false
};
