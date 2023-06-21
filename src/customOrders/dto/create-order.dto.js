const { object, string, number, array } = require("yup");

const createCustomOrderDto = object().shape({
  body: object().shape({
    chocolateType: array()
      .of(
        object().shape({
          type: string().required("Type is required"),
          message: string().required("Message is required"),
        })
      )
      .required("Chocolate Type is required"),
    amount: number().required("Product amount is required"),
    chocolateSize: string().required("Chocolate size is required"),
    deliveryInformation: object()
      .shape({
        fullName: string().required("Full name is required"),
        address: string().required("Address is required"),
        phoneNumber: string().required("Phone number is required"),
        state: string().required("State is required"),
        city: string().required("City is required"),
        country: string().required("Country is required"),
        additionalInfo: string().optional(),
      })
      .required("Delivery Information is required"),
  }),
});

module.exports = { createCustomOrderDto };
