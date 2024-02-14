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

const getCartByUserId = async (userId) => {
  const shoppingCart = await prisma.shoppingCart.findFirst({
    where: {
      userId: userId,
    },
  });
  return shoppingCart;
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

const addCartItemByCartId = async (data) => {
  const item =  prisma.shoppingCartItem.upsert({
    where: {
      productId_shoppingCartId : { productId: data.productId, shoppingCartId: data.shoppingCartId}
    },
    update: {
      quantity: {
        increment: data.quantity
      }
    },
    create: data,
  });
  return item
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
  getCartByUserId,
  addCartItemByCartId
};
