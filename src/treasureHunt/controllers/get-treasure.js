const catchAsync = require("express-async-handler");
const treasureService = require("../services");

const getTreasure = catchAsync(async (req, res) => {
  const data = await treasureService.getTreasure(req.params._id);
  res.status(201).json({
    status: true,
    message: `Treasure ${req.params._id} successfully retrieved...`,
    data,
  });
});

module.exports = getTreasure;
