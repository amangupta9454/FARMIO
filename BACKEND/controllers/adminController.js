const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Admin = require('../models/admin');
const AdminOtp = require('../models/adminOtp');
const User = require('../models/User');
const Listing = require('../models/Listing');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendAdminOtp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const otp = generateOtp();
    await AdminOtp.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Login OTP - Farmers Market',
      html: `<h2>Admin Login</h2><p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

exports.verifyAdminOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await AdminOtp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const admin = await Admin.findOne({ email });
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await AdminOtp.deleteOne({ email });
    res.json({ message: 'Login successful', token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const farmers = await User.countDocuments({ role: 'farmer' });
    const consumers = await User.countDocuments({ role: 'consumer' });
    const listings = await Listing.countDocuments();
    res.json({ farmers, consumers, listings });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};

exports.getFarmers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const query = { role: 'farmer', name: { $regex: search, $options: 'i' } };
    const farmers = await User.find(query)
      .select('name email status')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await User.countDocuments(query);
    res.json({ farmers, total });
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ message: 'Error fetching farmers', error: error.message });
  }
};

exports.getConsumers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const query = { role: 'consumer', name: { $regex: search, $options: 'i' } };
    const consumers = await User.find(query)
      .select('name email status')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await User.countDocuments(query);
    res.json({ consumers, total });
  } catch (error) {
    console.error('Error fetching consumers:', error);
    res.status(500).json({ message: 'Error fetching consumers', error: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: `${role} added successfully` });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'blocked';
    await user.save();
    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ message: 'Error blocking user', error: error.message });
  }
};

exports.unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'active';
    await user.save();
    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ message: 'Error unblocking user', error: error.message });
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ message: 'Error removing user', error: error.message });
  }
};

exports.getRecentListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('farmer', 'name');
   
    res.json(listings);
  } catch (error) {
    console.error('Error fetching recent listings:', error);
    res.status(500).json({ message: 'Error fetching recent listings', error: error.message });
  }
};