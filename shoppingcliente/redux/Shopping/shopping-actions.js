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

export const setCurrentOrder = (id, name) => {
  return {
    type: actionTypes.SET_CURRENT_ORDER,
    payload: {
      id,
      name,
    },
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};
