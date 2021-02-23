import * as actionTypes from "./shopping-types";
import Cookie from "js-cookie";

const cookie = Cookie.getJSON("cart");

const initialState = {
  products: [],
  cart: cookie || [],
  currentOrder: null,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.ADD_TO_CART:
      // Get item from products
      const item = state.products.find((prod) => prod.id === action.payload.id);
      // Check if is already in cart
      const inCart = state.cart.find((prod) =>
        prod.id === item.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: (item.qty += 1) }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== action.payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, qty: +action.payload.value }
            : prod
        ),
      };
    case actionTypes.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default shopReducer;
