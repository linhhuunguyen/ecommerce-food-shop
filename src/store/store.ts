import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './Categories/categories.slice';
import productsReducer from './Products/products.slide';
import ordersReducer from './Orders/orders.slice';
import userReducer from './User/user.slice';

import cartReducer from './Cart/cart.slice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    order: ordersReducer,
    users: userReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
