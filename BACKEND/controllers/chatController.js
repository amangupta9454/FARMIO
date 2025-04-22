const Chat = require('../models/Chat');
const Listing = require('../models/Listing');

const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      listing: req.params.listingId,
      $or: [{ farmer: req.user.id }, { consumer: req.user.id }],
    }).populate('messages.sender', 'name');
    res.json(chat || { messages: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat', error });
  }
};

const sendMessage = async (req, res) => {
  const { message } = req.body;
  try {
    let chat = await Chat.findOne({ listing: req.params.listingId, consumer: req.user.id });
    if (!chat) {
      const listing = await Listing.findById(req.params.listingId);
      chat = new Chat({
        listing: req.params.listingId,
        farmer: listing.farmer,
        consumer: req.user.id,
        messages: [],
      });
    }
    chat.messages.push({ sender: req.user.id, content: message });
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

module.exports = { getChat, sendMessage };