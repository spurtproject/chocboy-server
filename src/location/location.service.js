const Location = require('./location.model');
const ApiError = require('../helpers/error');

const createLocation = async (data) => {
  try {
    return await Location.create(data);
  } catch (error) {
    throw new ApiError(400, 'Unable to create location');
  }
};

const getLocations = async () => {
  try {
    return await Location.find().sort({ _id: -1 });
  } catch (error) {
    throw new ApiError(400, 'Unable to get all locations');
  }
};

const updateLocation = async (locationId, data) => {
  try {
    return await Location.findByIdAndUpdate(locationId, data, { new: true });
  } catch (error) {
    throw new ApiError(400, 'Unable to update location');
  }
};

const deleteLocation = async (id) => {
  try {
    return await Location.findByIdAndDelete(id);
  } catch (error) {
    throw new ApiError(400, 'Unable to delete location');
  }
};

module.exports = {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
