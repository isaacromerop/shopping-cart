import React from "react";
import NavBar from "../NavBar/NavBar";
import Head from "next/head";
import { motion } from "framer-motion";
import { showUp } from "../../styles/animations";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <motion.main variants={showUp} initial="hidden" animate="visible">
        <div className="main-container">
          <NavBar />
          {children}
        </div>
      </motion.main>
    </>
  );
};

export default Layout;
