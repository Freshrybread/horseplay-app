import { BASE } from '../api/index';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SingleProduct = props => {
  const [product, setProduct] = useState([]);
  const { productId } = props;
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getSingleProduct = async productId => {
      try {
        const data = await axios.get(`${BASE}/products/${productId}`);
        setProduct([data.data]);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };

    getSingleProduct(productId);
  }, []);

  const handleAddToCart = async productId => {
    try {
      const select = document.getElementById('single-product-quantity-select');
      const value = select.options[select.selectedIndex].value;
      const addItemToOrder = await axios.post(`${BASE}/orders/${userId}`, {
        productId: productId,
        quantity: value,
      });
      return addItemToOrder.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {product.map((singleProduct, i) => {
        return (
          <div id="single-product" key={i}>
            <h1 id="single-product-name">{singleProduct.name}</h1>
            <img id="single-product-image" src={singleProduct.image} />
            <h3 id="single-product-description">
              Description: {singleProduct.description}
            </h3>
            <h3 id="single-product-breed">Breed: {singleProduct.breedname}</h3>
            <h3 id="single-product-price">Price: {singleProduct.price}</h3>
            <select id="single-product-quantity-select" required>
              <option value="quantity">1</option>
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
              }}
            >
              Add To Cart
            </button>
            <Link to="/products">
              <div>Back to all products</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
