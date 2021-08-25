import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto"
  },
  avatarStyle: {
    background: "#1bbd7e"
  },
  btnStyle: {
    margin: "8px 0"
  }
}));

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const classes = useStyle();
  return (
    <div>
      <Grid>
        <Paper elevation={10} className={classes.paper}>
          <Grid alignContent="center">
            <Avatar className={classes.avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign in</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Remenber me"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            className={classes.btnStyle}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?<Link href="/sign-up">Sign up ?</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}
