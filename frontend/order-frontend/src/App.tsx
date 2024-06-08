import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import OrderForm from './components/OrderForm';
import Checkout from './components/Checkout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      navigate('/order');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/order');
  };

  const handleCheckout = (order: any) => {
    setOrder(order);
    navigate('/checkout');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/order" /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/order"
        element={isAuthenticated ? <OrderForm onCheckout={handleCheckout} /> : <Navigate to="/login" />}
      />
      <Route
        path="/checkout"
        element={order ? <Checkout order={order} /> : <Navigate to="/order" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
