import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [CVC, setCVC] = useState('');
  const [orderId, setOrderId] = useState('');
  const userId = localStorage.getItem('userId');
  const BASE = 'http://localhost:8080/api'


  useEffect(() => {
    const getOrderId = async () => {
      const results = await openOrder();
      setOrderId(results.id);
    };
    getOrderId();
  }, []);

  const openOrder = async () => {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const enterName = event => {
    setName(event.target.value);
  };

  const enterCardNumber = event => {
    setCardNumber(event.target.value);
  };

  const enterExpDate = event => {
    setExpDate(event.target.value);
  };

  const enterCVC = event => {
    setCVC(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(`${BASE}/orders/${userId}/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        orderId,
        isOpen: false,
      }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <div id="checkout-page">
      <form
        id="checkout-form"
        onSubmit={async event => {
          event.preventDefault();
          await handleSubmit();
          navigate('/profile');
        }}
      >
        <h3>PLEASE ENTER PAYMENT DETAILS</h3>
        <label>Full Name: </label>
        <input
          className="input-form"
          id="full-name"
          placeholder="Full name as it Appears on Credit Card"
          type="text"
          required
          value={name}
          onChange={enterName}
        ></input>
        <br />
        <label>Credit Card #: </label>
        <input
          className="input-form"
          id="credit-card-number"
          placeholder="Credit Card Number"
          type="number"
          required
          value={cardNumber}
          onChange={enterCardNumber}
        ></input>
        <br />
        <label>Exp. Date: </label>
        <input
          className="input-form"
          id="exp-date"
          placeholder="Exp. Month/Year"
          type="month"
          required
          min="2022-11"
          max="2026-12"
          value={expDate}
          onChange={enterExpDate}
        ></input>
        <br />
        <label>Card Verification Code: </label>
        <input
          className="input-form"
          id="cvc-input"
          placeholder="CVC"
          type="text"
          required
          maxLength="3"
          min="0"
          max="999"
          step="1"
          pattern="[0-9]{3}"
          value={CVC}
          onChange={enterCVC}
        ></input>
        <br />
        <button>Place Order</button>
      </form>
    </div>
  );
};
