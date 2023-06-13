const InternModel = require('../models/internModel');
const CollegeModel = require('../models/collegeModel')
const createIntern = async function(req,res){
 try{  
    
      const details = req.body;
      const {name,email,mobile,collegeId} = details;

      if (!name) {
        return res
            .status(400)
            .send({ status: false, message: "name is mandatory" })
    };

    if (!collegeId) {
        return res
            .status(400)
            .send({ status: false, message: "collegeId is mandatory" })
    };


    let checkEmail = await InternModel.findOne({ email: email, isDeleted: false })
    if (checkEmail) {
        return res
            .status(400)
            .send({ message: "Email Already Registered" })
    };

    let checkMobile = await InternModel.findOne({ mobile: mobile, isDeleted: false })
    if (checkMobile) {
        return res
            .status(400)
            .send({ message: "Mobile Already Registered" })
    };


    const createdData = await InternModel.create(details)
    return res.status(201).send({status:true,data:createdData});
}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }  
}


module.exports.createIntern = createIntern;