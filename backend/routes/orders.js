// 📁 backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

router.post('/:userId', placeOrder);
router.get('/:userId', getOrders);

module.exports = router;