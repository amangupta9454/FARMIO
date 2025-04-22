import React, { useState, useEffect } from 'react';
import { getOrders } from '../utils/api';
import ProfileSection from '../components/ProfileSection';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

const ConsumerDashboard = ({ user }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await getOrders(localStorage.getItem('token'));
      console.log('Consumer Orders Response:', response); // Debug API response
      const data = Array.isArray(response) ? response : [];
      setOrders(data.filter((order) => order.consumer._id === user.id) || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(t('consumerDashboard.error'));
      setOrders([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [user, t]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-900/60 to-blue-900/60 text-white text-lg sm:text-xl lg:text-2xl animate-pulse">
      {t('consumerDashboard.pleaseLogin')}
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-900/60 to-blue-900/60 text-red-400 text-lg sm:text-xl lg:text-2xl animate-pulse">
      {error}
    </div>
  );
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-900/60 to-blue-900/60">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-green-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[url('/src/assets/13.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="bg-gradient-to-b from-green-900/60 to-blue-900/60 min-h-screen">
        <div className="container max-w-5xl mx-auto p-4 sm:p-6 lg:p-12 pt-20 sm:pt-20 lg:pt-24 animate-fadeIn" aria-label={t('consumerDashboard.title')}>
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 lg:mb-8 relative" aria-labelledby="dashboard-title">
            <h2 id="dashboard-title" className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text text-center sm:text-left animate-gradient">
              {t('consumerDashboard.title')}
            </h2>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="mt-2 sm:mt-0 w-full sm:w-auto p-1.5 sm:p-2 lg:p-2.5 bg-gradient-to-br from-green-500/25 to-blue-500/25 text-white rounded-lg shadow-md backdrop-blur-xl border border-green-300/30 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-green-500/35 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] focus:ring-2 focus:ring-yellow-300 animate-slideUp z-10"
              aria-label={t('selectLanguage')}
              style={{ animationDelay: '200ms' }}
            >
              <option value="en" className="text-black">{t('language.english')}</option>
              <option value="hi" className="text-black">{t('language.hindi')}</option>
              <option value="ta" className="text-black">{t('language.tamil')}</option>
              <option value="bh" className="text-black">{t('language.bhojpuri')}</option>
              <option value="mr" className="text-black">{t('language.marathi')}</option>
              <option value="sa" className="text-black">{t('language.sanskrit')}</option>
              <option value="bn" className="text-black">{t('language.bengali')}</option>
            </select>
          </header>
          
          {/* Profile Section */}
          <ProfileSection user={user} />

          {/* Orders Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-10 text-center animate-gradient" aria-label={t('consumerDashboard.orders')}>
            {t('consumerDashboard.orders')}
          </h3>
          {orders.length === 0 ? (
            <p className="text-center text-white text-xs sm:text-sm lg:text-base animate-pulse">
              {t('consumerDashboard.noOrders')}
            </p>
          ) : (
            <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="backdrop-blur-3xl bg-gradient-to-br from-green-500/25 to-blue-500/25 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-[0_4px_20px_rgba(34,197,94,0.4)] border border-green-300/30 transform transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:bg-green-500/35 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.produce')}:</strong> {order.listing?.name || t('consumerDashboard.na')}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.quantity')}:</strong> {order.quantity} kg
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.totalPrice')}:</strong> ₹{order.totalPrice}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.status')}:</strong> {order.status}
                    </p>
                    {order.status === 'rejected' && order.rejectionMessage && (
                      <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                        <strong className="text-white">{t('consumerDashboard.rejectionReason')}:</strong> {order.rejectionMessage}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.paymentId')}:</strong> {order.paymentDetails?.razorpayPaymentId || t('consumerDashboard.pending')}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('consumerDashboard.orderDate')}:</strong> {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;