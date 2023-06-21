const { object, string } = require("yup");

const createTreasureDto = object({
  body: object({
    fullName: string().required("product amount is required"),
    email: string().email().required("delivery amount is required"),
    phoneNumber: string().required("Phone number is required"),
  }),
});

module.exports = { createTreasureDto };
