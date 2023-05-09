const catchAsync = require("express-async-handler");
const { getContactService } = require("../services");

const getContacts = catchAsync(async (req, res) => {
  const data = await getContactService(req.query);
  res
    .status(201)
    .json({ status: true, message: "All contacts now retrieved...", data });
});

module.exports = getContacts;
