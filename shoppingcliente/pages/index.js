import Layout from "../components/Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import { useQuery, gql } from "@apollo/client";
import { connect } from "react-redux";
import { setProducts } from "../redux/Shopping/shopping-actions";

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
  if (loading) return <h1>Loading...</h1>;

  if (data && data.getProducts) {
    setProducts(data.getProducts);
  }

  return (
    <Layout>
      <div className="content-container">
        {data &&
          data.getProducts &&
          data.getProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
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
