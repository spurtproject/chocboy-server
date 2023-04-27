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
  try {
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
  } catch (error) {
    throw new ApiError(400, 'Unable to update coupon code...');
  }
};

const getSingleShippingCode = async (code) => {
  const shippingInfo = await Shipping.findOne({shippingCode: code})
  if(!shippingInfo){
    throw new ApiError(400, 'Shipping code does not exist or is invalid')
  }
  return shippingInfo
  
}

const getShippingCodes = async () => {
  try {
    return await Shipping.find();
  } catch (error) {
    throw new ApiError(400, 'Unable to get shipping coupons...');
  }
};

const deleteShippingCode = async (coupon) => {
  try {
    return await Shipping.findOneAndDelete({ shippingCode: coupon });
  } catch (error) {
    throw new ApiError(400, 'Unable to delete shipping code...');
  }
};

module.exports = {
  getSingleShippingCode,
  generateCode,
  getShippingCodes,
  updateCode,
  deleteShippingCode,
};
