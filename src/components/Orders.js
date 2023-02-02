import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { axios } = require('axios');
import './Orders.css';

export const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [subtotal, setSubtotal] = useState('');
  const [renderer, setRenderer] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const shippingAndHandling = 10;
  const tax = subtotal * 0.1;
  const BASE = 'http://localhost:8080/api'
  
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
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getOrderProduct = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/orderproducts/${userId}/${orderId}/${productId}`
    );
    const data = await response.json();
    return data.id;
  };

  const handleRemoveButtonClick = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/orderproducts/${userId}/${orderId}/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json().then(setRenderer(!renderer));
    return data;
  };

  const handleQuantityChange = async (i, orderId, productId) => {
    const orderProductId = await getOrderProduct(orderId, productId);
    const select = document.getElementById(`quantity-select-${i}`);
    const value = select.options[select.selectedIndex].value;
    const response = await fetch(`${BASE}/orderproducts/${orderProductId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: `${value}`,
      }),
    });
    const data = await response.json();
    setRenderer(!renderer);
    return data;
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
                                window.location.reload(true);
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
                              event.preventDefault();
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
                  <Link to="/checkout">
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
            <Link to="/products"> Something?</Link>
          </h1>
        </>
      )}
    </div>
  );
};
