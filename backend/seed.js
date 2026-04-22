const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/event-management').then(async () => {
  const admin = await User.findOne({ email: 'admin@system.com' });
  if (!admin) {
    await User.create({ name: 'Admin', email: 'admin@system.com', password: 'Admin', role: 'Admin' });
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
}).catch(err => console.log(err));
