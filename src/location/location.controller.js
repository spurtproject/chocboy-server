const locationService = require('./location.service');
const catchAsync = require('express-async-handler');

const createLocation = catchAsync(async (req, res) => {
  const data = await locationService.createLocation(req.body);

  res
    .status(201)
    .json({ status: 'success', message: 'Location now created...', data });
});

const getLocations = catchAsync(async (req, res) => {
  const data = await locationService.getLocations();

  res
    .status(200)
    .json({ status: true, message: 'All locations now retrieved...', data });
});

const updateLocation = catchAsync(async (req, res) => {
  const data = await locationService.updateLocation(
    req.query.locationId,
    req.body
  );
  res
    .status(202)
    .json({ status: 'success', message: 'Info now updated...', data });
});

const deleteLocation = catchAsync(async (req, res) => {
  await locationService.deleteLocation(req.params._id);
  res.status(201).json({
    status: true,
    message: `Location with id ${req.params._id} now deleted...`,
  });
});

module.exports = {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
