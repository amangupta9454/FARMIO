import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createOrder, createPayment } from '../utils/api';

const OrderSummary = ({ user }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getOrders(localStorage.getItem('token'));
        const foundOrder = data.find((o) => o._id === orderId);
        setOrder(foundOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const { data } = await createPayment({ amount: order.totalPrice }, localStorage.getItem('token'));
      const options = {
        key: 'rzp_live_eSLs2mEbGvJCkX',
        key_secret: 'aU2xqyVSZ7SkVDi1w6Wl6h2u',
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        handler: async (response) => {
          await createOrder({ listingId: order.listing._id, quantity: order.quantity }, localStorage.getItem('token'));
          alert('Payment successful');
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Error processing payment');
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="border p-4 rounded">
        <p><strong>Product:</strong> {order.listing.name}</p>
        <p><strong>Quantity:</strong> {order.quantity} kg</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
        <p><strong>Status:</strong> {order.status}</p>
        {order.status === 'pending' && (
          <button onClick={handlePayment} className="mt-4 w-full bg-green-500 text-white p-2 rounded">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;