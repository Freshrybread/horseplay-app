import React from 'react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Footer,
  Profile,
  Products,
  Orders,
  GuestOrders,
  Checkout,
  GuestCheckout,
  SingleProduct,
  Register,
  Login,
  Admin,
} from './components';
import { getCurrentUser } from '../src/auth';
import { userCheck } from './api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getCurrentUser);
  const [isAdmin, setIsAdmin] = useState(getCurrentUser);
  const [productId, setProductId] = useState('');

  const currentToken = localStorage.getItem('token');
  const guestId = localStorage.getItem('guestId');
  const BASE = 'http://localhost:8080/api'

  const checkForGuests = async () => {
    const response = await fetch(`${BASE}/guestusers`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.rows.length === 0) localStorage.removeItem('guestId');
  };

  useEffect(() => {
    userCheck(currentToken);
    if (guestId) {
      checkForGuests();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Products isLoggedIn={isLoggedIn} setProductId={setProductId} />
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Products isLoggedIn={isLoggedIn} setProductId={setProductId} />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Profile isLoggedIn={isLoggedIn} setProductId={setProductId} />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Register setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
          }
        ></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/guestorders" element={<GuestOrders />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/guestcheckout" element={<GuestCheckout />}></Route>
        <Route
          path="/:productId"
          element={<SingleProduct productId={productId} />}
        ></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
