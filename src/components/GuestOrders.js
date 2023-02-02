import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const { axios } = require('axios');
import './Orders.css';

export const GuestOrders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [renderer, setRenderer] = useState(false);
  const guestId = localStorage.getItem('guestId');
  const shippingAndHandling = 10;
  const tax = subtotal * 0.1;
  const BASE = 'https://horseplay-api.onrender.com/api'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const results = await openOrder();
      if (results) {
        setUserOrder([results]);
        getSubtotal([results]);
      } else setUserOrder([]);
    };
    fetchOrder();
  }, [renderer]);

  const openOrder = async () => {
    const response = await fetch(`${BASE}/guestorders/${guestId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getOrderProduct = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/guestorders/${guestId}/${orderId}/${productId}`
    );
    const data = await response.json();
    return data.id;
  };

  const handleRemoveButtonClick = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/guestorders/${guestId}/${orderId}/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json().then(setRenderer(!renderer));
    return data;
  };

  const updateQuantity = async (orderProductId, value) => {
    const response = await fetch(`${BASE}/orderproducts/${orderProductId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: `${value}`,
      }),
    });
    const data = await response.json();
    return data;
  };

  const handleQuantityChange = async (i, orderId, productId) => {
    const select = document.getElementById(`quantity-select-${i}`);
    const value = select.options[select.selectedIndex].value;
    const orderProductId = await getOrderProduct(orderId, productId);
    if (orderProductId) {
      await updateQuantity(orderProductId, value).then(setRenderer(!renderer));
    }
  };

  const getSubtotal = order => {
    let totalPrice = 0;
    let products = order[0].products;
    for (const product of products) {
      totalPrice += product.price * product.quantity;
    }
    setSubtotal(totalPrice);
  };

  return (
    <div id="order-page">
      {userOrder.length !== 0 ? (
        <>
          {userOrder.map((order, i) => {
            return (
              <div id="order-products" key={i}>
                <div>
                  {order.products.map((product, i) => {
                    return (
                      <div key={i}>
                        <h4>{product.name}</h4>
                        <img id="order-product-image" src={product.image} />
                        <ul>
                          <li>Price: ${Number(product.price).toFixed(2)}</li>
                          <span>
                            <li>Quantity:</li>
                            <select
                              id={`quantity-select-${i}`}
                              required
                              onChange={() => {
                                handleQuantityChange(i, order.id, product.id);
                              }}
                            >
                              <option value="quantity">
                                {product.quantity}
                              </option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              {/* need to figure out how to make an input field that allows you
                        to manually enter a number larger than 10 if the below is selected */}
                              <option value={10}>10</option>
                            </select>
                          </span>
                          <button
                            onClick={async event => {
                              handleRemoveButtonClick(order.id, product.id);
                            }}
                          >
                            Remove From Cart
                          </button>
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div id="order-summary">
                  <h3>Order Summary</h3>
                  <h3>Order Summary</h3>
                  <h5>Subtotal: ${Number(subtotal).toFixed(2)}</h5>
                  <h5>
                    Estimated Shipping & Handling: $
                    {Number(shippingAndHandling).toFixed(2)}
                  </h5>
                  <h5>Estimated Tax: ${Number(tax).toFixed(2)}</h5>
                  <h3>
                    Total: $
                    {Number(subtotal + shippingAndHandling + tax).toFixed(2)}
                  </h3>
                  <Link to="/guestcheckout">
                    <button>Checkout</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h1 id="empty-cart">
            Your Cart is Currently Empty. Why Not Add
            <a onClick={() => navigate('/products')}> Something?</a>
          </h1>
        </>
      )}
    </div>
  );
};
