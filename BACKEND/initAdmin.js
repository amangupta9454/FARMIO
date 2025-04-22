const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');
const connectDB = require('./config/db');

const initAdmin = async () => {
  await connectDB();
  const email = 'amangupta231294@gmail.com';
  const password = 'Amangupta@11';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, password: hashedPassword, name: 'Aman gupta', role: 'admin' },
    { upsert: true, new: true }
  );

  console.log('Admin initialized:', admin);
  mongoose.connection.close();
};

initAdmin();