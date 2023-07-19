const { Router } = require("express");
const { userAuthentication } = require("../helpers/auth");
const { createTreasure, getTreasure } = require("./controllers");
const validate = require("../helpers/validateRequest");
const { createTreasureDto } = require("./dto/create-treasure.dto");
const router = Router();

router.post(
  "/create",
  // userAuthentication,
  validate(createTreasureDto),
  createTreasure
);
router.get("/:_id", getTreasure);

module.exports = router;
