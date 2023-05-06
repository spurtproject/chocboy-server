const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors);
  }
};

module.exports = validate;
