const { sendTreasureHuntMessage } = require("../../helpers/email");
const { Treasure } = require("../models");

const createTreasure = async (data) => {
  try {
    const treasureHunt = await Treasure.create(data);
    await sendTreasureHuntMessage(data.email, data.fullName);
    return treasureHunt;
  } catch (error) {
    throw error;
  }
};

module.exports = createTreasure;
