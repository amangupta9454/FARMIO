import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const sendAdminOtp = (data) => api.post('/admin/send-otp', data);
export const verifyAdminOtp = (data) => api.post('/admin/verify-otp', data);
export const getAnalytics = (token) => api.get('/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
export const getFarmers = (params, token) => api.get('/admin/farmers', { params, headers: { Authorization: `Bearer ${token}` } });
export const getConsumers = (params, token) => api.get('/admin/consumers', { params, headers: { Authorization: `Bearer ${token}` } });
export const addUser = (data, token) => api.post('/admin/users', data, { headers: { Authorization: `Bearer ${token}` } });
export const blockUser = (id, token) => api.put(`/admin/users/block/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const unblockUser = (id, token) => api.put(`/admin/users/unblock/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const removeUser = (id, token) => api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getRecentListings = (token) => api.get('/admin/recent-listings', { headers: { Authorization: `Bearer ${token}` } });
export const sendOtp = (data) => api.post('/users/send-otp', data);
export const verifyOtp = (data) => api.post('/users/verify-otp', data);
export const register = (data) => api.post('/users/register', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const login = (data) => api.post('/users/login', data);
export const createListing = (data, token) => api.post('/listings', data, { headers: { Authorization: `Bearer ${token}` } });
export const getListings = (params) => api.get('/listings', { params });
export const getListingById = (id) => api.get(`/listings/${id}`);
export const createOrder = (data, token) => api.post('/orders', data, { headers: { Authorization: `Bearer ${token}` } });
export const getOrders = async (token) => {
  try {
    const res = await api.get('/orders', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (error) {
    console.error('getOrders error:', error);
    return [];
  }
};
export const acceptOrder = (data, token) => api.post('/orders/accept', data, { headers: { Authorization: `Bearer ${token}` } });
export const rejectOrder = (data, token) => api.post('/orders/reject', data, { headers: { Authorization: `Bearer ${token}` } });
export const getEarnings = (token) => api.get('/orders/earnings', { headers: { Authorization: `Bearer ${token}` } });
export const createPayment = (data, token) => api.post('/orders/create-payment', data, { headers: { Authorization: `Bearer ${token}` } });
export const verifyPayment = (data, token) => api.post('/orders/verify-payment', data, { headers: { Authorization: `Bearer ${token}` } });
export const getChat = (listingId, token) => api.get(`/chats/${listingId}`, { headers: { Authorization: `Bearer ${token}` } });
export const sendMessage = (listingId, data, token) => api.post(`/chats/${listingId}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteListing = (id, token) => api.delete(`/listings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getUserProfile = (token) => api.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
export const updateUpiId = (data, token) => api.post('/users/update-upi', data, { headers: { Authorization: `Bearer ${token}` } });
export const requestWithdrawal = (data, token) => api.post('/users/request-withdrawal', data, { headers: { Authorization: `Bearer ${token}` } });
export const sendResetOtp = (data) => api.post('/users/send-reset-otp', data);
export const verifyResetOtp = (data) => api.post('/users/verify-reset-otp', data);
export const resetPassword = (data) => api.post('/users/reset-password', data);
export const getWeather = (data) => api.post('/weather', data);
export const getPrices = (params) => api.get('/prices', { params });