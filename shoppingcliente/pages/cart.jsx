import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import ProductDetail from "../components/ProductCard/ProductDetail.jsx/ProductDetail";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { setCurrentOrder, clearCart } from "../redux/Shopping/shopping-actions";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { scaleUp } from "../styles/animations";
import { motion } from "framer-motion";

const PLACE_ORDER = gql`
  mutation placeOrder($input: OrderInput) {
    placeOrder(input: $input) {
      id
      products
      total
    }
  }
`;

const Cart = ({ cart, setCurrentOrder, clearCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [placeOrder] = useMutation(PLACE_ORDER);
  const router = useRouter();

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.price;
    });
    setTotalPrice(price);
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart, totalPrice, setTotalPrice]);

  const formik = useFormik({
    initialValues: {
      products: cart.length,
      total: totalPrice,
      customerId: "",
      address: "",
      phone: "",
      email: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide your name."),
      customerId: Yup.string().required("Please provide your id."),
      address: Yup.string().required("Please provide your address."),
      phone: Yup.number("Phone must be numeric.").required(
        "Please provide your phone."
      ),
      email: Yup.string()
        .email("Please provide valid email.")
        .required("Please provide your email."),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await placeOrder({
          variables: {
            input: {
              products: values.products,
              total: values.total,
              customerId: values.customerId,
              address: values.address,
              phone: values.phone,
              email: values.email,
              name: values.name,
            },
          },
        });
        setCurrentOrder(data.placeOrder.id, values.name);
        Cookie.remove("cart");
        setTimeout(() => {
          router.push("/thankyou");
          clearCart();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return cart.length > 0 ? (
    <Layout>
      <motion.div
        className="cart-container"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
      >
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
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <p>Customer Information</p>
                </div>
                <div className="field">
                  <label htmlFor="name">Full name:</label>
                  <input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="error-message">
                    <h6 className="error">{formik.errors.name}</h6>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="customerId">ID:</label>
                  <input
                    name="customerId"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.customerId}
                  />
                </div>
                {formik.touched.customerId && formik.errors.customerId && (
                  <div className="error-message">
                    <h6 className="error">{formik.errors.customerId}</h6>
                  </div>
                )}
                <div className="field address">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                </div>
                {formik.touched.address && formik.errors.address && (
                  <div className="error-message">
                    <h6 className="error">{formik.errors.address}</h6>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="phone">Phone number:</label>
                  <input
                    type="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="error-message">
                    <h6 className="error">{formik.errors.phone}</h6>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">
                    <h6 className="error">{formik.errors.email}</h6>
                  </div>
                )}
                <div className="field">
                  <button type="submit">Place Order</button>
                  <button>
                    <a href="#list">Back to list</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  ) : (
    <Layout>
      <div className="thank-container">
        <div className="thank-content">
          <h1>There are not items in your cart.</h1>
          <p>Follow next button to select items:</p>
          <button onClick={() => router.push("/")}>Select Items</button>
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

const mapDispatchToProp = (dispatch) => {
  return {
    setCurrentOrder: (id, name) => dispatch(setCurrentOrder(id, name)),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Cart);
