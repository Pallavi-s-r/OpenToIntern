
const mongoose = require('mongoose');

const internModel = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim:true,
    validate:{
      validator:  function (value) {
          const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
          return regex.test(value);
      },message:"invalid name format"
   },
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate: {
        validator: function (email) {
          const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
          return emailRegex.test(email);
      }, message:"invalid email format"
   }
   },
   mobile:{
    type:String,
    required:true,
    unique:true,
    trim:true,
validate: {
    validator: function (mobile) {
      const mobileNumberRegex = /^\+\d{1,3}\d{3,}$/;
      return mobileNumberRegex.test(mobile);
    },
    message: 'Invalid mobile number'
  }
},
   collegeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'College'
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
});
module.exports = mongoose.model('Interns',internModel);