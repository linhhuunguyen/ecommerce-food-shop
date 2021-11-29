import { ReactNode } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import {
  PATH_USER_ACCOUNT_PROFILE,
  PATH_USER_PURCHASE
} from 'router/routes.paths';

interface MenuItemModel {
  name: string;
  to: string;
  icon: ReactNode;
}

export const sidebarUserItems: MenuItemModel[] = [
  {
    name: 'My account',
    to: PATH_USER_ACCOUNT_PROFILE,
    icon: <AccountBoxIcon />
  },
  {
    name: 'Purchase Order',
    to: PATH_USER_PURCHASE,
    icon: <ShoppingBasketIcon />
  }
];
