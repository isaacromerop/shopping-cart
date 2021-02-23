import React from "react";

const ProductDetail = () => {
  return (
    <div className="detail-container">
      <div className="detail-title">
        <h3>Title</h3>
        <p>Product Category</p>
      </div>
      <div className="detail-content">
        <div className="unit-price">
          <p>$ 104.00</p>
        </div>
        <div className="qty">
          <input type="number" min="1" value="1" />
          <span>
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

export default ProductDetail;
