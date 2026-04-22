const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const isVendor = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'Vendor') next();
  else res.status(403).json({ message: 'Forbidden' });
};

router.use(isVendor);

router.get('/products', async (req, res) => {
  const products = await Product.find({ vendorId: req.session.user.id });
  res.json(products);
});

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    const product = new Product({ 
      name, 
      price, 
      category, 
      image: imageUrl, 
      vendorId: req.session.user.id 
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    console.log('--- UPDATE REQUEST ---');
    console.log('ID:', req.params.id);
    console.log('Data:', req.body);
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name) product.name = name;
    if (price) product.price = Number(price);
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
      console.log('New image:', product.image);
    }

    await product.save();
    console.log('UPDATE SUCCESS:', product);
    res.json(product);
  } catch (err) {
    console.error('UPDATE FAIL:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find({ vendorId: req.session.user.id }).populate('items').populate('userId');
  res.json(orders);
});

router.put('/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
});

module.exports = router;
