const { Router } = require("express");
const { userAuthentication } = require("../helpers/auth");
const { createVendor, getVendor } = require("./controllers");
const validate = require("../helpers/validateRequest");
const { createVendorDto } = require("./dto/create-vendor.dto");
const router = Router();

router.post(
  "/create",
  // userAuthentication,
  validate(createVendorDto),
  createVendor
);
router.get("/:_id", getVendor);

module.exports = router;
