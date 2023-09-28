let mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  nameOfSociety: { type: String, required: true },
  nameOfPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  confirmBankAccountNo: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
});

var form = mongoose.model("form", formSchema);

module.exports = { form };



