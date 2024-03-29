let mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  nameOfSociety: { type: String, required: true },
  nameOfPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  deposit: { type: Boolean },
  chargerNumber: { type: String, required: true },
  charges: { type: String },
  verifyName : { type: String, required: true },
  confirmBankAccountNo: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
  depositeInput: { type: String },
  chargesMonthlyInput1: { type: String },
  address: { type: String, required: true },

  chargesMonthlyInput2: { type: String },
  
  chargesServicesInput: { type: String },
},{
  timestamps:true
});

var verifiedForm = mongoose.model("verifiedForms", formSchema);

module.exports = { verifiedForm };



