import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products"); //get all products from db
  console.log("res", res);

  const data = await res.json();

  dispatch({
    //then dispatch ation to change the state by the store
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
