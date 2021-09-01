import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { Cart } from "types/Cart";

const initialState: Cart = {
  cartItems: [],
  cartTotalQuantity: 0,
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
        toast.info("Increased product quantity", {
          position: "bottom-left"
        });
      } else {
        const tempProductItem = { ...action.payload };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
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
      toast.error("Cart cleared", { position: "bottom-left" });
    }
    // getTotals(state, action) {
    //   let { total, quantity } = state.cartItems.reduce(
    //     (cartTotal: any, cartItem: any) => {
    //       const { price, cartQuantity } = cartItem;
    //       const itemTotal = price * cartQuantity;

    //       cartTotal.total += itemTotal;
    //       cartTotal.quantity += cartQuantity;

    //       return cartTotal;
    //     },
    //     {
    //       total: 0,
    //       quantity: 0
    //     }
    //   );
    //   total = parseFloat(total.toFixed(2));
    //   state.cartTotalQuantity = quantity;
    //   state.cartTotalAmount = total;
    // }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
