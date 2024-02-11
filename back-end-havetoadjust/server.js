// backend/server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shipAddressRoutes = require('./routes/shipAddressRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Use routers
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/ship_addresses', shipAddressRoutes);
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});