const express = require('express');
const router = express.Router();

const CollegeContrllr = require('../controller/collegeController');
const InternControllr = require('../controller/internController');


router.post('/functionup/colleges', CollegeContrllr.createCollege);
router.post('/functionup/interns',  InternControllr.createIntern);
router.get('/functionup/collegeDetails', CollegeContrllr.getCollegeDetails);

module.exports = router;