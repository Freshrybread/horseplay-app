import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.css';


export const SingleProduct = props => {
  const [product, setProduct] = useState([]);
  const { productId } = props;
  const userId = localStorage.getItem('userId');
  const guestId = localStorage.getItem('guestId');
  const singleProductId = localStorage.getItem('singleProductId');
  const BASE = 'http://localhost:8080/api'
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleProduct = async productId => {
      try {
        const data = await axios.get(`${BASE}/products/${productId}`);
        setProduct([data.data]);
        localStorage.setItem('singleProductId', data.data.id);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };
    if (singleProductId) {
      getSingleProduct(singleProductId);
    } else getSingleProduct(productId);
  }, []);

  const handleAddToCart = async productId => {
    try {
      const select = document.getElementById('single-product-quantity-select');
      const value = select.options[select.selectedIndex].value;
      if (userId) {
        const addItemToOrder = await axios.post(`${BASE}/orders/${userId}`, {
          productId: productId,
          quantity: value,
        });
        return addItemToOrder.data;
      } else if (guestId) {
        const addItemToGuestOrder = await axios.post(
          `${BASE}/guestorders/${guestId}`,
          {
            productId: productId,
            quantity: value,
          }
        );
        return addItemToGuestOrder.data;
      } else {
        const guest = await axios.post(`${BASE}/guestusers`);
        localStorage.setItem('guestId', guest.data.id);
        const addItemToGuestOrder = await axios.post(
          `${BASE}/guestorders/${guest.data.id}`,
          {
            productId: productId,
            quantity: value,
          }
        );
        return addItemToGuestOrder.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="single-product-container">
      {product.map((singleProduct, i) => {
        return (
          <div id="single-product" key={i}>
            <h1 id="single-product-name">{singleProduct.name}</h1>
            <img id="single-product-image" src={singleProduct.image} />
            <h3 id="description-header"> Description: </h3>
            <div id="single-product-description">
              {singleProduct.description}
            </div>
            <h3 id="single-product-breed">Breed: {singleProduct.breedname}</h3>
            <h3 id="single-product-price">
              Price: ${Number(singleProduct.price).toFixed(2)}.00
            </h3>
            <select id="single-product-quantity-select" required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button
              id="single-product-add-to-cart"
              onClick={() => {
                handleAddToCart(singleProduct.id);
                localStorage.removeItem('singleProductId');
                navigate('/products');
              }}
            >
              Add To Cart
            </button>
            <Link to="/products">
              <div id="back">Back to all products</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
