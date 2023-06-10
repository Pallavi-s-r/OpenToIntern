/** { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} } */

const mongoose = require('mongoose');

const collegeModel = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    toLowerCase:true
,    validate:{
      validator:  function (value) {
          const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
          return regex.test(value.toLowerCase());
      },message:"invalid name format"
   }
   },
   fullName:{
    type:String,
    required:true,
    trim:true,
    validate:{
      validator:  function (value) {
          const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
          return regex.test(value);
      },message:"invalid fullName  format"
   },
   },
   logoLink:{
    type:String,
    required:true,
    trim:true,
    validate:{
      validator: (value) => {
         const urlRegex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
         return urlRegex.test(value)
     },message:"invalid url"
    }
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
},{timestamps:true});
module.exports = mongoose.model('College',collegeModel);