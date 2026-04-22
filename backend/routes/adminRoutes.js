const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Membership = require('../models/Membership');

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'Admin') next();
  else res.status(403).json({ message: 'Forbidden' });
};

router.use(isAdmin);

router.get('/users', async (req, res) => {
  const users = await User.find({ role: 'User' });
  res.json(users);
});

router.get('/vendors', async (req, res) => {
  const vendors = await User.find({ role: 'Vendor' });
  res.json(vendors);
});

router.post('/membership', async (req, res) => {
  const { vendorId, duration } = req.body;
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + Number(duration));
  const membership = new Membership({ vendorId, duration, endDate });
  await membership.save();
  res.status(201).json(membership);
});

router.put('/membership/:id', async (req, res) => {
  const { duration } = req.body;
  const membership = await Membership.findById(req.params.id);
  if (!membership) return res.status(404).json({ message: 'Not found' });
  
  membership.endDate.setMonth(membership.endDate.getMonth() + Number(duration));
  await membership.save();
  res.json(membership);
});

module.exports = router;
