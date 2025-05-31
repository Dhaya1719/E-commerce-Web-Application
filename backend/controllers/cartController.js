// 📁 backend/controllers/cartController.js
const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [] });
  }

  const existingProduct = cart.products.find(p => p.productId == productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  const cart = await Cart.findOne({ userId });
  cart.products = cart.products.filter(p => p.productId != productId);
  await cart.save();
  res.json(cart);
};