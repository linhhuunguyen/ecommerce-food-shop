import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { BsFillInboxesFill, BsFillPeopleFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

import { useAppDispatch, useAppSelector } from 'store/hook';
import { getProducts } from 'store/Products/products.slide';
import { getCategories } from 'store/Categories/categories.slice';
import { getOrders } from 'store/Orders/orders.slice';
import { getMembers } from 'store/User/user.slice';

import { DashboardItem } from 'components/FormsUI';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const categories = useAppSelector((state) => state.categories.cateloryList);
  const orders = useAppSelector((state) => state.order.orderList);
  // const { user } = useAppSelector((state) => state.users);
  // const buyer = user.filter((member) => member.role.includes('buyer'));

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getOrders());
    // dispatch(getMembers(token));
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <DashboardItem
            icon={<BsFillInboxesFill />}
            data={12}
            title="Products"
            colorWrap="#005249"
            backgroundWrap="#C8FACD"
            colorIcon="#007B55"
            backgroundIcon="linear-gradient( 135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashboardItem
            icon={<FaClipboardList />}
            data={categories.categoryCount}
            title="Category"
            colorWrap="#04297A"
            backgroundWrap="#D0F2FF"
            colorIcon="#0C53B7"
            backgroundIcon="linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashboardItem
            icon={<TiShoppingCart />}
            data={orders.length}
            title="Orders"
            colorWrap="#7A4F01"
            backgroundWrap="#FFF7CD"
            colorIcon="#B78103"
            backgroundIcon="linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashboardItem
            icon={<BsFillPeopleFill />}
            data={20}
            title="Buyer"
            colorWrap="#7A0C2E"
            backgroundWrap="#FFE7D9"
            colorIcon="#B72136"
            backgroundIcon="linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
