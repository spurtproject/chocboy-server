const catchAsync = require("express-async-handler");
const tokenService = require("../services");
const passport = require("passport");
const ApiError = require("../../helpers/error");

const login = catchAsync((req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const err = new ApiError(
          400,
          "Ooopss! You have either inputed an incorrect password or an unregistered email..."
        );
        return next(err);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const data = {
          _id: user._id,
          email: user.email,
          name: user.name,
          userRole: user.userRole,
        };
        const token = await tokenService.generateAuthTokens(data);

        res.status(200).json({
          status: "success",
          message: "Login Successful!",
          data,
          token: token.access.token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = login;
