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
    emptyDetails: (state) => {
      toast.error("Payment Info Must Not be Empty");
      const cart = state.cartItems;
      state.cartItems = cart;
    }, // if payment in the checkout route is not complete the cart should remain same
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
      toast.success(`${product.title} Added To Cart`);
    },
    editItem: (state, action) => {
      const { cartId, amount, title } = action.payload; // getting the payload passed
      const product = state.cartItems.find((item) => item.cartId === cartId); // check to find if the cart ID in the payload is already in the cartItems array
      state.cartItemNumb += amount - product.amount; // This here updates the total number of items in the cart by adjusting it based on the difference between the provided amount and the existing quantity of that item. NOTE:If amount is greater than item.amount, it means that items are being added to the cart. If amount is less than item.amount, it means that items are being removed from the cart.
      state.cartProductTotal += product.price * (amount - product.amount); // This is calculating the change in the total cost of the cart based on the price of the item and the change in the quantity of that item. This calculation is then added to the current cart total. If amount is greater than item.amount, it means more items are being added, so the cost of those additional items is calculated by multiplying it with the price of the item. If amount is less than item.amount, it means items are being removed, so the cost of those removed items is subtracted from the cart total.
      product.amount = amount; // updating the amount of the product in the cart to the amount added in the payload
      cartSlice.caseReducers.calculateTotals(state); // reusable slice action
      toast.success(`${title} Updated in Cart`);
    },
    removeItem: (state, action) => {
      const { cartId, title } = action.payload; // getting the payload passed
      const product = state.cartItems.find((item) => item.cartId === cartId); // check to find if the cart ID in the payload is already in the cartItems array
      const removeProduct = state.cartItems.filter(
        (item) => item.cartId !== cartId
      ); // filtering the cart items array to return product who's ID is not same as the payload value
      state.cartItems = removeProduct; // updating the cart items state to the filtered one
      state.cartItemNumb -= product.amount; // decrease the cart item number based on the amount of the product that was found in the cart items array and then filtered out
      state.cartProductTotal -= product.price * product.amount; // remove the total of the product that was removed in the cart item array
      cartSlice.caseReducers.calculateTotals(state); // reusable slice action
      toast.success(` ${title} Removed From Cart`);
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

export const { addItem, editItem, removeItem, clearItem, emptyDetails } =
  cartSlice.actions; // cart slice actions

export default cartSlice.reducer;
