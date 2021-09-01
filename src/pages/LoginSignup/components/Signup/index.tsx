import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const useStyle = makeStyles((theme) => ({
  paperStyle: {
    padding: 30,
    width: 300,
    margin: "0 auto"
  },
  avatarStyle: {
    background: "#1bbd7e"
  },
  hederStyle: {
    margin: 0
  },
  marginTop: {
    marginTop: 5
  }
}));

export interface SignupProps {}

export default function Signup(props: SignupProps) {
  const classes = useStyle();
  return (
    <div>
      <Grid>
        <Paper className={classes.paperStyle}>
          <Grid>
            <Avatar className={classes.avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 className={classes.hederStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form>
            <TextField fullWidth label="Name" placeholder="Enter your name" />
            <TextField fullWidth label="Email" placeholder="Enter your email" />
            <FormControl component="fieldset" className={classes.marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
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
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            />
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
