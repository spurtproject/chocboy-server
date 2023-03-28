const Discount = require('./discount.model');
const ApiError = require('../helpers/error');

const generateCode = async (data) => {
  try {
    const rawData = {};
    rawData.validFrom = new Date(data.validFrom);
    rawData.validTill = new Date(data.validTill);
    rawData.maxNumberOfUse = data.maxNumberOfUse;
    rawData.maxNumberOfUsePerUser = data.maxNumberOfUsePerUser;

    const code = Math.floor(Math.random() * (9999 - 1000) + 1000);

    const makeId = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    };
    const twoLetterCode = makeId(2);
    const discountCode = `CB-${code}${twoLetterCode}`;
    rawData.discountCode = discountCode;

    return await Discount.create(rawData);
  } catch (error) {
    throw new ApiError(400, 'Unable to generate discount code');
  }
};

const updateCode = async (discountId, data) => {
  const updatedData = data;
  if (data.validFrom) {
    updatedData.validFrom = new Date(data.validFrom);
  }
  if (data.validTill) {
    updatedData.validTill = new Date(data.validTill);
  }

  return await Discount.findByIdAndUpdate(
    discountId,
    { $set: updatedData },
    { new: true }
  );
};

const getDiscountCodes = async () => {
  return await Discount.find();
};

const deleteDiscountCode = (id) => {};

module.exports = { generateCode, getDiscountCodes, updateCode };
