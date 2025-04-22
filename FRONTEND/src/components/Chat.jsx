import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getChat, sendMessage } from '../utils/api';

const socket = io('https://farmer-consumer-market.onrender.com');

const Chat = ({ user, listingId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('joinChat', { listingId, userId: user.id });
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    const fetchChat = async () => {
      try {
        const { data } = await getChat(listingId, localStorage.getItem('token'));
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };
    fetchChat();

    return () => socket.off('message');
  }, [listingId, user.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await sendMessage(listingId, { message: newMessage }, localStorage.getItem('token'));
      socket.emit('sendMessage', { listingId, userId: user.id, message: newMessage });
      setNewMessage('');
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === user.id ? 'text-right' : 'text-left'}`}>
            <span className="font-bold">{msg.sender === user.id ? 'You' : 'Other'}: </span>
            {msg.content}
            <span className="text-xs text-gray-500 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Chat;