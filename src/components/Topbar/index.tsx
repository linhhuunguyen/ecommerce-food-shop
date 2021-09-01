import React from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from "@material-ui/core";

import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    }
  })
);

export interface TopbarProps {}

export default function Topbar(props: TopbarProps) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Clipped drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
