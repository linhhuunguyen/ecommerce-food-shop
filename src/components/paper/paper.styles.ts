import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '1rem'
    },
    title: {
      marginBottom: '1.5rem !important'
    }
  })
);
