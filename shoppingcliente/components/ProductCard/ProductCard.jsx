import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";

const ProductCard = ({ item, addToCart }) => {
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
        <button onClick={() => addToCart(item.id)}>Add to cart</button>
        <p>$ {item.price}</p>
      </div>
    </div>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(null, mapDispatchToProp)(ProductCard);
