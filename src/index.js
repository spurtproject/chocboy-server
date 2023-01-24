const express = require('express');
const { json, urlencoded } = express;
require('dotenv').config();
const passport = require('passport');
const app = express();
const { PORT } = require('./config/keys');
const { connectToDatabase } = require('./config/mongoose');
const logger = require('./helpers/logger');
const { errorConverter, errorHandler } = require('./helpers/asyncError');
require('./auth/auth.service')(passport);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/', require('./routes/routes'));

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ status: true, message: 'Welcome to Chocboy Index Page' });
});

app.use(errorConverter);
app.use(errorHandler);

connectToDatabase();
app.listen(PORT, () => {
  logger.info(`Server now live at port ${PORT}`);
});
