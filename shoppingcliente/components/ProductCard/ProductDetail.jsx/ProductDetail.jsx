import React, { useState } from "react";
import {
  removeFromCart,
  adjustQty,
} from "../../../redux/Shopping/shopping-actions";
import { connect } from "react-redux";

const ProductDetail = ({ prod, removeFromCart, adjustQty }) => {
  const [qty, setQty] = useState(prod.qty);

  const handleChange = (e) => {
    setQty(e);
    adjustQty(prod.id, e);
  };

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
          <input
            onChange={(e) => handleChange(e.target.value)}
            type="number"
            min="1"
            name="value"
            value={qty}
          />
          <span onClick={() => removeFromCart(prod.id)}>
            <img src="/icons/trash-bin.svg" width="30px" alt="waste-bin" />
          </span>
        </div>
        <div className="total">
          <p>$ {prod.qty * prod.price}</p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
  };
};

export default connect(null, mapDispatchToProp)(ProductDetail);
