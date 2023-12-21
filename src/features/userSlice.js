import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = { winter: "winter", dracula: "dracula" }; // themes object to choose from

const getThemeFromStorage = () => {
  const theme = localStorage.getItem(themes) || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}; // retrieving theme set from the local storage

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
}; // convert the user in the local storage to an object and retrieve it

const defaultState = {
  user: getUserFromStorage(), // getting the user object from the local storage
  theme: getThemeFromStorage(), // getting the theme object from the local storage
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt }; // spread all the payload response
      state.user = user; // updating the user state
      localStorage.setItem("user", JSON.stringify(user)); // set the user into the local storage
    },
    logoutUser: (state) => {
      state.user = null; // update the user state
      localStorage.removeItem("user"); // remover the user from the local storage
      toast.success("User Logged Out");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes; // desc the theme
      state.theme = state.theme === dracula ? winter : dracula; // updating the state value of the theme
      document.documentElement.setAttribute("data-theme", state.theme); // add the theme set as the data-theme value for the entire HTML node in the DOM
      localStorage.setItem("theme", state.theme); // set the theme into the local storage
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions; // user slice actions

export default userSlice.reducer;
