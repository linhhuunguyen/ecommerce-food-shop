import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from 'components/Header/components';

import { useAppDispatch } from 'store/hook';
import { loginMembers } from 'store/User/user.slice';
import { LoginUer } from 'types/User';
import { ButtonWrap } from 'components/FormsUI';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#fff',
    padding: '50px'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '20px 0'
  },
  formStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  inputStyle: {
    margin: '10px 0'
  }
}));

export interface LoginProps {}

export default function AdminLogin(props: LoginProps) {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [userLogin, setUserLogin] = useState<LoginUer>({
    email: '',
    password: ''
  });

  const { email, password } = userLogin;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setUserLogin({ ...userLogin, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(loginMembers(userLogin));
    history.replace('/admin');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.main}>
        <Box className={classes.box}>
          <Logo link="/admin" />
          <Typography>Login in to admin</Typography>
        </Box>
        <Box className={classes.box}>
          <form
            className={classes.formStyle}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              className={classes.inputStyle}
              id="standard-basic"
              label="email"
              name="email"
              value={email}
              type="text"
              size="small"
              variant="outlined"
              required
              onChange={handleInputChange}
            />
            <TextField
              className={classes.inputStyle}
              id="standard-basic"
              label="Password"
              value={password}
              name="password"
              type="password"
              variant="outlined"
              size="small"
              required
              onChange={handleInputChange}
            />
            <ButtonWrap name="SUBMIT" width="100%" />
          </form>
        </Box>
      </Box>
    </Box>
  );
}
