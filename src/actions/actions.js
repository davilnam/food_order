import { TOGGLE_SIDEBAR, LOGIN_SUCCESS, LOGOUT, ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const logout = () => ({
  type: LOGOUT
});

export const addToCart = (product) => ({  
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart  = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product
});
