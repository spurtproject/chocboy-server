const express = require('express');
const { json, urlencoded } = express;
require('dotenv').config();
const app = express();
const { PORT } = require('./config/keys');

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ status: true, message: 'Welcome to Chocboy Index Page' });
});

app.listen(PORT, () => {
  console.log(`Server now live at port ${PORT}`);
});
