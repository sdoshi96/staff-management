const express = require('express');
const router = express.Router();
const {getHrDetails, createHr} = require('../controllers/adminController');
const { createEmployee, getEmployees } = require('../controllers/hrController');
const { getProfileDetails } = require('../controllers/empController');
const { adminPermissions, hrPermissions} = require('../auth/permissions');

router.get(
  '/hrDetails', checkAdmin,
  getHrDetails
);

router.get('/profile/:id', getProfileDetails);
router.post('/createHr', checkAdmin, createHr);

router.post('/createEmp/:id', checkHrOrAdmin, createEmployee);

router.get('/empDetails/:id', checkHrOrAdmin, getEmployees);

function checkAdmin(req, res, next){
  if(!adminPermissions(req.user)){
    res.status(401)
    return res.send('Not Allowed')
  }
  next();
}

function checkHrOrAdmin(req, res, next){
  if(!hrPermissions(req.user)){
    res.status(401)
    return res.send('Not Allowed')
  }
  next();
}

module.exports = router;