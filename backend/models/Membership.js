const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true }, // in months: 6, 12, 24
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Cancelled', 'Expired'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
