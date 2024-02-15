// ship_address.service.js
const prisma = require('../db')


// Create a new ship address
const createShipAddress = async (data) => {
  return prisma.shippingAddress.create({
    data,
  });
};

// Get all ship addresss
const getAllShipAddresss = async () => {
  return prisma.shippingAddress.findMany();
};

// get all shipAddresss by user id
const getAllShipAddresssByUserId = async ({userId}) => {
  return prisma.shippingAddress.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getShipAddressById = async (id) => {
  return prisma.shippingAddress.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
const updateShipAddressById = async (id, data) => {
  return prisma.shippingAddress.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a ship address by ID
const deleteShipAddressById = async (id) => {
  return prisma.shippingAddress.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createShipAddress,
  getAllShipAddresss,
  getShipAddressById,
  updateShipAddressById,
  deleteShipAddressById,
  getAllShipAddresssByUserId
};
