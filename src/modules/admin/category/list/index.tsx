import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getAdminCategories,
  deleteCategory
} from 'store/Categories/categories.slice';
import { Category } from 'types/Category';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Table, Popup } from 'components';
import CategoryTableHead from './category.table-head';

const CategoryListTable = () => {
  const [categoryId, setCategoryId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { cateloryList, loading } = useAppSelector((state) => state.categories);

  const { token } = useAppSelector((state) => state.auth);
  const categories = [...cateloryList.categories].reverse();

  useEffect(() => {
    if (token) {
      dispatch(getAdminCategories(token));
    }
  }, [token, dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteCategory(id));
    dispatch(getAdminCategories(token));
    setOpen(false);
  };

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setCategoryId(id);
  };

  const handleClickClose = () => setOpen(false);

  const renderRows = (category: Category) => (
    <TableRow key={category._id}>
      <TableCell>{category._id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.description}</TableCell>
      <TableCell>
        <Button onClick={() => history.push(`category/update/${category._id}`)}>
          <EditIcon />
        </Button>
        {/* <Button onClick={() => handleClickOpen(category._id)}>
          <DeleteIcon />
        </Button> */}
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {categories && (
        <Table
          loading={loading}
          head={<CategoryTableHead />}
          colSpan={4}
          data={categories}
          renderRows={renderRows}
        />
      )}
      <Popup
        open={open}
        title="Delete this category?"
        message="Are you sure you want to category this product This action cannot be undone"
        onClose={handleClickClose}
        onConfirm={() => handleDelete(categoryId)}
      />
    </>
  );
};

export default CategoryListTable;
