const Shipping = require('./shipping.model');

const ApiError = require('../../helpers/error');

const generateCode = async (data) => {
  try {
    const rawData = {};
    rawData.validFrom = new Date(data.validFrom);
    rawData.validTill = new Date(data.validTill);
    rawData.maxNumberOfUse = data.maxNumberOfUse;
    rawData.maxNumberOfUsePerUser = data.maxNumberOfUsePerUser;
    if (data.shippingPercentage) {
      rawData.shippingPercentage = data.shippingPercentage / 100;
    }
    if (data.shippingPrice) {
      rawData.shippingPrice = data.shippingPrice;
    }

    console.log(rawData);

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
    const shippingCode = `CBSH-${code}${twoLetterCode}`;
    rawData.shippingCode = shippingCode;

    return await Shipping.create(rawData);
  } catch (error) {
    throw new ApiError(400, 'Unable to generate shipping code...');
  }
};

const updateCode = async (shippingId, data) => {
  const updatedData = data;
  if (data.validFrom) {
    updatedData.validFrom = new Date(data.validFrom);
  }
  if (data.validTill) {
    updatedData.validTill = new Date(data.validTill);
  }

  return await Shipping.findByIdAndUpdate(
    shippingId,
    { $set: updatedData },
    { new: true }
  );
};

const getShippingCodes = async () => {
  return await Shipping.find();
};

module.exports = { generateCode, getShippingCodes, updateCode };
