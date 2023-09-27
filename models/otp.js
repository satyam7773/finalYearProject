let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp:{type:String,required:true}
});

var Otp = mongoose.model("Otp", userSchema);

module.exports = { Otp };
