import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationGrid: {
      padding: '0.5rem'
    }
  })
);
