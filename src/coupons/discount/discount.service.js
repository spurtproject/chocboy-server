const Discount = require('./discount.model');
const ApiError = require('../../helpers/error');

const generateCode = async (data) => {
  try {
    const rawData = {};
    rawData.validFrom = new Date(data.validFrom);
    rawData.validTill = new Date(data.validTill);
    rawData.maxNumberOfUse = data.maxNumberOfUse;
    rawData.maxNumberOfUsePerUser = data.maxNumberOfUsePerUser;
    if (data.discountPercentage) {
      rawData.discountPercentage = data.discountPercentage / 100;
    }
    if (data.discountPrice) {
      rawData.discountPrice = data.discountPrice;
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
    const discountCode = `CB-${code}${twoLetterCode}`;
    rawData.discountCode = discountCode;

    return await Discount.create(rawData);
  } catch (error) {
    throw new ApiError(400, 'Unable to generate discount code');
  }
};

const updateCode = async (discountId, data) => {
  try {
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
  } catch (error) {
    throw new ApiError(400, 'Unable to update coupon code...');
  }
};

// code for single discount
const getSingleDiscountCode = async(code) => {
  const discountInfo = await Discount.findOne({discountCode: code})
  if(!discountInfo){
    throw new ApiError(400, 'Discount code either does not exist or is invalid')
  }
  return discountInfo
}

const getDiscountCodes = async () => {
  try {
    return await Discount.find();
  } catch (error) {
    throw new ApiError(400, 'Unable to get coupon codes...');
  }
};

const deleteDiscountCode = async (id) => {
  try {
    return await Discount.findOneAndDelete({ discountCode: id });
  } catch (error) {
    throw new ApiError(400, 'Unable to delete coupon code...');
  }
};

module.exports = {
  generateCode,
  getSingleDiscountCode,
  getDiscountCodes,
  updateCode,
  deleteDiscountCode,
};
