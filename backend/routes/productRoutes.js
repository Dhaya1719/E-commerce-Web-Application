const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, adminMiddleware } = require('./userRoutes');

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, price, image, category, stock } = req.body;
  try {
    const product = new Product({ name, price, image, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
