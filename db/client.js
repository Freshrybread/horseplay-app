const { Client } = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'postgres//localhost:5432/horseplay-dev';



const client = new Client(
  connectionString
);

module.exports = client;
