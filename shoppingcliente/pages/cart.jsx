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
        .email("please provide valid email.")
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
        clearCart();
        Cookie.remove("cart");
        setCurrentOrder(data.placeOrder.id, values.name);
        router.push("/thankyou");
      } catch (error) {
        console.log(error);
      }
    },
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
