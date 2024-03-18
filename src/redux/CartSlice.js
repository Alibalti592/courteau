import { createSlice } from "@reduxjs/toolkit";
import {} from "axios";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      const tempProduct = { ...action.payload, cartQuantity: 1 };
      state.cartItems.push(tempProduct);
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantitiy > 1) {
        state.cartItems[itemIndex].quantitiy -= 1;
      } else if (state.cartItems[itemIndex].quantitiy === 1) {
        const nCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nCartItems;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { prices, quantitiy } = cartItem;

          const itemTotal = prices.price * quantitiy;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantitiy;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});
export const {
  addtoCart,
  getSelectedSize,
  getTotals,
  removeFromCart,
  decreaseCart,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
