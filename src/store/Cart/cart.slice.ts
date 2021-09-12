import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { Cart } from "types/Cart";

const initialState: Cart = {
  cartItems: [],
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
        };
        toast.info(
          `Increased ${state.cartItems[existingIndex].name}  quantity`,
          {
            position: "bottom-left"
          }
        );
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left"
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem: any) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item: any) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
          toast.error("Product removed from cart", {
            position: "bottom-left"
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      state.cartItems.map((cartItem: any) => {
        if (cartItem.id === action.payload.id) {
          if (cartItem.cartQuantity > 1) {
            cartItem = {
              ...cartItem,
              cartQuantity: cartItem.cartQuantity - 1
            };

            const existingIndex = state.cartItems.findIndex(
              (item: any) => item.id === cartItem.id
            );

            state.cartItems[existingIndex] = cartItem;
            toast.info("Decreased product quantity", {
              position: "bottom-left"
            });
          } else if (cartItem.cartQuantity === 1) {
            const nextCartItems = state.cartItems.filter(
              (item: any) => item.id !== cartItem.id
            );
            state.cartItems = nextCartItems;
            toast.error("Product removed from cart", {
              position: "bottom-left"
            });
          }
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },

    getTotals(state, action) {
      const sum = state.cartItems.map(
        (item: any) => item.price * item.cartQuantity
      );
      const total = sum.reduce(
        (price: number, cartQuantity: number) => price + cartQuantity,
        0
      );
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    }
  }
});

export const { addToCart, removeFromCart, clearCart, decreaseCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
