import { ReactNode } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import {
  PATH_ADMIN,
  PATH_ADMIN_PRODUCTS,
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_ORDERS,
  PATH_ADMIN_MEMBERS
} from 'router/routes.paths';

interface MenuItemModel {
  name: string;
  to: string;
  icon: ReactNode;
}

export const sidebarItems: MenuItemModel[] = [
  {
    name: 'Dashboard',
    to: PATH_ADMIN,
    icon: <DashboardIcon />
  },
  {
    name: 'Products',
    to: PATH_ADMIN_PRODUCTS,
    icon: <ShoppingBasketIcon />
  },
  {
    name: 'Category',
    to: PATH_ADMIN_CATEGORY,
    icon: <CategoryIcon />
  },
  {
    name: 'Orders',
    to: PATH_ADMIN_ORDERS,
    icon: <ShopTwoIcon />
  },
  {
    name: 'Members',
    to: PATH_ADMIN_MEMBERS,
    icon: <PeopleAltIcon />
  }
];
