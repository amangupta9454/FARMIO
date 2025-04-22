const Order = require('../models/Order');
const Listing = require('../models/Listing');
const ConsumerDetails = require('../models/ConsumerDetails');
const User = require('../models/User');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createOrder = async (req, res) => {
  const { listingId, quantity, consumerDetails } = req.body;
  try {
    if (req.user.role !== 'consumer') return res.status(403).json({ message: 'Only consumers can place orders' });
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.quantity < quantity) return res.status(400).json({ message: 'Insufficient quantity' });

    const totalPrice = quantity * listing.price;
    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    const order = new Order({
      listing: listingId,
      consumer: req.user.id,
      farmer: listing.farmer,
      quantity,
      totalPrice,
      paymentDetails: {
        razorpayOrderId: razorpayOrder.id,
        amount: totalPrice,
      },
    });
    await order.save();

    const consumerInfo = new ConsumerDetails({
      order: order._id,
      name: consumerDetails.name,
      email: consumerDetails.email,
      mobile: consumerDetails.mobile,
      age: consumerDetails.age,
      gender: consumerDetails.gender,
      address: consumerDetails.address,
    });
    await consumerInfo.save();

    listing.quantity -= quantity;
    await listing.save();

    res.status(201).json({ order, razorpayOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
  try {
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const order = await Order.findOne({ 'paymentDetails.razorpayOrderId': orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentDetails.razorpayPaymentId = razorpayPaymentId;
    order.status = 'confirmed';
    await order.save();

    const consumerDetails = await ConsumerDetails.findOne({ order: order._id });
    const listing = await Listing.findById(order.listing).populate('farmer', 'name');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consumerDetails.email,
      subject: 'Order Confirmation - Farmers Market',
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your purchase!</p>
        <h3>Order Details</h3>
        <table border="1" cellpadding="5">
          <tr><th>Produce</th><td>${listing.name}</td></tr>
          <tr><th>Quantity</th><td>${order.quantity} kg</td></tr>
          <tr><th>Total Price</th><td>₹${order.totalPrice}</td></tr>
          <tr><th>Status</th><td>${order.status}</td></tr>
          <tr><th>Razorpay Payment ID</th><td>${razorpayPaymentId}</td></tr>
          <tr><th>Order Date</th><td>${new Date(order.createdAt).toLocaleString()}</td></tr>
        </table>
        <h3>Consumer Details</h3>
        <table border="1" cellpadding="5">
          <tr><th>Name</th><td>${consumerDetails.name}</td></tr>
          <tr><th>Email</th><td>${consumerDetails.email}</td></tr>
          <tr><th>Mobile</th><td>${consumerDetails.mobile}</td></tr>
          <tr><th>Age</th><td>${consumerDetails.age}</td></tr>
          <tr><th>Gender</th><td>${consumerDetails.gender}</td></tr>
          <tr><th>Address</th><td>${consumerDetails.address}</td></tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Payment verified and order confirmed', order });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    let orders = [];
    if (req.user.role === 'farmer') {
      orders = await Order.find({ farmer: req.user.id })
        .populate('listing', 'name price')
        .populate('consumer', 'name email')
        .lean();
      for (let order of orders) {
        const consumerDetails = await ConsumerDetails.findOne({ order: order._id }).lean();
        order.consumerDetails = consumerDetails || {};
      }
    } else {
      orders = await Order.find({ consumer: req.user.id })
        .populate('listing', 'name price')
        .populate('consumer', 'name email')
        .lean();
      for (let order of orders) {
        const consumerDetails = await ConsumerDetails.findOne({ order: order._id }).lean();
        order.consumerDetails = consumerDetails || {};
      }
    }
    console.log('Returning orders:', orders); // Debug backend response
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const acceptOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can accept orders' });
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.farmer.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    if (order.status !== 'confirmed') return res.status(400).json({ message: 'Order cannot be accepted' });

    order.status = 'accepted';
    await order.save();

    const consumerDetails = await ConsumerDetails.findOne({ order: order._id });
    const listing = await Listing.findById(order.listing);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consumerDetails.email,
      subject: 'Order Accepted - Farmers Market',
      html: `
        <h2>Order Accepted</h2>
        <p>Your order for ${listing.name} has been accepted by the farmer.</p>
        <p>Quantity: ${order.quantity} kg</p>
        <p>Total Price: ₹${order.totalPrice}</p>
        <p>Order Date: ${new Date(order.createdAt).toLocaleString()}</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Order accepted successfully', order });
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ message: 'Error accepting order', error: error.message });
  }
};

const rejectOrder = async (req, res) => {
  const { orderId, rejectionMessage } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can reject orders' });
    if (!rejectionMessage) return res.status(400).json({ message: 'Rejection message is required' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.farmer.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    if (order.status !== 'confirmed') return res.status(400).json({ message: 'Order cannot be rejected' });

    order.status = 'rejected';
    order.rejectionMessage = rejectionMessage;
    await order.save();

    const consumerDetails = await ConsumerDetails.findOne({ order: order._id });
    const listing = await Listing.findById(order.listing);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consumerDetails.email,
      subject: 'Order Rejected - Farmers Market',
      html: `
        <h2>Order Rejected</h2>
        <p>Your order for ${listing.name} has been rejected by the farmer.</p>
        <p>Reason: ${rejectionMessage}</p>
        <p>Quantity: ${order.quantity} kg</p>
        <p>Total Price: ₹${order.totalPrice}</p>
        <p>Order Date: ${new Date(order.createdAt).toLocaleString()}</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Order rejected successfully', order });
  } catch (error) {
    console.error('Error rejecting order:', error);
    res.status(500).json({ message: 'Error rejecting order', error: error.message });
  }
};

const getEarnings = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can view earnings' });
    
    // Fetch all orders for totalOrderAmount (all statuses)
    const allOrders = await Order.find({ farmer: req.user.id });
    const totalOrderAmount = allOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Existing logic for totalEarnings (only completed orders)
    const completedOrders = await Order.find({ farmer: req.user.id, status: 'completed' });
    const totalEarnings = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    const weeklyEarnings = [];
    const monthlyEarnings = [];
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dayEarnings = completedOrders
        .filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((sum, order) => sum + order.totalPrice, 0);
      weeklyEarnings.push({ date: date.toLocaleDateString(), earnings: dayEarnings });
    }

    for (let i = 0; i < 30; i++) {
      const date = new Date(oneMonthAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dayEarnings = completedOrders
        .filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((sum, order) => sum + order.totalPrice, 0);
      monthlyEarnings.push({ date: date.toLocaleDateString(), earnings: dayEarnings });
    }

    res.json({ totalEarnings, totalOrderAmount, weeklyEarnings, monthlyEarnings });
  } catch (error) {
    console.error('Error fetching earnings:', error);
    res.status(500).json({ message: 'Error fetching earnings', error: error.message });
  }
};

module.exports = { createOrder, verifyPayment, getOrders, acceptOrder, rejectOrder, getEarnings };