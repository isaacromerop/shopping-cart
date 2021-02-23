import Layout from "../components/Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import { useQuery, gql } from "@apollo/client";

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

export default function Home() {
  const { data, loading } = useQuery(GET_PRODUCTS);
  if (loading) return <h1>Loading...</h1>;
  return (
    <Layout>
      <div className="content-container">
        {data &&
          data.getProducts &&
          data.getProducts.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </Layout>
  );
}
