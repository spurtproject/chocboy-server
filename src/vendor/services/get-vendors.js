const { Vendor } = require("../models");

const getVendors = async () => {
  try {
    return await Vendor.find().sort({ _id: -1 });
  } catch (error) {
    throw error;
  }
};

module.exports = getVendors;
