import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles, Drawer, List } from '@material-ui/core';
import { useAppSelector, useAppDispatch } from 'store/hook';

import { getCategories } from 'store/Categories/categories.slice';
import NameSiderbar from './NameSiderbar';

const drawerWidth = 220;

const useStyle = makeStyles((theme) => ({
  categoriesStyle: {
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  nameStyle: {
    fontSize: '13px',
    fontWeight: 400,
    color: '#0d1136'
  },
  btnStyle: {
    margin: '15px 0 15px 30px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1
  },
  drawerContainer: {
    overflow: 'auto'
  },
  toolbar: theme.mixins.toolbar
}));

export default function Categories() {
  const classes = useStyle();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const data = useAppSelector((state) => state.categories.cateloryList);
  const categories = [...data].reverse();

  const [selectedColor, setSelectedColor] = useState();
  return (
    <Box>
      <NameSiderbar
        categories={categories}
        onSelect={setSelectedColor}
        selectedColor={selectedColor}
      />
    </Box>
  );
}
