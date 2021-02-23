import * as actionTypes from "./shopping-types";

const initialState = {
  products: [],
  cart: [],
  currentItem: null,
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
      return {};
    case actionTypes.LOAD_CURRENT_ITEM:
      return {};

    default:
      return state;
  }
};

export default shopReducer;
