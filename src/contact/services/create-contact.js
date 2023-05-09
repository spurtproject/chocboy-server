const { Contact } = require("../model");

const createContactService = async (data) => {
  try {
    const result = await Contact.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = createContactService;
