const { Router } = require('express');
const {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} = require('./location.controller');
const router = Router();

router.post('/create', createLocation);

router.get('/all', getLocations);

router.put('/edit', updateLocation);

router.delete('/:_id', deleteLocation);

module.exports = router;
