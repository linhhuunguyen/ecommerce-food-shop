import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  btnDelete: {
    background: '#fff',
    color: '#fc5c63',
    margin: '0 3px'
  }
}));

export interface IPopupProps {
  name: any;
  title: string;
  content?: string;
  btnConfirm: string;
  btnCanel: string;
  handleConfirm: any;
}

export default function Popup({
  name,
  title,
  content,
  btnConfirm,
  btnCanel,
  handleConfirm
}: IPopupProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen} className={classes.btnDelete}>
        {name}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {btnCanel}
          </Button>
          <Button onClick={handleConfirm} color="primary">
            {btnConfirm}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
