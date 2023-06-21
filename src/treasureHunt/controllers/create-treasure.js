const catchAsync = require("express-async-handler");
const treasureService = require("../services");

const createTreasure = catchAsync(async (req, res) => {
  let data = req.body;

  const product = await treasureService.createTreasure(data);
  res
    .status(201)
    .json({ status: true, message: "Treasure now created...", product });
});

module.exports = createTreasure;
