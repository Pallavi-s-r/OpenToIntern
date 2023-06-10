const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');

const isValid = function (value) {
    if (typeof value === null) return false; 
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

const createCollege = async function(req,res){
 try{  
     const data = req.body;
     const {name, fullName, logoLink} = data;
     data["name"] = data["name"].toLowerCase();

    if(Object.keys(data).length===0){
        return res.status(400).send({status:false,message:"Please enter valid College details"});
    }
    
    if (!name) {
        return res
            .status(400)
            .send({ status: false, message: "name is mandatory" })
    };


    const isAbbrevatedNameUnique = await CollegeModel.findOne({ name: name })
    if (isAbbrevatedNameUnique) {
        return res
            .status(200)
            .send({ status: true, message: "name already exists" ,data:{name,fullName,logoLink}})
    };

    if (!fullName) {
        return res
            .status(400)
            .send({ status: false, message: "fullName is mandatory" })
    };

    if (!logoLink) {
        return res
            .status(400)
            .send({ status: false, message: "logoLink is mandatory" })
    };

    //  const alreadyExistedCollege = await CollegeModel.findOne({fullName:isAbbrevatedNameUnique})
    // //  return res.status(200).send({status:false,message:"Already Exists",data:alreadyExistedCollege});

    //  if(alreadyExistedCollege){
    //     return res.status(200).send({status:false,message:"Already Exists",data:alreadyExistedCollege});
    //  }
    const createdData = await CollegeModel.create(data)
    return res.status(201).send({status:true,data:createdData});
     
}catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

//--------------------------------------------------------------------------------------------------------------------------

const getInternDetails = async(req,res)=>{
    try{
        const abbrevatedCollegeName = req.query.abbrevatedCollegeName;
        const college = await CollegeModel.findOne({name:abbrevatedCollegeName});

        if(!college){
            return res.status(404).send({status:false,message:"no such college present"});
        }
        const interns = await InternModel.find({collegeId:college._id});
        
        if(!interns){
            return res.status(400).send({status:false,message:"No applicants for internships"});
        }
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