import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';


export const Products = props => {
  const [products, setProducts] = useState([]);
  const { setProductId } = props;
  const navigate = useNavigate();
  const singleProductId = localStorage.getItem('singleProductId');
  const BASE = 'https://horseplay-api.onrender.com/api'
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await axios.get(`${BASE}/products`);
        setProducts(data.data);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  if (singleProductId) localStorage.removeItem('singleProductId');

  return (
    <div id="products">
      <h1 id="products-header">Products</h1>
      {products.map((product, i) => {
        return (
          <div id="product-view" key={i}>
            <Link to="/:productId">
              <h2
                id="product-name"
                onClick={() => {
                  setProductId(product.id);
                }}
              >
                {product.name}{' '}
              </h2>
            </Link>
            <Link to="/:productId">
              <img
                id="product-image"
                src={product.image}
                onClick={() => {
                  setProductId(product.id);
                }}
              />
            </Link>
            <div id="product-price">
              Price: ${Number(product.price).toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
