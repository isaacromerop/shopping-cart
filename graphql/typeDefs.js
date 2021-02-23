const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    price: Float
    description: String
    category: Int
    createdAt: String
    updatedAt: String
  }
  type Order {
    id: ID
    products: Int
    total: Float
    createdAt: String
    updatedAt: String
  }

  input OrderInput {
    products: Int
    total: Float
    customerId: Int
    address: String
    phone: Int
    email: String
  }

  type Query {
    getProducts: [Product]
  }
  type Mutation {
    placeOrder(input: OrderInput): Order
  }
`;

module.exports = typeDefs;
