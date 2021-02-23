import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    uri: "http://localhost:4000",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
