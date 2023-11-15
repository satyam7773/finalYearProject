const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }));

const mailer = require("nodemailer");

const { Register } = require("../models/register"); // Register Collection
const { form } = require("../models/form"); // Created host collection
const { verifiedForm } = require("../models/verifiedForm"); // Verified Host Collection

const CryptoJS = require("crypto-js");

const cryptoPassword = "myPassword"; //change the password

function decryptResponse(data) {
  return CryptoJS.AES.decrypt(data, cryptoPassword).toString(CryptoJS.enc.Utf8);
}

let smtpProtocol = mailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "satyamchoudhary477@gmail.com",
    pass: "rssp toew tbvu dijl",
  },
});

router.post("/api/login", async (req, res) => {
  let request = JSON.parse(decryptResponse(req.body));
  try {
    const allData = await Register.findOne(request);
    if (allData) {
      res.json(
        CryptoJS.AES.encrypt(JSON.stringify(allData), cryptoPassword).toString()
      );
    } else {
      res.send({ msg: "No Record Found !!!" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/api/getAllHostList", async (req, res) => {
  console.log("req==============", req.body);
  try {
    const allData = await verifiedForm.find({});
    console.log("allData", allData);
    if (allData) {
      res.json(
        CryptoJS.AES.encrypt(JSON.stringify(allData), cryptoPassword).toString()
      );
    } else {
      res.send({ msg: "No Record Found !!!" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/api/createNewHost", async (req, res) => {
  let request = JSON.parse(decryptResponse(req.body));

  const allData = new form(request);
  console.log("allData", allData);
  try {
    await allData.save();

    var mailoption = {
      from: "satyamchoudhary477@gmail.com",
      to: allData.email,
      subject: "Welcome to Greenie Energy Network",
      html: `
       <img src="https://www.greenie-energy.com/img/logo.png" alt="" width="200px">
       <h2> Hi , ${allData.nameOfPerson} </h2>
       <p>We welcome ${
         allData.nameOfSociety
       } to Greenie Energy's expanding network of hosts for EV charging.
       Please click on the 'Verify' button below to complete your registration.</p>
       <button style="padding: 10px;
       width:90px;
       margin-top:20px;
       background: #45b435;
       border-radius: 10px;
       color: white;"> <a style="text-decoration:none;color:white" 
       href="https://elegant-donut-d62aeb.netlify.app/#/create-host?token=${allData._id.toString()}">Verify</a></button>
       <p>Thanks,</p>
       <p>Greenie Energy</p>

       <p style="text-align: end;">© 2023 GreenieEnergy Pvt Ltd, Inc.</p>
      `,
    };

    smtpProtocol.sendMail(mailoption, function (err, response) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(
          CryptoJS.AES.encrypt(
            JSON.stringify(response),
            cryptoPassword
          ).toString()
        );

        // res.send(response);
      }

      smtpProtocol.close();
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/api/verifyToken/:id", async (req, res) => {
  console.log(
    "================================================",
    req.params.id
  );
  try {
    const allData = await form.find({ _id: req.params.id });
    console.log("allData", allData);

    if (allData) {
      res.json(
        CryptoJS.AES.encrypt(JSON.stringify(allData), cryptoPassword).toString()
      );
    } else {
      res.send({ msg: "No Data" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/api/verifyForm", async (req, res) => {
  let request = JSON.parse(decryptResponse(req.body));

  const allData = new verifiedForm(request);
  console.log("allData", allData);

  try {
    await allData.save();

    var mailoption = {
      from: "satyamchoudhary477@gmail.com",
      to: allData.email,
      cc:'satyamchoudhary47@gmail.com,jatin.masurkar@icloud.com',
      subject: "Thank you for Verifiying",
      html: `
       <img src="https://www.greenie-energy.com/img/logo.png" alt="" width="200px">
       <h2> Hi , ${allData.nameOfPerson} </h2>
       <p> Thank you for verifying your details and confirming your approval. Our installation team will be in touch with you shortly. </p>
       
       <p>Thanks,</p>
       <p>Greenie Energy</p>

       <p style="text-align: end;">© 2023 GreenieEnergy Pvt Ltd, Inc.</p>
      `,
    };

    smtpProtocol.sendMail(mailoption, function (err, response) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(
          CryptoJS.AES.encrypt(
            JSON.stringify(response),
            cryptoPassword
          ).toString()
        );

        // res.send(response);
      }

      smtpProtocol.close();
    });
  } catch (error) {
    res.status(500).send({ error });
  }



  // try {
  //   await allData.save();
  //   res.json(
  //     CryptoJS.AES.encrypt(JSON.stringify(allData), cryptoPassword).toString()
  //   );
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
});

// register user
// router.post("/api/register", (req, res) => {
//   console.log("request =body ", req.body);
//   const reg = new Register({
//     name: req.body.name,
//     email: req.body.email,
//     mobile: req.body.mobile,
//     password: req.body.password,
//   });
//   reg.save((err, data) => {
//     if (!err) {
//       if (data) {
//         res.status(200).json({
//           code: 200,
//           message: "User Added Successfully",
//           addUser: data,
//         });
//       }
//     } else {
//       console.log(err);
//       res.send(err);
//     }
//   });
// });

//get all user
// router.get("/api/users", async (req, res) => {
//   console.log("================================================");
//   try {
//     const allData = await Register.find({});
//     console.log("allData", allData);
//     if (allData) {
//       res.send(allData);
//     } else {
//       res.send({ msg: "No Record Found !!!" });
//     }
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// send sample email via postman
// router.get("/api/sendEmail", (req, res) => {
//   console.log("request =body bookings ", req.body);

//   var mailoption = {
//     from: "smtptest477@gmail.com",
//     to: "satyamchoudhary477@gmail.com",
//     subject: "Welcome to Greenie Energy Network",
//     html: `<div style="text-align: center;">
//      <img src="https://www.greenie-energy.com/img/logo.png" alt="" width="200px">
//      <h2> Welcome hey </h2>
//      <button style="padding: 10px;
//      width:90px;
//      margin-top:20px;
//      background: #45b435;
//      border-radius: 10px;
//      color: white;"> <a style="text-decoration:none;color:white" href="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg">Verify</a></button>
//      <p style="text-align: end;">© 2023 GreenieEnergy Pvt Ltd, Inc.</p>
//     </div>`,
//   };

//   smtpProtocol.sendMail(mailoption, function (err, response) {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       res.send(response);
//       console.log("Message Sent" + JSON.stringify(response));
//     }

//     smtpProtocol.close();
//   });
// });

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

//delete user
// router.delete("/api/deleteUser/:id", (req, res) => {
//   Register.findByIdAndRemove(req.params.id, (err, data) => {
//     if (!err) {
//       // res.send(data);
//       res
//         .status(200)
//         .json({ code: 200, message: "User deleted", deleteUser: data });
//     } else {
//       console.log(err);
//     }
//   });
// });

// // Get Single user
// router.get("/api/user/:email/pass/:password", async (req, res) => {
//   console.log("================================================");
//   console.log("================================================");
//   console.log("================================================");
//   console.log("request =======body ", req.params.email);
//   console.log("================================================");
//   console.log("================================================");
//   console.log("================================================");

//   try {
//     const allData = await Register.findOne({
//       email: req.params.email,
//       password: req.params.password,
//     });
//     res.send(allData);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

module.exports = router;
