const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');

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

const getInternDetails = async(req,res)=>{
    try{
        const abbrevatedCollegeName = req.query.abbrevatedCollegeName;
        const college = await CollegeModel.findOne({name:abbrevatedCollegeName});
        if(!college){
            return res.status(404).send({status:false,message:"no such college present"});
        }
        const interns = await InternModel.find({collegeId:college._id});

        const responseData = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
          };
        return res.status(200).send({status:true, data:responseData});
    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}
module.exports = {createCollege,getInternDetails};