const { Vendor } = require("../models");

const getVendor = async (_id) => {
  try {
    return await Vendor.findById(_id, { category: 0 });
  } catch (error) {
    throw error;
  }
};

module.exports = getVendor;
