import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { addMembers } from 'store/User/user.slice';
import { useAppDispatch } from 'store/hook';
import { ButtonWrap } from 'components/FormsUI';

const useStyle = makeStyles((theme) => ({
  paperStyle: {
    padding: 22,
    width: 455,
    margin: '0 auto'
  },
  avatarStyle: {
    background: '#1bbd7e'
  },
  hederStyle: {
    margin: 0
  },
  marginTop: {
    marginTop: 5
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
    margin: '15px 0'
  },
  textBox: {
    margin: '8px 0'
  },
  genderBox: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export interface SignupProps {}

export default function Signup(props: SignupProps) {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState({ confirmPassword: '' });
  const [buyer, setBuyer] = useState({
    fullname: '',
    contact: '',
    address: '',
    gender: '',
    email: '',
    password: '',
    avatar: '',
    role: 'buyer'
  });
  const { fullname, contact, address, gender, email, password, role, avatar } =
    buyer;

  const handleConfirmPassword = (e: any) => {
    setCheck({ ...check, confirmPassword: e.target.value });
  };
  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setBuyer({ ...buyer, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (buyer.password === check.confirmPassword) {
      await dispatch(addMembers(buyer));
      toast.success('Sign up success', {
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
        <Paper className={classes.paperStyle}>
          <Box className={classes.box}>
            <Typography style={{ fontWeight: 500 }}>Welcome To</Typography>
            <Typography variant="h4" noWrap className={classes.logo}>
              <span style={{ color: '#161f6a' }}>Pick</span>
              <span style={{ color: '#019376' }}>Bazar</span>
            </Typography>
          </Box>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item sm={7}>
                <TextField
                  className={classes.textBox}
                  value={fullname}
                  name="fullname"
                  type="text"
                  fullWidth
                  size="small"
                  required
                  variant="outlined"
                  label="Full Name"
                  placeholder="Enter your name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item sm={5}>
                <TextField
                  className={classes.textBox}
                  fullWidth
                  size="small"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={contact}
                  name="contact"
                  type="number"
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <TextField
              className={classes.textBox}
              value={address}
              name="address"
              type="text"
              fullWidth
              size="small"
              required
              variant="outlined"
              label="Address"
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                className={classes.genderBox}
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              className={classes.textBox}
              fullWidth
              size="small"
              label="Email"
              placeholder="Enter your email"
              value={email}
              name="email"
              type="text"
              required
              variant="outlined"
              onChange={handleInputChange}
            />
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <TextField
                  className={classes.textBox}
                  fullWidth
                  size="small"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  name="password"
                  type="password"
                  required
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  className={classes.textBox}
                  fullWidth
                  size="small"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={check.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  required
                  variant="outlined"
                  onChange={handleConfirmPassword}
                />
              </Grid>
            </Grid>
            <ButtonWrap name="Sign up" width="100%" />
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
