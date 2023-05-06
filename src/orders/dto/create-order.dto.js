const { object, string, number, array } = require("yup");

const createOrderDto = object({
  body: object({
    items: array().required("Items is required"),
    productAmount: number().required("product amount is required"),
    deliveryAmount: number().required("delivery amount is required"),
    state: string().required("state is required"),
    address: string().required("address is required"),
    phone: string().required("phone is required"),
  }),
});

module.exports = { createOrderDto };
