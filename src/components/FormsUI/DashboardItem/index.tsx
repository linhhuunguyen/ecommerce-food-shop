import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    boxItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: '15px',
      height: '45vh'
    },
    iconItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '64px',
      height: '64px'
    },
    textItem: {
      fontWeight: 600,
      fontSize: '0.85rem',
      opacity: 0.72,
      textAlign: 'center'
    },
    numberStyle: {
      fontWeight: 800,
      fontSize: '4.5rem',
      lineHeight: 1.35,
      paddingTop: '20px',
      textAlign: 'center'
    }
  })
);

export interface DashboardItemProps {
  icon: any;
  data: number;
  title: string;
  colorWrap: string;
  backgroundWrap: string;
  colorIcon: string;
  backgroundIcon: string;
}

export default function DashboardItem({
  icon,
  data,
  title,
  colorWrap,
  backgroundWrap,
  colorIcon,
  backgroundIcon
}: DashboardItemProps) {
  const classes = useStyles();
  return (
    <>
      <Box
        className={classes.boxItem}
        style={{ color: `${colorWrap}`, background: `${backgroundWrap}` }}
      >
        <Box
          className={classes.iconItem}
          style={{
            color: `${colorIcon}`,
            backgroundImage: `${backgroundIcon}`
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            className={classes.numberStyle}
            style={{ color: `${colorWrap}` }}
          >
            {data}
          </Typography>
          <Typography className={classes.textItem}>{title}</Typography>
        </Box>
      </Box>
    </>
  );
}
