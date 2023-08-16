const { sendVendorMessage } = require("../../helpers/email");
const { Vendor } = require("../models");

const createVendor = async (data) => {
  try {
    const vendor = await Vendor.create(data);
    await sendVendorMessage(data.email, data.brandName);
    return vendor;
  } catch (error) {
    throw error;
  }
};

module.exports = createVendor;
