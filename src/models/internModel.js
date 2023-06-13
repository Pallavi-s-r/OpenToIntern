
const mongoose = require('mongoose');

const internModel = new mongoose.Schema({
  
  name: { type: String, required: true, trim: true },

  email: { type: String, required: true, trim: true },

  mobile: { type: String, required: true, trim: true },

  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },

  isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Interns', internModel);