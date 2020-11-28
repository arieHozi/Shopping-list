import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";
import { productReducer } from "../reducers/productReducer";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products"); //get all products from db

  const data = await res.json();

  dispatch({
    //then dispatch ation to change the state by the store
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => async (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => async (dispatch) => {
  const sortedPro = filteredProducts.slice();
  if (sort === "latest") {
    sortedPro.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedPro.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedPro,
    },
  });
};
