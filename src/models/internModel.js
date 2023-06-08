/** { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}} */

const validator = require('validator');

const mongoose = require('mongoose');

const internModel = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim:true
   },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: 'Invalid email format'
   }
   },
   mobile:{
    type:String,
    required:true,
    unique:true,
    trim:true,
//     validate: {
//         validator: function (mobile) {
//           return validator.isMobilePhone(mobile,'en-US');
//         },
//         message: 'Invalid mobile number'
//    },
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