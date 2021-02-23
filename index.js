const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const { sequelize } = require("./models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server started at port: ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log("Connected to database."))
    .catch((err) => console.log(err));
});
