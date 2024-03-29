const { Router } = require("express");
const {
  register,
  registerAdmin,
  login,
  forgotPassword,
  confirmOTP,
  changePassword,
  updatePassword,
  editProfile,
  userProfile,
} = require("./controllers");
const { checkEmail } = require("../helpers/checkEmail");
const { loginValidator } = require("../helpers/validate");
const { authValidate } = require("../helpers/validator");
const { userAuthentication } = require("../helpers/auth");
const upload = require("../helpers/multer");
const passport = require("passport");
const router = Router();

router.post(
  "/register",
  authValidate,
  checkEmail,
  passport.authenticate("user", { session: false }),
  register
);

router.post(
  "/admin/register",
  authValidate,
  checkEmail,
  passport.authenticate("admin", { session: false }),
  registerAdmin
);

router.post("/login", loginValidator, login);

router.put("/password/forgot", forgotPassword);

router.post("/confirm/otp", userAuthentication, confirmOTP);

router.get("/profile", userAuthentication, userProfile);

router.put(
  "/edit/profile",
  userAuthentication,
  upload.single("photo"),
  editProfile
);

router.put("/change/password", userAuthentication, changePassword);

router.patch("/update/password", userAuthentication, updatePassword);

module.exports = router;
