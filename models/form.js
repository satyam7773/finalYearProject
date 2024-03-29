let mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  nameOfSociety: { type: String, required: true },
  nameOfPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  bankAccountNo: { type: String },
  deposit: { type: String, required: true },
  chargerNumber: { type: String, required: true },
  charges: { type: String, required: true },
  address: { type: String, required: true },
  
  
  confirmBankAccountNo: { type: String },
  ifscCode: { type: String },
  bankName: { type: String },




  depositeInput: { type: String },
  chargesMonthlyInput1: { type: String },
  chargesMonthlyInput2: { type: String },
  chargesServicesInput: { type: String },

},{
  timestamps:true
});

var form = mongoose.model("form", formSchema);

module.exports = { form };
