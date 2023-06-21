const { Treasure } = require("../models");

const getTreasure = async (_id) => {
  try {
    return await Treasure.findById(_id, { category: 0 });
  } catch (error) {
    throw error;
  }
};

module.exports = getTreasure;
