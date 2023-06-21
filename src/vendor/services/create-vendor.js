const { Vendor } = require("../models");

const createVendor = async (data) => {
  try {
    return await Vendor.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = createVendor;
