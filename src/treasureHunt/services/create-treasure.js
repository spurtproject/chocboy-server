const { Treasure } = require("../models");

const createTreasure = async (data) => {
  try {
    return await Treasure.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = createTreasure;
