const { Products, Orders } = require("../models");

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const products = await Products.findAll();
        return products;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    placeOrder: async (_, { input }) => {
      const {
        total,
        products,
        customerId,
        address,
        phone,
        email,
        name,
      } = await input;
      try {
        const order = await Orders.create({
          products,
          total,
          customerId,
          address,
          phone,
          email,
          name,
        });
        return order;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
