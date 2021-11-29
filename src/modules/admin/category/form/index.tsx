import { useMemo, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shortUUID from 'short-uuid';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'store/hook';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import Switch from '@mui/material/Switch';

import Paper from 'components/paper';

import {
  addCategory,
  getSingleCategory,
  updateCategory
} from 'store/Categories/categories.slice';
import { Category } from 'types/Category';
import { categorySchema } from './category-form.schema';

interface CategoryFormProps {
  mode: 'create' | 'edit';
}

const CategoryForm = ({ mode }: CategoryFormProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { singleCategory, loading } = useAppSelector(
    (state) => state.categories
  );

  const { id } = useParams<{ id: string }>();

  const initialValues = useMemo(() => {
    if (mode === 'edit') {
      return {
        _id: singleCategory._id,
        name: singleCategory.name,
        description: singleCategory.description,
        status: singleCategory.status
      };
    }
    return {
      name: '',
      description: '',
      status: true
    };
  }, [singleCategory, mode]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleCategory(id));
    }
  }, [id, dispatch]);

  function handleSubmit(values: Category) {
    if (mode === 'edit') {
      const category = { ...values };
      dispatch(updateCategory({ id, category }));
      history.push('/admin/category');
    }
    if (mode === 'create') {
      dispatch(addCategory(values));
      console.log(values);
    }
    history.push('/admin/category');
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: handleSubmit
  });

  return (
    <Paper loading={loading} heading="Category Information">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid container item lg={12} md={12}>
            <TextField
              id="name"
              fullWidth
              error={!!formik.touched.name && !!formik.errors.name}
              label="Name"
              name="name"
              type="text"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
          </Grid>
          <Grid container item lg={12} md={12}>
            <TextField
              id="description"
              error={
                !!formik.touched.description && !!formik.errors.description
              }
              fullWidth
              label="Description"
              name="description"
              type="text"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              helperText={
                formik.touched.description &&
                formik.errors.description &&
                formik.errors.description
              }
            />
          </Grid>
          <Grid container item lg={12} md={12}>
            <Switch
              checked={formik.values.status}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid container item lg={12} md={12}>
            <Box>
              <Button onClick={() => history.push('/admin/category')}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CategoryForm;
