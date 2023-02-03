const Joi = require('joi');
const ApiError = require('./error');

const authSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .trim()
    .error(
      new ApiError(400, 'Kindly input the name in the appropriate format...')
    ),
  email: Joi.string()
    .email()
    .trim()
    .required()
    .error(new ApiError(400, 'Oops! A valid email is actually required here!')),
  password: Joi.string()
    .min(3)
    .max(30)
    .required()
    .trim()
    .error(new ApiError(400, 'Kindly input a password you would remember...')),
});

const authValidate = async (req, res, next) => {
  const data = req.body;
  try {
    await authSchema.validateAsync(data);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authValidate };
