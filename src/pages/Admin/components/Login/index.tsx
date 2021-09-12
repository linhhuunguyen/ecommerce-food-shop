import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  makeStyles,
  Box,
  Typography
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "store/hook";
import { loginMembers } from "store/User/user.slice";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
    padding: "50px"
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "20px 0"
  },
  formStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  logo: {
    marginBottom: "20px",
    fontWeight: "bold"
  },
  inputStyle: {
    margin: "10px 0"
  },
  btnSubmit: {
    color: "#fff",
    width: "100%",
    padding: "10px",
    background: "#019376",
    border: "none",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#019376",
      color: "#fff",
      border: "none"
    }
  }
}));

export interface LoginProps {}

export default function AdminLogin(props: LoginProps) {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const members = useAppSelector((state) => state.users.userData);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userLogin;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setUserLogin({ ...userLogin, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(loginMembers(userLogin));
    history.replace("/admin");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.main}>
        <Box className={classes.box}>
          <Typography variant="h4" noWrap className={classes.logo}>
            <span style={{ color: "#161f6a" }}>Pick</span>
            <span style={{ color: "#019376" }}>Bazar</span>
          </Typography>
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
            <Button
              className={classes.btnSubmit}
              variant="outlined"
              color="primary"
              type="submit"
              onChange={handleInputChange}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
