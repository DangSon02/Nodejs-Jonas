const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const router = express.Router();
// router.param('id', tourControllers.checkID);
// create a checkbody middleware
//Check if body contains the name and price property
// if not, send back 400 (bad request)
// add it to th post handler stack

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

router.route('/tour-stats').get(tourControllers.getTourStats);
router.route('/monthly-plan/:year').get(tourControllers.getMonthlyPlan);
router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTours);
router
  .route('/:id')
  .get(tourControllers.getTours)
  .patch(tourControllers.updateTours)
  .delete(tourControllers.deleteTours);
module.exports = router;
