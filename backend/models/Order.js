const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Received', 'Ready for Shipping', 'Out For Delivery'], default: 'Pending' },
  name: String,
  email: String,
  number: String,
  address: String,
  city: String,
  state: String,
  pinCode: String,
  paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
