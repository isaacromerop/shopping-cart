import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import { useQuery, gql } from "@apollo/client";
import { connect } from "react-redux";
import { setProducts } from "../redux/Shopping/shopping-actions";
import { scaleUp } from "../styles/animations";
import { motion } from "framer-motion";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      description
      category
    }
  }
`;

const Home = ({ setProducts }) => {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  if (loading) return <h1>Loading...</h1>;

  if (data && data.getProducts) {
    setProducts(data.getProducts);
  }

  const inedxOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = inedxOfLastItem - itemsPerPage;
  const currentItem = data.getProducts.slice(indexOfFirstItem, inedxOfLastItem);
  //Change page
  const paginate = (number) => setCurrentPage(number);

  return (
    <Layout>
      <motion.div
        className="content-container"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
      >
        {data &&
          data.getProducts &&
          currentItem.map((item) => <ProductCard key={item.id} item={item} />)}
      </motion.div>
      <div className="pagination-container">
        <Pagination
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          totalItems={data.getProducts.length}
        />
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (data) => dispatch(setProducts(data)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
