import * as actionTypes from "./shopping-types";

export const setProducts = (data) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: data,
  };
};

export const addToCart = (id) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id,
    },
  };
};

export const removeFromCart = (id) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id,
    },
  };
};

export const adjustQty = (id, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id,
      value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
