import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById, createOrder, verifyPayment } from '../utils/api';
import backgroundImage from '../assets/4.jpg';

const BuyNowForm = ({ user }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    gender: '',
    address: '',
    quantity: 100,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await getListingById(productId);
        setListing(data);
      } catch (error) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to place an order.');
      navigate('/login');
      return;
    }
    if (user.role !== 'consumer') {
      alert('Only consumers can place orders.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        listingId: productId,
        quantity: parseInt(formData.quantity),
        consumerDetails: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address,
        },
      };
      const { data } = await createOrder(orderData, localStorage.getItem('token'));
      const { order, razorpayOrder } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Farmers Market',
        description: `Order for ${listing.name}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const verifyData = {
              orderId: razorpayOrder.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };
            await verifyPayment(verifyData, localStorage.getItem('token'));
            alert('Payment successful! Order confirmed.');
            navigate('/consumer');
          } catch (error) {
            setError('Payment verification failed.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#34D399' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="text-center p-4">Please log in.</div>;
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-xl bg-gray-600/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 border border-white/30">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-md">
          Buy {listing?.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            title="Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          >
            <option value="" className="bg-white text-black">Select Gender</option>
            <option value="male" className="bg-white text-black">Male</option>
            <option value="female" className="bg-white text-black">Female</option>
            <option value="other" className="bg-white text-black">Other</option>
          </select>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (kg)"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            max={listing?.quantity}
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-2 font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] ${
              isSubmitting
                ? 'bg-green-300 text-white cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-green-400'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing...
              </div>
            ) : (
              '🚀 Proceed to Payment'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyNowForm;
