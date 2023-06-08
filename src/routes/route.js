const express = require('express');
const router = express.Router();
const CollegeContrllr = require('../controller/collegeController');
const createCollege = require('../controller/collegeController');
router.get('/test-me', function(req,res){
    res.send("starting the 3rd project");
})

/**POST /functionup/colleges
Create a college - a document for each member of the group

The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. Try accessing the link to see if the link is public or not.

Endpoint: BASE_URL/functionup/colleges
 */

router.post('/functionup/colleges',CollegeContrllr.createCollege);
module.exports = router;