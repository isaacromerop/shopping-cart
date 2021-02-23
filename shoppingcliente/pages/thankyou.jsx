import React from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { scaleUp } from "../styles/animations";

const Thankyou = ({ currentOrder }) => {
  const router = useRouter();
  return currentOrder ? (
    <Layout>
      <motion.div
        className="thank-container"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
      >
        <div className="thank-content">
          <h1>Thank you for your purchase!</h1>
          <p>
            {`${currentOrder.name}, we have created your order ${currentOrder.id}. Your items will be soon at
            your door.`}
          </p>
          <button onClick={() => router.push("/")}>Start again</button>
        </div>
      </motion.div>
    </Layout>
  ) : (
    <Layout>
      <motion.div className="thank-container" variants={scaleUp}>
        <div className="thank-content">
          <h1>No orders placed.</h1>
          <p>Follow next button to place an order:</p>
          <button onClick={() => router.push("/")}>Place order</button>
        </div>
      </motion.div>
    </Layout>
  );
};

const mapStateToProp = (state) => {
  return {
    currentOrder: state.shop.currentOrder,
  };
};

export default connect(mapStateToProp)(Thankyou);
