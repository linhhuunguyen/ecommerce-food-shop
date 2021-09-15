import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import LoginSignup from 'pages/LoginSignup';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

export interface AccountProps {}

export default function Account(props: AccountProps) {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const handleLogin = () => {
    setOpen(true);
    setNum(0);
  };
  const handleSingup = () => {
    setOpen(true);
    setNum(1);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box mr={1}>
        <AccountCircleOutlinedIcon />
      </Box>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleSingup}>Sign up</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ height: 'auto', padding: '0' }}>
          <LoginSignup num={num} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
