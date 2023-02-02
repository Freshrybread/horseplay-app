require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const morgan = require('morgan');
const CORS = require('cors');
// const path = require('path');
// const chalk = require("chalk")
const { rebuildDB } = require('./db/seedData');

// const buildPath = path.join(__dirname, 'dist/main.js');

// server.use('/dist', express.static(buildPath));
server.use(morgan('dev'));

server.use(bodyParser.json());

server.use(express.json());


server.use(CORS());

server.use((req, res, next) => {
  console.log('Starting body logger...');
  console.log(req.body);
  console.log('Body logger finished!');
  next();
});

// server.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/index.html'))
// );

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

const client = require('./db/client');
const init = async () => {
  
  try {
    await client.connect();
    await rebuildDB();
  } catch (error) {
    console.log(error);
  }

  const PORT = process.env['PORT'] ?? 8080;
  
  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`,
      )});
  };
  
  init();
