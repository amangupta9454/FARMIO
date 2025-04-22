const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const orderRoutes = require('./routes/orders');
const chatRoutes = require('./routes/chats');
const adminRoutes = require('./routes/admin');
const priceRoutes = require('./routes/prices');
const cron = require('./cronJob');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/prices', priceRoutes);

io.on('connection', (socket) => {
  socket.on('joinChat', ({ listingId, userId }) => {
    socket.join(listingId);
  });

  socket.on('sendMessage', ({ listingId, userId, message }) => {
    io.to(listingId).emit('message', { userId, message, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
app.get("/", (req, res) => {
  res.send({"msg": "BACKEND HOSTED SUCCESSFULLY"});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));