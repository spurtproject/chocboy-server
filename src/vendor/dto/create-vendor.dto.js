const { object, string } = require("yup");

const createVendorDto = object({
  body: object({
    brandName: string().required("product amount is required"),
    email: string().email().required("delivery amount is required"),
    phoneNumber: string().required("Phone number is required"),
    address: string().required("Address is required"),
    products: string().required("Products is required"),
  }),
});

module.exports = { createVendorDto };
