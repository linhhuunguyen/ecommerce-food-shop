import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { Login, Signup } from "./components";

export interface LoginSignupProps {
  num: number;
}

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: 500,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function LoginSignup({ num }: LoginSignupProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(num);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={20} className={classes.paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="SIGN IN" />
        <Tab label="SIGN UP" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Paper>
  );
}
