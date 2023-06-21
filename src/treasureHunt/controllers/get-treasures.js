const catchAsync = require("express-async-handler");
const treasureService = require("../services");

const getTreasures = catchAsync(async (req, res) => {
  const data = await treasureService.getTreasures();
  res
    .status(201)
    .json({ status: true, message: "All treasures now retrieved...", data });
});

module.exports = getTreasures;
