import React from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="nav-container">
      <div onClick={() => router.push("/")}>
        <span>
          <img
            src="/icons/astronauta.svg"
            alt="brand-logo"
            width="40px"
          />
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
          <span>1</span>
        </button>
      ) : null}
    </div>
  );
};

export default NavBar;
