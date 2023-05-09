const { Contact } = require("../../contact/model");
const { getPagination, handlePageCount } = require(".././../orders/functions");

const getContactService = async (query) => {
  try {
    const { skip, limit } = getPagination(query);

    const contactCount = await Contact.count({});
    const contacts = await Contact.find({})
      .sort("desc")
      .skip(skip)
      .limit(limit);
    const page = query.page ? parseInt(query.page.toString()) : 1;
    const { current_count, page_count } = handlePageCount(
      page,
      contacts.length,
      limit,
      contactCount
    );
    const response = {
      totalNoPages: page_count,
      currentCount: current_count,
      contactCount,
      contacts,
    };
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = getContactService;
