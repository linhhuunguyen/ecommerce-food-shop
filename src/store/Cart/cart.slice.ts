import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Cart, CartItem, ShippingInfo } from 'types/Cart';

type Id = string;

const initialState: Cart = {
  cartItems: [],
  shippingInfo: {
    id: 0,
    name: '',
    address: '',
    city: '',
    country: '',
    phone: ''
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingIndex = state.cartItems.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          quantity:
            state.cartItems[existingIndex].quantity + action.payload.quantity
        };
      } else {
        const tempProductItem = { ...action.payload };
        state.cartItems.push(tempProductItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action: PayloadAction<Id>) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      state.cartItems = nextCartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      return state;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingInfo(state, action: PayloadAction<ShippingInfo>) {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    }
  }
});

export const { addToCart, removeFromCart, clearCart, saveShippingInfo } =
  cartSlice.actions;

export default cartSlice.reducer;
