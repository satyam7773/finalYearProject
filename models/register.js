let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Employee Schema
// const Register = mongoose.Schema("Register", {
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique:true
//   },
//   mobile: {
//     type: String,
//     required: true,
//   },
//   password:{
//     type:String,
//     required:true
//   }
// });

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

var Register = mongoose.model("Register", userSchema);

module.exports = { Register };
