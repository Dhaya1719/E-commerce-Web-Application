// 📁 backend/controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/cart');

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  const total = cart.products.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

  const newOrder = new Order({
    userId: cart.userId,
    products: cart.products,
    totalAmount: total
  });

  await newOrder.save();
  cart.products = [];
  await cart.save();

  res.status(201).json(newOrder);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};
