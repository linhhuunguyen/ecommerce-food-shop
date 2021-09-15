import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { ButtonWrap, ButtonCanelWrap } from 'components/FormsUI';
import { addMembers, getMembers } from 'store/User/user.slice';
import { useAppDispatch } from 'store/hook';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: '45ch'
      }
    },
    genderBox: {
      display: 'flex',
      flexDirection: 'row'
    }
  })
);

export default function AddMember() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [member, setMember] = useState({
    fullname: '',
    contact: '',
    address: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    role: ''
  });

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setMember({ ...member, [e.target.name]: value });
  };

  const {
    fullname,
    contact,
    address,
    gender,
    email,
    password,
    confirmPassword,
    role,
    avatar
  } = member;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (member.password === member.confirmPassword) {
      dispatch(
        addMembers({
          fullname,
          contact,
          address,
          gender,
          email,
          password,
          avatar,
          role
        })
      );
      await dispatch(getMembers());
      toast.success('Add Member Success', {
        theme: 'colored',
        position: 'top-right'
      });
      history.push('/admin/members');
    } else {
      toast.error('Notify! Wrong account or password !', {
        icon: false
      });
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <Box padding="20px">
        <Typography style={{ color: '#161f6a', fontWeight: 700 }}>
          ADD Members
        </Typography>
      </Box>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Full Name"
          value={fullname}
          name="fullname"
          type="text"
          variant="outlined"
          size="small"
          onChange={handleInputChange}
        />
        <Box display="flex" alignItems="center">
          <TextField
            id="standard-basic"
            label="Contact"
            value={contact}
            name="contact"
            type="number"
            variant="outlined"
            size="small"
            style={{ marginRight: '10px' }}
            required
            onChange={handleInputChange}
          />
          <Select
            onChange={handleInputChange}
            value={role}
            name="role"
            required
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'buyer'}>Buyer</MenuItem>
          </Select>
        </Box>
        <TextField
          id="standard-basic"
          label="Address"
          value={address}
          name="address"
          type="text"
          variant="outlined"
          size="small"
          required
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
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Avatar"
          value={avatar}
          name="avatar"
          type="text"
          variant="outlined"
          size="small"
          required
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          name="email"
          type="text"
          variant="outlined"
          size="small"
          required
          onChange={handleInputChange}
        />
        <TextField
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
        <TextField
          id="standard-basic"
          label="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          type="password"
          variant="outlined"
          size="small"
          required
          onChange={handleInputChange}
        />
        <Box>
          <ButtonCanelWrap
            name="Cancel"
            width="130px"
            handle={() => history.push('/admin/members')}
          />
          <ButtonWrap name="Save" width="130px" />
        </Box>
      </form>
    </Container>
  );
}
