const { Treasure } = require("../models");

const getTreasures = async () => {
  try {
    return await Treasure.find().sort({ _id: -1 });
  } catch (error) {
    throw error;
  }
};

module.exports = getTreasures;
