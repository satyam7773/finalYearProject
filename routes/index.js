const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const mailer = require("nodemailer");

const { Register } = require("../models/register");

// register user
router.post("/api/register", (req, res) => {
  console.log("request =body ", req.body);
  const reg = new Register({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
  });
  reg.save((err, data) => {
    if (!err) {
      if (data) {
        res.status(200).json({
          code: 200,
          message: "User Added Successfully",
          addUser: data,
        });
      }
      // res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

//delete user
router.delete("/api/deleteUser/:id", (req, res) => {
  Register.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "User deleted", deleteUser: data });
    } else {
      console.log(err);
    }
  });
});

//update user details
// router.post("/api/updateUser/:id/:name/:email/:mobile", (req, res) => {
//   console.log("================================================");
//   console.log("================================================");
//   console.log("================================================");
//   console.log("request =======body ", req.params.name);
//   console.log("================================================");
//   console.log("================================================");
//   console.log("================================================");

//   const reg = {
//     name: req.params.name,
//     email: req.params.email,
//     mobile: req.params.mobile,
//   };
//   Register.findByIdAndUpdate(
//     req.params.id,
//     { $set: reg },
//     { new: true },
//     (err, data) => {
//       if (!err) {
//         res.status(200).json({
//           code: 200,
//           message: "Employee Updated Successfully",
//           updateEmployee: data,
//         });
//       } else {
//         console.log("error while update", err);
//       }
//     }
//   );
// });

// Get Single user

router.get("/api/user/:email/pass/:password", async(req, res) => {
  console.log("================================================");
  console.log("================================================");
  console.log("================================================");
  console.log("request =======body ", req.params.email);
  console.log("================================================");
  console.log("================================================");
  console.log("================================================");

  try {
    const allData = await Register.findOne(
      { email: req.params.email, password: req.params.password });
    res.send(allData);
  } catch (error) {
    res.status(500).send({ error });
  }
  
});

router.post("/api/login", async (req, res) => {
  // const login = new Register.find(request.body);
  console.log('request',req.body)
  try {
    const allData = await Register.findOne(req.body);
    console.log('allData',allData)
    if(allData){
      res.send(allData);
    }else{
      res.send({msg:'No Record Found !!!'})
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});


//get all user
router.get("/api/users", async (req, res) => {
  console.log("================================================");
  try {
    const allData = await Register.find({});
    console.log('allData',allData)
    if(allData){
      res.send(allData);
    }else{
      res.send({msg:'No Record Found !!!'})
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

///////////////////////////////////////////////////////////////// smtp code
var smtpProtocol = mailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "smtptest477@gmail.com",
    pass: "jzvayxlmdyecowsn",
  },
});

var mailoption = {
  from: "smtptest477@gmail.com",
  to: "satyamchoudhary477@gmail.com",
  subject: "Test Mail",
  html: "Good Morning!",
};

// send email
router.get("/api/sendEmail", (req, res) => {
  console.log("request =body bookings ", req.body);

  smtpProtocol.sendMail(mailoption, function (err, response) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
      console.log("Message Sent" + JSON.stringify(response));
    }

    smtpProtocol.close();
  });
});

///////////////////////////////////////////////////////////////// smtp code

module.exports = router;
