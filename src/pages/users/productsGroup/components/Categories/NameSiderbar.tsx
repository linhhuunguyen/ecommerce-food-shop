import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography, makeStyles, Button } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    padding: '5px 20px',
    borderRadius: '5px'
  },
  nameStyle: {
    fontSize: '13px',
    fontWeight: 400,
    color: '#0d1136'
  }
}));

export interface NameSiderbarProps {
  categories: any;
  onSelect: any;
  selectedColor: any;
}

export default function NameSiderbar({
  categories,
  onSelect,
  selectedColor
}: NameSiderbarProps) {
  const classes = useStyle();
  return (
    <Grid container>
      {categories.map((category: any, index: any) => (
        <Grid item key={category.id} sm={6}>
          <Button onClick={() => onSelect(index)}>
            <Link
              to={`/products?category=${category.sku}`}
              style={{
                border: index === selectedColor ? '2px solid #009e7f' : ' #000'
              }}
            >
              <Box className={classes.root}>
                <Box marginBottom="10px">
                  <img src={category.image} alt="" />
                </Box>
                <Typography className={classes.nameStyle}>
                  {category.name}
                </Typography>
              </Box>
            </Link>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
