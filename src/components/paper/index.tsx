import React from 'react';
import MuiPaper, { PaperProps } from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

import { useStyles } from './paper.styles';

interface CustomPaperProps extends PaperProps {
  loading?: boolean;
  heading?: string;
  className?: string;
}

const Paper = ({
  loading,
  heading,
  className,
  children,
  ...props
}: CustomPaperProps) => {
  const { root, title } = useStyles();
  return (
    <MuiPaper className={clsx(className && className, root)} {...props}>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {heading && (
            <Typography className={title} variant="h6">
              {heading}
            </Typography>
          )}
          {children}
        </>
      )}
    </MuiPaper>
  );
};

export default Paper;

Paper.defaultProps = {
  loading: false,
  heading: '',
  className: ''
};
