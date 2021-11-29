import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch } from 'store/hook';
import { loginBuyer } from 'store/User/user.slice';
import { Login } from 'types/User';
import { ButtonWrap } from 'components/FormsUI';

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: 20,
    height: '60vh',
    width: 458,
    margin: '0 auto'
  },
  avatarStyle: {
    background: '#1bbd7e'
  },
  btnStyle: {
    margin: '8px 0'
  },
  logo: {
    marginTop: '15px',
    fontWeight: 'bold'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textBox: {
    margin: '10px 0'
  }
}));

export interface LoginProps {}

export default function LoginUser(props: LoginProps) {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [buyerLogin, setBuyerLogin] = useState<Login>({
    email: '',
    password: ''
  });

  const { email, password } = buyerLogin;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setBuyerLogin({ ...buyerLogin, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(loginBuyer(buyerLogin));
    if (localStorage.getItem('buyerToken')) {
      toast.success('Welcome To PinkBazar', {
        theme: 'colored',
        position: 'top-right'
      });
      history.replace('/');
    } else {
      toast.error('Notify! Wrong account or password !', {
        icon: false
      });
    }
  };
  return (
    <div>
      <Grid>
        <Paper className={classes.paper}>
          <Box className={classes.box}>
            <Typography style={{ fontWeight: 500 }}>Welcome To</Typography>
            <Typography variant="h4" noWrap className={classes.logo}>
              <span style={{ color: '#161f6a' }}>Pick</span>
              <span style={{ color: '#019376' }}>Bazar</span>
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.textBox}
              label="Username"
              type="text"
              value={email}
              name="email"
              placeholder="Enter username"
              fullWidth
              required
              variant="outlined"
              onChange={handleInputChange}
            />
            <TextField
              className={classes.textBox}
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              name="password"
              fullWidth
              required
              variant="outlined"
              onChange={handleInputChange}
            />
            <ButtonWrap name="Login" width="100%" />
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
