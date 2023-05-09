const catchAsync = require("express-async-handler");
const { createContactService } = require("../services");

const createContact = catchAsync(async (req, res) => {
  const data = await createContactService(req.body);
  res
    .status(201)
    .json({ status: true, message: "Contact has been created", data });
});

module.exports = createContact;
