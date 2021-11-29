import { useState, MouseEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import axios from 'axios';
import { detailUserAdmin } from 'store/User/user.slice';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { Logo } from 'components/Header/components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      color: '#333'
    },
    appBar: {
      justifyContent: 'center',
      width: 'calc(100% - 15rem)',
      height: '5rem',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      background: '#fff',
      color: '#333'
    },
    logoutStyle: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#161f6a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'capitalize',
      padding: '0px',
      margin: '0px'
    }
  })
);

const ITEM_HEIGHT = 48;

export default function Topbar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (token) {
      dispatch(detailUserAdmin(token));
    }
  }, [token, dispatch]);

  const handleLogout = async () => {
    await axios.get('/api/v1/logout');
    localStorage.removeItem('token');
    history.replace('/admin');
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="default">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.toolbar}
      >
        <Logo link="/admin" />
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography>{user.name}</Typography>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <ArrowDropDownRoundedIcon />
            </IconButton>
            <Menu
              style={{ position: 'absolute', top: '25px' }}
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '100px'
                }
              }}
            >
              <MenuItem
                onClick={handleClose}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Button className={classes.logoutStyle} onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Grid>
    </AppBar>
  );
}
