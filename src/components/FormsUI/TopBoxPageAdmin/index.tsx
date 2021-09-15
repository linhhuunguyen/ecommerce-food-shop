import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  topBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
    padding: '30px 60px',
    background: '#fff'
  },
  title: {
    color: '#161f6a',
    fontSize: '20px',
    fontWeight: 700
  },
  btnAdd: {
    color: '#fff',
    padding: '14px 16px',
    background: '#019376',
    border: 'none',
    '&:hover': {
      backgroundColor: '#019376',
      color: '#fff',
      border: 'none'
    }
  }
});

export interface TopBoxProps {
  title: string;
  nameButton: string;
  handle: any;
}

export default function TopBox({ title, nameButton, handle }: TopBoxProps) {
  const classes = useStyles();
  return (
    <Box className={classes.topBox}>
      <Box>
        <Typography className={classes.title}>{title}</Typography>
      </Box>
      <Button
        className={classes.btnAdd}
        variant="outlined"
        color="primary"
        onClick={handle}
      >
        {nameButton}
      </Button>
    </Box>
  );
}
