import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  cartItemNumb: 0,
  orderTotal: 0,
  shipping: 1500,
  cartProductTotal: 0,
  tax: 0,
}; // the default state for the cart slice

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState; // convert the cart in the local storage to an object and give me back
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload; // getting the payload product object
      const cartItem = state.cartItems.find(
        (item) => item.cartId === product.id
      ); // check to find if the product in the payload is already in the cartItems array
      if (cartItem) {
        cartItem.amount += product.amount; // if found increase just the cart item amount based on the product amount
      } else {
        state.cartItems.push(product); // add the product object payload in the cart items array
      }
      state.cartItemNumb += product.amount; // increase the cart item number based on the amount from the product payload
      state.cartProductTotal += product.price * product.amount; // increase the total value for each product in the cart
      cartSlice.caseReducers.calculateTotals(state); // reusable slice action
      toast.success("Added To Cart");
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload; // getting the payload passed
      const product = state.cartItems.find((item) => item.cartId === cartId); // check to find if the cart ID in the payload is already in the cartItems array
      state.cartItemNumb += amount - product.amount; // increase the cart item number based on the amount from the payload and the product amount already in the cart local storage
      state.cartProductTotal += product.price * (amount - product.amount); // increasing the product total in the cart when the amount is updated
      product.amount = amount; // updating the amount of the product in the cart to the amount added in the payload
      cartSlice.caseReducers.calculateTotals(state); // reusable slice action
      toast.success("Cart Updated Successfully");
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload; // getting the payload passed
      const product = state.cartItems.find((item) => item.cartId === cartId); // check to find if the cart ID in the payload is already in the cartItems array
      const removeProduct = state.cartItems.filter(
        (item) => item.cartId !== cartId
      ); // filtering the cart items array to return product who's ID is not same as the payload value
      state.cartItems = removeProduct; // updating the cart items state to the filtered one
      state.cartItemNumb -= product.amount; // decrease the cart item number based on the amount of the product that was found in the cart items array and then filtered out
      state.cartProductTotal -= product.price * product.amount; // remove the total of the product that was removed in the cart item array
      cartSlice.caseReducers.calculateTotals(state); // reusable slice action
      toast.success("Product Removed Successfully");
    },
    clearItem: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState)); // set the cart in the local storage to the default value
      return defaultState;
    }, // overwriting what is in the cart local storage
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartProductTotal; // add the tax value
      state.orderTotal = state.cartProductTotal + state.shipping + state.tax; // getting value of all the Total product ordered
      localStorage.setItem("cart", JSON.stringify(state)); // set the cart in the local storage
    },
  },
});

export const { addItem, editItem, removeItem, clearItem } = cartSlice.actions; // cart slice actions

export default cartSlice.reducer;
