const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  status: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
