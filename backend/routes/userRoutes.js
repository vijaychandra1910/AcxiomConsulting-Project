const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const GuestList = require('../models/GuestList');

const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'User') next();
  else res.status(403).json({ message: 'Forbidden' });
};

router.use(isUser);

// Get vendors, optionally filtered by category
router.get('/vendors', async (req, res) => {
  const query = { role: 'Vendor' };
  if (req.query.category) query.category = req.query.category;
  const vendors = await User.find(query);
  res.json(vendors);
});

// Get products for a specific vendor
router.get('/products/:vendorId', async (req, res) => {
  const products = await Product.find({ vendorId: req.params.vendorId });
  res.json(products);
});

// Get all products from all vendors
router.get('/all-products', async (req, res) => {
  try {
    const products = await Product.find().populate('vendorId', 'name category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { vendorId, items, totalAmount, ...details } = req.body;
    const order = new Order({ 
      userId: req.session.user.id, 
      vendorId, 
      items, 
      totalAmount,
      ...details 
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find({ userId: req.session.user.id })
    .populate('vendorId', 'name category')
    .populate('items')
    .sort({ createdAt: -1 });
  res.json(orders);
});

router.put('/orders-status/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/guests', async (req, res) => {
  const guests = await GuestList.find({ userId: req.session.user.id });
  res.json(guests);
});

router.post('/guests', async (req, res) => {
  const guest = new GuestList({ ...req.body, userId: req.session.user.id });
  await guest.save();
  res.status(201).json(guest);
});

router.put('/guests/:id', async (req, res) => {
  const guest = await GuestList.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(guest);
});

router.delete('/guests/:id', async (req, res) => {
  await GuestList.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.post('/requests', async (req, res) => {
  try {
    const RequestModel = require('../models/Request');
    const request = new RequestModel({ ...req.body, userId: req.session.user.id });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
