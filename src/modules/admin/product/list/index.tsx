import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Table, Popup } from 'components';
import { deleteProduct, getAdminProducts } from 'store/Products/products.slide';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { Product } from 'types/Product';
import ProductTableHead from './product.table-head';

const ProductListTable = () => {
  const [productId, setProductId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { products, loading } = useAppSelector((state) => state.products);

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAdminProducts(token));
    }
  }, [token, dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAdminProducts(token));
    setOpen(false);
  };

  const handleClickOpen = (_id: string) => {
    setOpen(true);
    setProductId(_id);
  };

  const handleClickClose = () => setOpen(false);

  const renderRows = (product: Product) => (
    <TableRow key={product._id}>
      <TableCell>{product._id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell align="left">
        <Button onClick={() => history.push(`products/update/${product._id}`)}>
          <EditIcon />
        </Button>
        {/* <Button onClick={() => handleClickOpen(product._id)}>
          <DeleteIcon />
        </Button> */}
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {products && (
        <Table
          loading={loading}
          head={<ProductTableHead />}
          colSpan={6}
          data={products}
          renderRows={renderRows}
        />
      )}
      <Popup
        open={open}
        title="Delete this product?"
        message="Are you sure you want to delete this product This action cannot be undone"
        onClose={handleClickClose}
        onConfirm={() => handleDelete(productId)}
      />
    </>
  );
};

export default ProductListTable;
