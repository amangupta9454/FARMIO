import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ListingForm from './components/ListingForm';
import Chat from './components/Chat';
import OrderSummary from './components/OrderSummary';
import BuyNowForm from './components/BuyNowForm';
import ErrorBoundary from './components/ErrorBoundary';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import WeatherApp from './components/WeatherApp';
import PriceTransparency from './components/PriceTransparency';
import AdminLogin from './components/AdminLogin';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser({ id: payload.id, role: payload.role });
        } else {
          localStorage.removeItem('adminToken');
        }
      } catch (error) {
        console.error('Token parsing error:', error);
        localStorage.removeItem('adminToken');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/product" element={<Products />} />
          <Route path="/wheather" element={<WeatherApp />} />
          <Route path="/prices" element={<PriceTransparency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/farmer"
            element={
              user && user.role === 'farmer' ? (
                <FarmerDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/consumer"
            element={
              user && user.role === 'consumer' ? (
                <ConsumerDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/admin/login" element={<AdminLogin setUser={setUser} />} />
          <Route
            path="/admin/dashboard"
            element={
              user && user.role === 'admin' ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/admin/login" /> // Fixed redirect to /admin/login
              )
            }
          />
          <Route
            path="/listing/new"
            element={
              user && user.role === 'farmer' ? (
                <ListingForm user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/chat/:listingId" element={<Chat user={user} />} />
          <Route path="/order/:orderId" element={<OrderSummary user={user} />} />
          <Route
            path="/buy-now/:productId"
            element={
              user && user.role === 'consumer' ? (
                <BuyNowForm user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

const NotFound = () => <h1>404 - Page Not Found</h1>;

export default App;