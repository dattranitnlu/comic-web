const nodemailer = require("nodemailer");
const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { User } = require('../models/db');
const helper = require('../utils/helper');
const { ErrorResult, Result } = require('../utils/base_response');

const emailMap = new Map();

router.use((req, res, next) => {
  //phan quyen o day
  next();
});

router.post('/code', (req, res) => {
  let random =  ()=> {
    var res = '';
    var cha = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let index = 0; index < 5; index++) {
      res += cha[Math.floor(Math.random() * 10)] + '';
    }
    return res;
  }
   randomNum = random();
   email = req.body.email;

  emailMap.set(email, randomNum);
  console.log('random num: ' + emailMap.get(email));

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Hoathieng1234@gmail.com', // generated ethereal user
      pass: 'Mohammed124' // generated ethereal password
    }
  });
  const mailOptions = {
    from: '"Truyện việt 👻" <truyenviet@example.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Xin chào !", // plain text body
    html: "Mã xác nhận của bạn: <Strong>" + randomNum + "</Strong>" // html body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
      res.status(500).json(ErrorResult(500, err.errors));
    }
    else {
      console.log(info);
      res.status(200).json(ErrorResult(200, info));
    }
  });

});


router.post('/new-password', (req, res) => {

  // {
  //   "email":"thepdatoitheday920@gmail.com",
  //   "code":""
  // }
  code = req.body.code;
  email = req.body.email;

  if(code === emailMap.get(email)){

    console.log('da vao');
    let pass = ()=> {
      var res = '';
      var cha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'L', 'M', 'N'];
      for (let index = 0; index < 8; index++) {
        res += cha[Math.floor(Math.random() * 20)] + '';
      }
      return res;
    }
    randomPass = pass();
    console.log(randomPass);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Hoathieng1234@gmail.com', // generated ethereal user
        pass: 'Mohammed124' // generated ethereal password
      }
    });
    const mailOptions = {
      from: '"Truyện việt 👻" <truyenviet@example.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello", // plain text body
      html: "Đây là mật khẩu mới của bạn: <Strong>" + randomPass + "</Strong>" // html body
    };
  
    // doi mat khau
    User.findAll({
      where: {
        email: req.body.email
      }
    }).then(users => {
      if (users[0] != null) {
        users[0].update({
          password: helper.hash(randomPass),
        }).then(type => {
          res.json(Result(type));
        }).catch(err => {
          res.status(500).json(ErrorResult(500, err.errors));
        });
      } else {
        res.status(500).json(ErrorResult(500, 'Fail'));
      }
    });
  
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err)
        res.status(500).json(ErrorResult(500, err.errors));
      }
      else {
        console.log(info);
        res.status(200).json(ErrorResult(200, info));
      }
    });

    // xoa giá trị trong map sau khi cấp lại mk thành công
    emailMap.delete(email);

  }else {
    res.status(400).json(ErrorResult(400, 'Sai mã code'));
  }
});


function randomPass() {
  var res = '';
  var cha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'L', 'M', 'N'];
  for (let index = 0; index < 8; index++) {
    res += cha[Math.floor(Math.random() * 20)] + '';
  }
  return res;
}

var randomNum = ()=> {
  var res = '';
  var cha = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let index = 0; index < 5; index++) {
    res += cha[Math.floor(Math.random() * 10)] + '';
  }
  return res;
}

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     // host: "smtp.ethereal.email",
//     // port: 587,
//     // secure: false, // true for 465, false for other ports
//     service: 'gmail',
//     auth: {
//       user: 'Hoathieng1234@gmail.com', // generated ethereal user
//       pass: 'Mohammed124' // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Truyện việt 👻" <truyenviet@example.com>', // sender address
//     to: "satefubuki@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello" , // plain text body
//     html: "Hello, please click on <a href='google.com'>Here</a> to set new password " // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

module.exports = router;