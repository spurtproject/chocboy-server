const express = require('express');
const { json, urlencoded } = express;
require('dotenv').config();
const app = express();
const { PORT } = require('./config/keys');
const { connectToDatabase } = require('./config/mongoose');
const logger = require('./helpers/logger');

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ status: true, message: 'Welcome to Chocboy Index Page' });
});

connectToDatabase();
app.listen(PORT, () => {
  logger.info(`Server now live at port ${PORT}`);
});
