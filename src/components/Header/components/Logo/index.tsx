import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export interface LogoProps {
  link: string;
}

const useStyles = makeStyles((theme) => ({
  logoLg: {
    display: 'none',
    fontSize: '29px',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}));

export default function Logo({ link }: LogoProps) {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.logoLg}>
      <Link to={link}>
        <span style={{ color: '#161f6a' }}>Pick</span>
        <span style={{ color: '#019376' }}>Bazar</span>
      </Link>
    </Typography>
  );
}
