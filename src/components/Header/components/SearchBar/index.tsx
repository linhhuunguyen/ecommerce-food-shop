import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

export interface SearchBarProps {}

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: theme.shape.borderRadius,
    width: '50%'
  },
  input: {
    color: '#77798c',
    width: '100%',
    padding: '5px 10px',
    marginLeft: theme.spacing(1)
  },
  iconSearch: {
    margin: '0 16px'
  }
}));

export default function SearchBar(props: SearchBarProps) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  return (
    <Box className={classes.search}>
      <InputBase
        placeholder="Search..."
        className={classes.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button>
        <Link
          to={value !== '' ? `/search?q=${value}` : ''}
          style={{ color: '#333', display: 'flex', alignItems: 'center' }}
        >
          <Search className={classes.iconSearch} />
        </Link>
      </Button>
    </Box>
  );
}
