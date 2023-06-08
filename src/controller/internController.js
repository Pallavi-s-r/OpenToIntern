const InternModel = require('../models/internModel');

const createIntern = async function(req,res){
 try{  
    const {name,email,mobile,collegeId} = req.body;
      const details = {name,email,mobile,collegeId};
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
    const createdData = await InternModel.create(details)
    return res.status(201).send({status:true,data:createdData});
}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }  
}

module.exports.createIntern = createIntern;