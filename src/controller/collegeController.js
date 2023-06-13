const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');

const createCollege = async function(req,res){
 try{  
    const data = req.body;
    const {name, fullName, logoLink} = data;


if(Object.keys(data).length===0){
    return res.status(400).send({status:false,message:"Please enter valid College details"});
}
    const createdData = await CollegeModel.create(data)

    return res.status(201).send({status:true,data:createdData});
     
}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

//--------------------------------------------------------------------------------------------------------------------------

// const getCollegeDetails = async(req,res)=>{
//     try{
//         const abbrevatedCollegeName = req.query.abbrevatedCollegeName;

//         const college = await CollegeModel.findOne({name:abbrevatedCollegeName});

//         if(!college){
//             return res.status(404).send({status:false,message:"no such college present"});
//         }
//         const interns = await InternModel.findOne({collegeId:college._id, isDeleted:false}).select({collegeId:0,isDeleted:0,__v:0});
        
//         if(!interns){
//             return res.status(404).send({status:false,message:"No applicants for internships"});
//         }
//         const responseData = {
//             name: college.name,
//             fullName: college.fullName,
//             logoLink: college.logoLink,
//             interns: interns
//           };
          
//         return res.status(200).send({status:true, data:responseData});
//     }catch(error){
//         return res.status(500).send({status:false,message:error.message});
//     }
// }

const getDetails = async function(req,res){
try{
    const shrtName = req.query.shrtName;
    const college = await CollegeModel.findOne({name:shrtName});
    const interns = await InternModel.find({collegeId:college._id, isDeleted:false});
    const responseData ={
        name:college.name,
        fullName:college.fullName,
        logoLink:college.logoLink,
        interns:interns
    };
   return res.send({status:true, message:responseData});
}catch(error){
    res.send({status:false, mesage:error.mesage});
}
}
module.exports = {createCollege,getDetails};