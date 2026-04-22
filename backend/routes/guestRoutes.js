const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'User') next();
  else res.status(403).json({ message: 'Forbidden' });
};

router.use(isUser);

router.get('/', async (req, res) => {
  const guests = await Guest.find({ userId: req.session.user.id });
  res.json(guests);
});

router.post('/', async (req, res) => {
  const guest = new Guest({ ...req.body, userId: req.session.user.id });
  await guest.save();
  res.status(201).json(guest);
});

router.put('/:id', async (req, res) => {
  const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(guest);
});

router.delete('/:id', async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
