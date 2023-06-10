const InternModel = require('../models/internModel');

const createIntern = async function(req,res){
 try{  
    
      const data = req.body;
      const {name,email,mobile,collegeId} = data;

    if(Object.keys(details).length===0){
        return res.status(400).send({status:false,message:"Please enter valid personal details"});
    }
    if(!name){
        return res.status(400).send({status:false,message:"name field is missing"});
    }
    if(!email){
        return res.status(400).send({status:false,message:"email field is missing"});
    }
    if(!collegeId){
        return res.status(400).send({status:false,message:"collegeId field is missing"});
    }
    if(!mobile){
        return res.status(400).send({status:false,message:"mobile field is missing"});
    }

    
    let checkEmail = await internModel.findOne({ email: email, isDeleted: false })
    if (checkEmail) {
        return res
            .status(400)
            .send({ message: "Email Already Registered" })
    };

    let checkMobile = await internModel.findOne({ mobile: mobile, isDeleted: false })
    if (checkMobile) {
        return res
            .status(400)
            .send({ message: "Mobile Already Registered" })
    };

    let checkClgName = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false })
    if (!checkClgName) {
        return res
            .status(404)
            .send({ status: false, message: "No such college Name Not Found!" })
    };

    const createdData = await InternModel.create(details)
    return res.status(201).send({status:true,data:createdData});
}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }  
}


module.exports.createIntern = createIntern;