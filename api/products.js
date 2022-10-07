const express = require('express');
const productsRouter = express.Router();

const { getAllProducts } = require('../db');

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
