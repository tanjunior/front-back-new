// cart.service.js
const prisma = require('../db')

// Create a new cart
const createCart = async (data) => {
  return prisma.shoppingCart.create({
    data,
  });
};

// Get all carts
const getAllCarts = async () => {
  return prisma.shoppingCart.findMany();
};

// Get a cart by ID
const getCartById = async (id) => {
  return prisma.shoppingCart.findUnique({
    where: {
      id,
    },
  });
};

// Update a cart by ID
const updateCartById = async (id, data) => {
  return prisma.shoppingCart.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a cart by ID
const deleteCartById = async (id) => {
  return prisma.shoppingCart.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCartById,
  deleteCartById,
};
