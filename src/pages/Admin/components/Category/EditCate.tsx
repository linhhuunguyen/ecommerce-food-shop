import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import shortUUID from 'short-uuid';

import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  getSingleCategory,
  updateCategory
} from 'store/Categories/categories.slice';
import { Category } from 'types/Category';
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

export default function EditCate() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { singleCategory } = useAppSelector((state) => state.categories);
  const history = useHistory();
  const [category, setCategory] = useState<Category>({
    id: shortUUID,
    name: '',
    sku: '',
    image: ''
  });

  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleCategory) {
      setCategory({ ...singleCategory });
    }
  }, [singleCategory]);

  const { name, sku, image } = category;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, sku: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, image: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(updateCategory({ id, category }));
    history.push('/admin/category');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <Box padding="20px">
        <Typography style={{ color: '#161f6a', fontWeight: 700 }}>
          UPDATE CATEGORY
        </Typography>
      </Box>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          type="text"
          variant="outlined"
          required
          onChange={handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="sku"
          value={sku}
          name="Sku"
          type="text"
          variant="outlined"
          required
          onChange={handleSkuChange}
        />
        <TextField
          id="standard-basic"
          label="Image"
          value={image}
          name="image"
          type="text"
          variant="outlined"
          required
          onChange={handleImageChange}
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
