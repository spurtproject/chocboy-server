const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const passport = require("passport");
const cors = require("cors");
const { PORT } = require("./config/keys");
const { connectToDatabase } = require("./config/mongoose");
const logger = require("./helpers/logger");
const { errorConverter, errorHandler } = require("./helpers/asyncError");
require("./auth/passport.service")(passport);

require("dotenv").config();

const { json, urlencoded } = express;
const app = express();

app.use(cors());

app.use(json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(urlencoded({ extended: true }));

app.use("/api", require("./routes/routes"));

app.get("/", (req, res) => {
  res
    .status(201)
    .json({ status: true, message: "Welcome to Chocboy Index Page" });
});

app.use(errorConverter);
app.use(errorHandler);

connectToDatabase();
app.listen(PORT, () => {
  logger.info(`Server now live at port ${PORT}`);
});
