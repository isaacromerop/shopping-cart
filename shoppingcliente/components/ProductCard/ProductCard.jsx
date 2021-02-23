import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import Cookie from "js-cookie";

const ProductCard = ({ item, addToCart, cart }) => {
  const handleAdd = () => {
    Cookie.set("cart", JSON.stringify(cart));
    addToCart(item.id);
  };

  return (
    <div className="product-card">
      <div className="card-title">
        <p>{item.name}</p>
        <p className="desc">{item.category}</p>
      </div>
      <div className="cart-desc">
        <p>{item.description}</p>
      </div>
      <div className="card-footer">
        <button onClick={handleAdd}>Add to cart</button>
        <p>$ {item.price}</p>
      </div>
    </div>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

const mapStateToProp = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(ProductCard);
