const CollegeModel = require('../models/collegeModel');

const createCollege = async function(req,res){
 try{  
     const data = req.body;
    if(Object.keys(data).length===0){
        return res.send({status:false,message:"Please enter valid College details"});
    }
    const createdData = await CollegeModel.create(data)
    return res.status(201).send({status:true,data:createdData});}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}
module.exports.createCollege = createCollege;