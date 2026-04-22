const mongoose = require('mongoose');

const guestListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  status: { type: String, enum: ['Attending', 'Not Attending', 'Pending'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('GuestList', guestListSchema);
