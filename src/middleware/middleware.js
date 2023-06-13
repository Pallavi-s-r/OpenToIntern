const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');

const validator = require("validator")
const isURL = require('is-url')
const axios = require('axios')


const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const collegeValidation = async (req,res,next)=>{

    try{
        const data = req.body;
        const {name, fullName, logoLink} = data;
   

    if(Object.keys(data).length===0){
        return res.status(400).send({status:false,message:"Please enter valid College details"});
    }
    

    if(!isValid(name))
        return res.status(400).send({status:false,message:"Please enter College abrrevation name"});

    let colName=await CollegeModel.findOne({name:name});

    if(colName)
        return res.status(400).send({status:false,message:"College Name already exists"});
   
        
    if(!isValid(fullName))
        return res.status(400).send({status:false,message:"Please enter College Full Name"});
    
     let clgFullName=await CollegeModel.findOne({fullName:fullName});

    if(clgFullName)
        return res.status(400).send({status:false,message:"College Full Name already exists"});
   
    if(!isValid(logoLink))
        return res.status(400).send({status:false,message:"Please enter College Logo Link"});
    
    if(!isURL(logoLink))
        return res.status(400).send({ status: false, msg: "invalid logoLink" })
    
    if (!validator.isURL(logoLink)) 
        return res.status(400).send({ status: false, msg: "invalid logoLink" })
    
    // let logoCheck = await axios.get(logoLink).then(() => logoLink).catch(() => null)

    // if(!logoCheck) 
    //     return res.status(400).send({status : false, message : "invalid longUrl"})

    // let checkURL = await axios.get(logoLink).then(() => logoLink).catch(() => null)

    // if(!checkURL) 
    //     return res.status(400).send({status : false, message : "invalid logoLink"})

    next();
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message});
    }
}

const InternValidations =async (req,res,next)=>{
    try{

        const details = req.body;
        const {name,email,mobile,collegeId} = details;
  
      if(Object.keys(details).length===0){
          return res.status(400).send({status:false,message:"Please enter valid personal details"});
      }
        if(!isValid(name))
            return res.status(400).send({status:false,message:"Please enter Intern Name"});
            
        if(!isValid(email)){
            return res.status(400).send({status:false,message:"Please enter Intern Email"});
        }
    
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                return res.status(400).send({status:false,message:"Email should be a valid email"})
        }

        const registeredEmail = await InternModel.findOne({email:email});

        if(registeredEmail)
            return res.status(400).send({status:false,message:`${email} email address is already registered`})
           
        
        if(!isValid(collegeId))
            return res.status(400).send({status:false,message:"Please enter Intern College Id"});

        if(!(/^[0-9a-f]{24}$/.test(collegeId)))
            return res.status(400).send({status:false,message:"Please enter valid Intern College Id"});

        const clgId=await CollegeModel.findOne({_id:collegeId});

        if(!clgId)
            return res.status(400).send({status:false,message:"College Id registration is not done."});

        if(!isValid(mobile))
            return res.status(400).send({status:false,message:"Please enter  MobileNo"});

        if(!(/^[1-9][0-9]{9}$/.test(mobile)))
            return res.status(400).send({status:false,message:"Please enter valid  MobileNo . It should contain 10 numbers"});

        let regMobile=await InternModel.findOne({mobile:mobile});
        if(regMobile)
            return res.status(400).send({status:false,message:`${mobile} mobile number is already used`})
            
        next();
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message});
    }
    
}

module.exports={collegeValidation,InternValidations}