const handleHttpError = (error, response) => {
  if (error.response && error.message) {
    response.status(error.response.status).json({
      message: error.message ? error.message : "An error occured",
      response: {
        data: error.response.data,
        status: error.response.status,
      },
    });
  } else if (!error.response && error.message) {
    response
      .json({
        message: error.message,
      })
      .sendStatus(500);
  } else {
    response
      .json({
        message: "An error occured",
      })
      .sendStatus(500);
  }
};

module.exports = handleHttpError;
