import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import ProductDetail from "../components/ProductCard/ProductDetail.jsx/ProductDetail";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.price;
    });
    setTotalPrice(price);
  }, [cart, totalPrice, setTotalPrice]);

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide your name."),
      id: Yup.string().required("Please provide your id."),
      address: Yup.string().required("Please provide your address."),
      phone: Yup.number().required("Please provide your phone."),
      email: Yup.string()
        .email("please provide valid email.")
        .required("Please provide your email."),
    }),
  });

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-title">
          <h2>Shopping Cart</h2>
        </div>
        <div id="list" className="cart-content">
          {cart.map((prod) => (
            <ProductDetail key={prod.id} prod={prod} />
          ))}
        </div>
        <div className="cart-total">
          <p>Total: $ {totalPrice}</p>
        </div>
        <div className="form">
          <div>
            <div className="form-header">
              <p>Ready to Order?</p>
            </div>
            <div className="form-content">
              <form>
                <div>
                  <p>Customer Information</p>
                </div>
                <div className="field">
                  <label htmlFor="name">Full name:</label>
                  <input name="name" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="id">ID:</label>
                  <input name="id" type="text" />
                </div>
                <div className="field address">
                  <label htmlFor="address">Address:</label>
                  <textarea name="address" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone number:</label>
                  <input type="text" name="email" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" />
                </div>
                <div className="field">
                  <button>Place Order</button>
                  <button>
                    <a href="#list">Back to list</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProp = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProp)(Cart);
