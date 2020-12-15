import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
import { productReducer } from "../reducers/productReducer";

export const addToCart = (product) => (dispatch, getState) => {
  //getState - we can use what is currently on the store
  const cartItems = getState().cart.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyInCart = true;
      x.count++;
    }
  });
  if (!alreadyInCart) {
    cartItems.push({
      ...product,
      count: 1,
    });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartitem", JSON.stringify(cartItems));
};

export const removeFromCart = (itemToRemove) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== itemToRemove._id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartitem", JSON.stringify(cartItems));
};
