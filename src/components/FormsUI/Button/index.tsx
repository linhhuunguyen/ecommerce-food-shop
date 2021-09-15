import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export interface ButtonWrapProps {
  name: string;
  handle?: any;
  width: string;
}

const useStyle = makeStyles((theme) => ({
  btnSubmit: {
    color: '#fff',
    padding: '10px',
    background: '#019376',
    border: 'none',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#019376',
      color: '#fff',
      border: 'none'
    }
  }
}));

export function ButtonWrap({ name, handle, width }: ButtonWrapProps) {
  const classes = useStyle();
  return (
    <Button
      className={classes.btnSubmit}
      variant="outlined"
      color="primary"
      type="submit"
      style={{
        width: `${width}`
      }}
      onClick={handle}
    >
      {name}
    </Button>
  );
}

export function ButtonCanelWrap({ name, handle, width }: ButtonWrapProps) {
  const classes = useStyle();
  return (
    <Button
      className={classes.btnSubmit}
      variant="outlined"
      color="primary"
      type="submit"
      style={{
        width: `${width}`,
        marginRight: '20px',
        color: '#fc5c63',
        background: '#fff',
        boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)'
      }}
      onClick={handle}
    >
      {name}
    </Button>
  );
}
