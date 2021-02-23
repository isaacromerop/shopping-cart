import React from "react";
import { removeFromCart } from "../../../redux/Shopping/shopping-actions";
import { connect } from "react-redux";

const ProductDetail = ({ prod, removeFromCart }) => {
  return (
    <div className="detail-container">
      <div className="detail-title">
        <h3>{prod.name}</h3>
        <p>{prod.category}</p>
      </div>
      <div className="detail-content">
        <div className="unit-price">
          <p>$ {prod.price}</p>
        </div>
        <div className="qty">
          <input type="number" min="1" value="1" />
          <span onClick={() => removeFromCart(prod.id)}>
            <img src="/icons/trash-bin.svg" width="30px" alt="waste-bin" />
          </span>
        </div>
        <div className="total">
          <p>$ 208.00</p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    removeFromCart: (id) => {
      dispatch(removeFromCart(id));
    },
  };
};

export default connect(null, mapDispatchToProp)(ProductDetail);
