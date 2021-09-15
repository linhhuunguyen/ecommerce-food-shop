import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shortUUID from 'short-uuid';
import { toast } from 'react-toastify';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

import { useAppDispatch } from 'store/hook';
import { Category } from 'types/Category';
import { addCategory } from 'store/Categories/categories.slice';
import { ButtonWrap, ButtonCanelWrap } from 'components/FormsUI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: '45ch'
      }
    }
  })
);

export default function AddCate() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [category, setCategory] = useState<Category>({
    id: shortUUID,
    name: '',
    sku: '',
    image: ''
  });

  const { name, sku, image } = category;

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setCategory({ ...category, [e.target.name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(addCategory(category));
    toast.success('Add category success', {
      theme: 'colored',
      position: 'top-left'
    });
    history.push('/admin/category');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <Box padding="20px">
        <Typography style={{ color: '#161f6a', fontWeight: 700 }}>
          ADD CATEGORY
        </Typography>
      </Box>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          name="name"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku}
          name="sku"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image}
          name="image"
          type="text"
          variant="outlined"
          required
          onChange={handleInputChange}
        />
        <Box>
          <ButtonCanelWrap
            name="Cancel"
            width="130px"
            handle={() => history.push('/admin/category')}
          />
          <ButtonWrap name="Save" width="130px" />
        </Box>
      </form>
    </Container>
  );
}
