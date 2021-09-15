import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import { Logo } from 'components/Header/components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#333'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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

  const data = localStorage.getItem('members');
  const member = JSON.parse(`${data}`);

  const handleLogout = () => {
    localStorage.removeItem('members');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin');
    history.replace('/admin/login');
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Logo link="/admin" />
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Avatar alt="Remy Sharp" src={member.avatar} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography>{member.fullname}</Typography>
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
      </Toolbar>
    </AppBar>
  );
}
