import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { appearUp } from "../../styles/animations";

const NavBar = ({ cart }) => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);
  return (
    <motion.div
      className="nav-container"
      variants={appearUp}
      initial="hidden"
      animate="visible"
    >
      <div onClick={() => router.push("/")}>
        <span>
          <img src="/icons/astronauta.svg" alt="brand-logo" width="40px" />
        </span>
        Fast Shopping
      </div>
      {router.pathname === "/" ? (
        <button onClick={() => router.push("/cart")}>
          <img
            src="/icons/shopping-cart.svg"
            alt="shopping-cart"
            width="40px"
          />
          <span>{cartCount}</span>
        </button>
      ) : null}
    </motion.div>
  );
};

const mapStateToProp = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProp)(NavBar);
