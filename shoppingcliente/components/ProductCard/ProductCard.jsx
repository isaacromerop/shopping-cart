import React from "react";

const ProductCard = ({ item }) => {
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
        <button>Add to cart</button>
        <p>$ {item.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
