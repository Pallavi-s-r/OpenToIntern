const express = require('express');
const router = express.Router();
const CollegeContrllr = require('../controller/collegeController');
const InternControllr = require('../controller/internController');
const Middleware = require('../middleware/middleware')

router.post('/functionup/colleges', Middleware.collegeValidation, CollegeContrllr.createCollege);
router.post('/functionup/interns', Middleware.InternValidations, InternControllr.createIntern);
router.get('/functionup/collegeDetails', CollegeContrllr.getInternDetails);

module.exports = router;