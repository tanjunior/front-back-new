// order.routes.js
const express = require("express");
const router = express.Router();
const orderService = require("../services/order.service");

// Create a new order
router.post("/new", async (req, res) => {
  const data = req.body
  // console.log(req.body);
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
});

// Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error getting orders" });
  }
});

// Get a order by ID
router.get("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error getting order" });
  }
});

// Update a order by ID
router.put("/update/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const updatedOrder = await orderService.updateOrderById(orderId, req.body);

    if (!updatedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
});

// Delete a order by ID
router.delete("/delete/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const deletedOrder = await orderService.deleteOrderById(orderId);

    if (!deletedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
});

module.exports = router;
