import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Order } from 'types/Order';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { getOrders } from 'store/Orders/orders.slice';
import { Table } from 'components';
import OrderTableHead from './order.table-head';

const OrderListTable = () => {
  const dispatch = useAppDispatch();
  const { orderList, loading } = useAppSelector((state) => state.order);
  const order = [...orderList].reverse();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // eslint-disable-next-line no-shadow
  // const renderRows = (order: Order) => (
  //   <TableRow key={order.id}>
  //     <TableCell>
  //       <Typography>Order ID: #{order.id}</Typography>
  //       {order.orderItem.cartItems.map((product: any) => (
  //         <Grid container key={product.id} alignItems="center">
  //           <Grid item sm={1}>
  //             <Box>
  //               <img
  //                 src={product.images[0].image}
  //                 style={{ width: '100%', height: '100%' }}
  //                 alt=""
  //               />
  //             </Box>
  //           </Grid>
  //           <Grid item sm={5}>
  //             <Box>{product.name}</Box>
  //           </Grid>
  //           <Grid item sm={1}>
  //             <Box>x {product.cartQuantity}</Box>
  //           </Grid>
  //         </Grid>
  //       ))}
  //     </TableCell>
  //     <TableCell align="center">{order.orderItem.cartTotalAmount}</TableCell>
  //     <TableCell align="right">
  //       <Link to={`/admin/orders/${order.id}`}>
  //         <VisibilityIcon />
  //       </Link>
  //     </TableCell>
  //   </TableRow>
  // );

  return (
    <>
      {/* {order ? (
        <Table
          loading={loading}
          head={<OrderTableHead />}
          colSpan={4}
          data={order}
          renderRows={renderRows}
        />
      ) : null} */}
      <div>his</div>
    </>
  );
};

export default OrderListTable;
