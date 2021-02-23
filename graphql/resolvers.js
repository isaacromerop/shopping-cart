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
      const { total, products, customerId, address, phone, email } = input;
      try {
        const order = await Orders.create({
          total,
          products,
          customerId,
          address,
          phone,
          email,
        });
        return order;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
